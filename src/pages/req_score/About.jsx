import Navbar from '../../components/navbar/Navbar';
import Sidebar from '../../components/sidebar/Sidebar';
import './about.scss';
import './req_score.css';
import { FetchingSchoProg } from '../../api/request';
import { useEffect, useState } from 'react';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import { useContext } from "react";
import { admininfo } from "../../App";
import FormControl from '@mui/material/FormControl';
import { CreatingScore,FetchingScore,ListAccess,ApplicationForm,QuestionForm,QuestionDelete,QuestionScore,
          EditFormQuestion,ChoiceDelete,ChoiceForm,ChoiceScore } from '../../api/request';
import Swal from 'sweetalert2';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CircleIcon from '@mui/icons-material/Circle';
import { Card } from '@mui/material';
import { styled, ThemeProvider, createTheme } from '@mui/material';
import { Backdrop, CircularProgress } from '@mui/material';

const theme = createTheme();
const StyledBackdrop = styled(Backdrop)`
  z-index: ${({ theme }) => theme.zIndex.drawer + 1};
`;

export const About = () => {
  const { loginUser,user } = useContext(admininfo);
    const [schoprog, setSchoProg] = useState([]);
    const [showBackdrop, setShowBackdrop] = useState(false);
    const[formq,setFormq] = useState([]);
    const[formc,setFormc] = useState([]);
    const[schoname,setSchoname] = useState('');
    const [access,setAccess] = useState([])
    const [errors, setErrors] = useState({}); 
    const [scorelist, setScorelist] = useState([])
    const [accessList,setAccesslist] = useState([]);
    const [value, setValue] = useState('1');

    const handleTabChange = (event, newValue) => {
      setValue(newValue);
    };
  

    const handleChange = async (event) => {
      const value = await event.target.value;
      setSchoname(value);
      const schoname = value;
      setShowBackdrop(true);
     FetchingScore.FETCH_SCORECARD(schoname)
        .then(response => {
          const scorelist = response.data.ScholarScore;
          setScorelist(scorelist);
          setShowBackdrop(false);
        })
        .catch(error => {
          console.error(error);
        });
    };

    useEffect(() => {
      async function Fetch(){
        setShowBackdrop(true);
        const frm = await ApplicationForm.FETCH_FORM()
        const response = await FetchingSchoProg.FETCH_SCHOPROG()
        const res = await ListAccess.ACCESS()
        let acc = await ListAccess.ACCESS()
        const empacc = acc.data.result?.filter(data => data.employeeName === user.name)
        setAccess(empacc)
        setAccesslist(res.data.result[0])
        setFormq(frm.data.Questions)
        setFormc(frm.data.Answers)
        setSchoProg(response.data.SchoCat);
        setShowBackdrop(false);
      }
      Fetch();
    }, []);



    const handleScorecardChange = (questionId, newScorecard) => {
      setFormc((prevQuestions) =>
      
        prevQuestions.map((question) =>
          question.id === questionId ? { ...question, scorecard: newScorecard } : question
        )
      );
    };
    const handleScorecardChange1 = (choiceid, newScorecard) => {
      setFormq((prevQuestions) =>
      
        prevQuestions.map((question) =>
          question.id === choiceid ? { ...question, scorecard: newScorecard } : question
        )
      );
    };
    
    const AddQuestions = async() =>{
      let optionsHtml = '';
      schoprog?.forEach((option) => {
        optionsHtml += `<option value="${option.name}">${option.name}</option>`;
      });
      const { value: formValues } = await Swal.fire({
        title: 'Add Questions',
        html:
        '<select id="swal-select" class="swal2-input">' +
        optionsHtml +
        '</select><br/>' +
          '<input id="swal-input2" class="swal2-input" placeholder="Question">',
        focusConfirm: false,
        confirmButtonText: 'Submit',
        showCancelButton:true,
        preConfirm: () => {
          const selectedValue = document.getElementById('swal-select').value;
          const question2 = document.getElementById('swal-input2').value;
    
          if (!selectedValue || !question2) {
            Swal.showValidationMessage('Both fields are required. Please enter data for both questions.');
            return false; // Prevent the dialog from closing
          }
    
          return [selectedValue, question2];
        },
      })
      if (formValues) {
        
        const selectedValue = formValues[0];
        const question2 = formValues[1];
        try {
          const formData = new FormData()
          formData.append('schoProg',selectedValue)
          formData.append('questions',question2)
          setShowBackdrop(true);
          await QuestionForm.Q_FORM(formData)
          .then((res) =>{
            setFormq(res.data.Questions)
            setFormc(res.data.Answers)
            setShowBackdrop(false);
          })
        } catch (error) {
          console.error(error);
        }
      } else {
        console.log('User did not confirm or did not input data for both questions.');
      }

    }
    const AddChoices = async(data) =>{
      const { value: choice } = await Swal.fire({
        title: 'Enter Choices you want to Add',
        input: 'text',
        confirmButtonText: 'Add',
        showCancelButton: true,
        inputValidator: (value) => {
          if (!value) {
            return 'You need to write something!'
          }
        }
      })
      
      if (choice) {
        console.log(data)
        const formData = new FormData()
        formData.append('questionsid',data.id)
        formData.append('choice',choice)
        setShowBackdrop(true)
        await ChoiceForm.C_FORM(formData)
        .then((res) =>{
          setFormq(res.data.Questions)
          setFormc(res.data.Answers)
          setShowBackdrop(false);
        })
      }
    }
    const DeleteQuestion = async(data) =>{
      
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel!',
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        reverseButtons: true
      }).then(async(result) => {
        if (result.isConfirmed) {
          const id = data.id
          setShowBackdrop(true)
          await QuestionDelete.DELETE_QFORM(id)
          .then((res) =>{
            setFormq(res.data.Questions)
            setFormc(res.data.Answers)
            setShowBackdrop(false);
          })
          Swal.fire(
            'Deleted!',
            'The Selected Question has been deleted.',
            'success'
          )
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          Swal.fire(
            'Cancelled',
            'The Selected Question deletion has cancelled. :)',
            'error'
          )
        }
      })      
    }
    const DeleteChoice = async(data) =>{
      
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel!',
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        reverseButtons: true
      }).then(async(result) => {
        if (result.isConfirmed) {
          const id = data.id
          setShowBackdrop(true)
          await ChoiceDelete.DELETE_CFORM(id)
          .then((res) =>{
            setFormq(res.data.Questions)
            setFormc(res.data.Answers)
            setShowBackdrop(false);
          })
          Swal.fire(
            'Deleted!',
            'The Selected Item has been deleted.',
            'success'
          )
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          Swal.fire(
            'Cancelled',
            'The Selected Item deletion has cancelled. :)',
            'error'
          )
        }
      })      
    }
    const EditQForm = async(data) =>{
      const { value: question } = await Swal.fire({
        title: 'Enter Question you want to Replace/Edit',
        input: 'text',
        confirmButtonText: 'Save Changes',
        showCancelButton: true,
        inputValue: data.questions,
        inputValidator: (value) => {
          if (!value) {
            return 'You need to write something!'
          }
        }
      })
      
      if (question) {
        const formData = new FormData()
        formData.append('id',data.id)
        formData.append('questions',question)
        setShowBackdrop(true)
        await EditFormQuestion.EDIT_FORMQ(formData)
        .then((res) =>{
          setFormq(res.data.Questions)
          setFormc(res.data.Answers)
          setShowBackdrop(false);
        })
      }     
    }

    const schoForm = formq?.filter(data => data.scholarshipProg === schoname)
    const FormTemplate = schoForm?.map((data,index) =>{
      const choices = formc?.filter(data1 => data1.questionsid === data.id)
      return(
        <div key={index} className='questionchoose'>
          <p>{index + 1}. {data.questions} <button style={{padding:'5px'}} className='myButton1' onClick={() =>EditQForm(data)}><EditIcon sx={{fontSize:'13px'}}/></button>
          <button style={{padding:'5px',marginLeft:'10px'}} onClick={() =>DeleteQuestion(data)} className='myButton2'><DeleteIcon sx={{fontSize:'13px'}}/></button></p>
          <ul>
            {choices?.map((data1,index) =>{
              return(
                <li className='choiceli' key={index}>
                  - {data1.value}
                <button onClick={() =>DeleteChoice(data1)} style={{padding:'5px',marginLeft:'10px'}} className='myButton2'>
                  <DeleteIcon sx={{fontSize:'13px'}}/>
                </button></li>
              )
            })}
          </ul>
          <div className='addchoice'><button className='myButton1' onClick={() =>AddChoices(data)}>+Add Choices</button></div>
        </div>
      )
    })
    const ScoreTemplate = schoForm?.map((data,index) =>{
      const choices = formc?.filter(data1 => data1.questionsid === data.id)
      return(
        <div key={index} className='questionchoose'>
          <p className='questcon'>{index + 1}. {data.questions}
          <span style={{marginLeft:'15px'}}>
            <input
            className='scoreinput'
            type="text"
            value={data.scorecard}
            onChange={(e) => handleScorecardChange(data.id, e.target.value)}
            />
          </span>
          </p>
          <ul>
            {choices?.map((data1,index) =>{
              return(
                <li className='choiceli' key={index}>
                  - {data1.value}
                  <span>
                    <input
                    className='scoreinput'
                    type="text"
                    value={data1.scorecard}
                    onChange={(e) => handleScorecardChange1(data1.id, e.target.value)}
                    />
                  </span>
                </li>
              )
            })}
          </ul>
        </div>
      )
    })

  return (
    <>
              <StyledBackdrop open={showBackdrop}>
                <CircularProgress color="inherit" />
              </StyledBackdrop>
    <div className="about">
        <Sidebar/>
        <div className="aboutContainer">
        <Navbar/>
        <div className="top">
          <h1>Score Card</h1>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Scholarship Program</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={schoname}
              label="Scholarship Program"
              onChange={handleChange}
            >
              {schoprog?.map((data,index) =>{
                return(
                  <MenuItem key={index}  value={data.name}>{data.name}</MenuItem>
                )
              })}
            </Select>
          </FormControl>
          <Tabs
            value={value}
            onChange={handleTabChange}
            textColor="secondary"
            indicatorColor="secondary"
            aria-label="secondary tabs example"
          >
            <Tab value="1" label="Application Form" />
            <Tab value="2" label="Score Card" />
          </Tabs>
          {value === '1' && 
         <Card sx={{padding:'10px'}}>
            <button style={{float:'right'}} onClick={AddQuestions} className='myButton1'>Add Questions</button>
              {FormTemplate}
          </Card> }   
          {value === '2' && 
         <Card sx={{padding:'10px'}}>
            <button style={{float:'right'}} className='myButton1'>Set Score</button>
              {ScoreTemplate}
         </Card> }       
        </div>
        </div>

         
    </div>
    </>
  )
}
