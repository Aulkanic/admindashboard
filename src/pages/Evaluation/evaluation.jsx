import React, { useEffect, useState } from 'react'
import './evaluation.css'
import { DataGrid,} from '@mui/x-data-grid';
import { Box,Card,Button,Chip } from "@mui/material";  
import { ApplicantsRequest, FetchingApplicantsInfo, ListofSub,
   USERFRM_ID,SetApplicant,FailedUser,FetchingBmccSchoinfo,
      UpdatePassSlots,FetchPassSlots,DecrePassSlots,ListAccess } from "../../api/request";
import swal from 'sweetalert';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import FormatListBulletedOutlinedIcon from '@mui/icons-material/FormatListBulletedOutlined';
import { useContext } from "react";
import { admininfo } from "../../App";
import Slide from '@mui/material/Slide';
import Link from '@mui/material/Link';
import Checkbox from '@mui/material/Checkbox';
import { styled } from '@mui/material';
import { Backdrop, CircularProgress } from '@mui/material';
import CustomNoRowsOverlay from '../Design/Norows';
import { CustomHeading } from '../../components/H1/h1';
import CustomFields from '../../components/InputFields/CustomFields';
import GrantUserAccess from '../../container/Access/access';
import { CustomDialog } from '../../components/Dialog/CustomDialog';
import ApplicantDetails from '../../Page/Private/Evaluation/Modals/userInfo';

const CustomDataGrid = styled(DataGrid)({
  '& .MuiDataGrid-columnHeaders': {
    color: 'white', 
    fontWeight:'bold',
    backgroundColor:'#0047a4',
    fontWeight:'bold',
    margin:"0px",
    borderTopLeftRadius:'0px',
    borderTopRightRadius:'0px'
  },

});


const Evaluation = () => {
    const { user } = useContext(admininfo);
    const [showBackdrop, setShowBackdrop] = useState(false);
    const [data, setData] = useState([]);
    const [applicants,setApplicants] = useState({
      passed:[],
      failed:[]
    })
    const [selectedUser,setSelectedUser] = useState({
      applicantNum:'',
      personalInfo:[],
      familyInfo:[],
      form:[]
    })
    const [userscore,setUserScore] = useState([]);
    const [applicantsInfo, setApplicantInfo] = useState([]);
    const [access,setAccess] = useState([])
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [passSlot,setPassSlot] = useState([]);
    const [siblings,setSiblings] = useState([]);
    const [passscore, setPassscore] = useState('');
    const [slots, setSlots] = useState('');
    const [isButtonVisible, setIsButtonVisible] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const handleCloseDialog = () => setOpenDialog(false);
    const [activeState,setActiveState] = useState('All');
    const [rowSelectionModel, setRowSelectionModel] = useState([]);
    const [failedSelectionModel,setFailedSelectionModel] = useState([]);
    const [who,setWho] = useState('');
    const [isSend,setIsSend] = useState('No')
    const [checked, setChecked] = React.useState(false);

    const handleChangeCheckbox = (event) => {
      const check = event.target.checked
      if(check){
        setChecked(check);
        setIsSend('Yes')
      }else{
        setChecked(check);
        setIsSend('No')
      }

    };
    const handleOpenDialog = (data) => {
      setOpenDialog(true);
      setWho(data.applicantNum)
    }
    useEffect(() => {

        async function Fetch(){
          const response = await ApplicantsRequest.ALL_APPLICANTS();
          const pass = await FetchPassSlots.FETCH_PASSSLOTS()
          const ForEva = response.data.results?.filter(user => user.status === 'For Evaluation')
          let acc = await ListAccess.ACCESS()
          const empacc = acc.data.result?.filter(data => data.employeeName === user.name)
          setAccess(empacc)
          setApplicants({
            passed: ForEva?.filter(data => data.score >= passSlot.passingscore) || [],
            failed: ForEva?.filter(data => data.score < passSlot.passingscore) || []
          })
          setPassSlot(pass.data.result[0])
        }
        Fetch();
      }, []);
      useEffect(() => {
        setIsButtonVisible(passscore !== '' || slots !== '');
      }, [passscore,slots]);
    
      const view = async (data) => {
        const applicantNum = data.applicantNum;
        const formData = new FormData();
        formData.append('applicantNum',applicantNum)
        try {
          setShowBackdrop(true);
          const response = await Promise.all([
            FetchingApplicantsInfo.FETCH_INFO(applicantNum),
            ListofSub.FETCH_SUB(applicantNum),
            USERFRM_ID.FORMUSR(applicantNum)
          ]);
          setSiblings(response[0].data.siblings)
          setApplicantInfo(response[0].data.results[0]);
          setUserScore(response[2].data)
          setShowBackdrop(false);
          handleOpen()
        } catch (error) {
          console.error('Error fetching data:', error);
        }
    
      }
      const failed = async(data) =>{
        const res = await FetchingBmccSchoinfo.FETCH_SCHOLARSINFO(data.applicantNum);
        const schoapplied = res.data.ScholarInf.results1[0].SchoIarshipApplied;
        const batch = res.data.ScholarInf.results1[0].Batch;
        const reason = 'Score did not Meet Passing Score'
        const formData = new FormData();
        formData.append('applicantNum',data.applicantNum)
        formData.append('Name',data.Name)
        formData.append('ScholarshipApplied', schoapplied)
        formData.append('batch',batch)
        formData.append('Reason',reason)
        formData.append('email',res.data.ScholarInf.results1[0].email)
        setShowBackdrop(true);
        const response = await FailedUser.FAILED_USER(formData)
        if(response.data.success === 1){
          setShowBackdrop(false);
          swal({
            title: "Success",
            text: "Succes!",
            icon: "success",
            button: "OK",
          });
        }else{
          setShowBackdrop(false);
          swal({
            title: "Failed",
            text: "Something Went Wrong!",
            icon: "error",
            button: "OK",
          });
        }
      }
      const handleRowSelectionModelChange = (newRowSelectionModel) => {
        setRowSelectionModel(newRowSelectionModel);

      };
      const handleFailedSelectionModelChange = (newFailedSelectionModel) => {
        console.log(newFailedSelectionModel)
        setFailedSelectionModel(newFailedSelectionModel);

      };
    const columns = [
        {
          field: 'SchoIarshipApplied',
          headerName: 'Scholarship Applied',
          width: 250,
          editable: false,
        },
        {
          field: 'Name',
          headerName: 'Name',
          width: 250,
          editable: false,
        },
        {
          field: 'DateApplied',
          headerName: 'Date Applied',
          width: 150,
          editable: false,
        },
        {
          field: 'status',
          headerName: 'Status',
          width: 100,
          editable: false,
        },
        {
          field: 'stat',
          headerName: 'Score',
          width: 90,
          editable: false,
          renderCell: (params) =>(
            <>
            <p style={{margin:'0px'}}>{params.row.score}/100</p>
            </>
          ),
        },
        {
            field: 'insert',
            headerName: 'Actions',
            width: 100,
            renderCell: (params) => (
                <>
                <div style={{display:'flex',flexDirection:'column',height:'100%',width:'100%',justifyContent:'center',alignItems:'center'}}>
                <button className='btnofficials1'
                onClick={() => view(params.row)}>View Details</button>
                </div>
              </>
            ),
          },
          {
            field: 'score',
            headerName: 'Details',
            width: 250,
            renderCell: (params) => {
              let status
              if(params.value >= passSlot.passingscore){
                status = 'Passed'
              }
              if(params.value < passSlot.passingscore){
                status = 'Failed'
              }
              return(
                <>
                <div style={{width:"100%",display:'flex',height:'100%',justifyContent:'center',alignItems:'center'}}>
              {status === 'Passed' && <button className="btnofficials"
              onClick={() => setFirsttoSecStat(params.row)}>
                Add to Applicants List
                </button>}
              {status === 'Failed' && (<>
                {params.row.grantedAccess === '' || !params.row.grantedAccess ? (<button className='btnofficials1'  
              onClick={() =>handleOpenDialog(params.row)}>
                Access</button>) : (<button className="btnofficials"
              onClick={() => setFirsttoSecStat(params.row)}>
                Add to Applicants List
                </button>)}
                <button className='btnofficials2' style={{marginLeft:'10px'}}
                onClick={() => failed(params.row)}>
                  Failed
                </button>
                </>)}
              </div>
              </>)
            },
          },
    
      ];
    const passedColumn = [
        {
          field: 'SchoIarshipApplied',
          headerName: 'Scholarship Applied',
          width: 250,
          editable: false,
        },
        {
          field: 'Name',
          headerName: 'Name',
          width: 250,
          editable: false,
        },
        {
          field: 'DateApplied',
          headerName: 'Date Applied',
          width: 150,
          editable: false,
        },
        {
          field: 'status',
          headerName: 'Status',
          width: 100,
          editable: false,
        },
        {
          field: 'stat',
          headerName: 'Score',
          width: 90,
          editable: false,
          renderCell: (params) =>(
            <>
            <p style={{margin:'0px'}}>{params.row.score}/100</p>
            </>
          ),
        },
        {
            field: 'insert',
            headerName: 'Actions',
            width: 100,
            renderCell: (params) => (
                <>
                <div style={{display:'flex',flexDirection:'column',height:'100%',width:'100%',justifyContent:'center',alignItems:'center'}}>
                <button className='myButton'
                onClick={() => view(params.row)}>View Details</button>
                </div>
              </>
            ),
          },
          {
            field: 'score',
            headerName: 'Details',
            width: 250,
            renderCell: (params) => {
              return(
                <>
                <div style={{width:"100%",display:'flex',flexDirection:'column',height:'100%',justifyContent:'center',alignItems:'center'}}>
              <button className="btnofficials"
              onClick={() => setFirsttoSecStat(params.row)}>
                Add to Applicants List
                </button>
              </div>
              </>)
            },
          },
    
      ];
    const failedColumn = [
        {
          field: 'SchoIarshipApplied',
          headerName: 'Scholarship Applied',
          width: 250,
          editable: false,
        },
        {
          field: 'Name',
          headerName: 'Name',
          width: 250,
          editable: false,
        },
        {
          field: 'DateApplied',
          headerName: 'Date Applied',
          width: 150,
          editable: false,
        },
        {
          field: 'status',
          headerName: 'Status',
          width: 100,
          editable: false,
        },
        {
          field: 'stat',
          headerName: 'Score',
          width: 90,
          editable: false,
          renderCell: (params) =>(
            <>
            <p style={{margin:'0px'}}>{params.row.score}/100</p>
            </>
          ),
        },
        {
            field: 'insert',
            headerName: 'Actions',
            width: 100,
            renderCell: (params) => (
                <>
                <div style={{display:'flex',flexDirection:'column',height:'100%',width:'100%',justifyContent:'center',alignItems:'center'}}>
                <button className='btnofficials1'
                onClick={() => view(params.row)}>View Details</button>
                </div>
              </>
            ),
          },
          {
            field: 'grantedAccess',
            headerName: 'Details',
            width: 250,
            renderCell: (params) => {
              console.log(params.row)
              return(
                <>
                <div style={{width:"100%",display:'flex',height:'100%',justifyContent:'center',alignItems:'center'}}>
              {params.row.grantedAccess === '' || !params.row.grantedAccess ? (<button className='btnofficials1'
              onClick={() =>handleOpenDialog(params.row)}>
                Access</button>) : (<button className="btnofficials" 
              onClick={() => setFirsttoSecStat(params.row)}>
                Add to Applicants List
                </button>)}
                <button className='btnofficials2' style={{marginLeft:'5px'}}
              onClick={() => failed(params.row)}>
                Failed
                </button>
              </div>
              </>)
            },
          },
    
      ];

    const setFirsttoSecStat = async(data) =>{
        if (passSlot.slots === 0) {
          swal({
            text: 'No Slots Available',
            timer: 2000,
            buttons: false,
            icon: 'error',
          });
          return;
        }
        const decre = await DecrePassSlots.DECRE_PASSSLOTS();
        const formData = new FormData();
        formData.append('email',data.email);
        formData.append('applicantNum',data.applicantNum)
        formData.append('Name',data.Name)
        setShowBackdrop(true);
        SetApplicant.SET_APPLICANT(formData)
        .then(res => {
          if(res.data.success === 1){
            console.log(res)
            setPassSlot(decre.data.results[0]);
            setData(res.data.result);
            setPassscore(decre.data.results[0].passingscore);
            setSlots(decre.data.results[0].slots);
            setShowBackdrop(false);
            swal({
              text: 'Status Updated',
              timer: 2000,
              buttons: false,
              icon: "success",
            })
          }else{
            setShowBackdrop(false);
            swal({
              text: 'Something Went Wrong',
              timer: 2000,
              buttons: false,
              icon: "error",
            })
          }

          }
           )
          .catch(err => console.log(err));
    }
    const ScoreSlot = () =>{
      const data1 = passscore || passSlot.passingscore;
      const data2 = slots || passSlot.slots
      if(data1 < 0 || data2 < 0){
        swal({
          title: "Failed",
          text: "Not Accepted.It must not a negative number!",
          icon: "error",
          button: "OK",
        });
        return
      }
      if(data1 <= 49){
        swal({
          title: "Failed",
          text: "Score not Accepted.It must be equal or greater than 50!",
          icon: "error",
          button: "OK",
        });
        return
      }
      if(data1 > 100){
        swal({
          title: "Failed",
          text: "Score not Accepted.It must not greater than 100!",
          icon: "error",
          button: "OK",
        });
        return
      }
      const formData = new FormData();
      formData.append('passscore',data1);
      formData.append('slots',data2);
      setShowBackdrop(true);
      UpdatePassSlots.UPDATE_PASSSLOTS(formData)
      .then(res => {
        if(res.data.success === 1){
          setPassSlot(res.data.results[0])
          setShowBackdrop(false);
          swal({
            title: "Success",
            text: "Updated!",
            icon: "success",
            button: "OK",
          });
        }else{
          setShowBackdrop(false);
          swal({
            title: "Failed",
            text: "Something Went Wrong!",
            icon: "error",
            button: "OK",
          });
        }

        }
         )
        .catch(err => console.log(err));
    }
    const Addall = async () => {
      const selectedRows = rowSelectionModel.map((selectedRow) =>
        data.find((row) => row.applicantNum === selectedRow)
      );
      if(selectedRows.length === 0){
        swal({
          text: 'Please Select Users First',
          timer: 2000,
          buttons: false,
          icon: "warning",
        })
        return
      }
      if (passSlot.slots === 0) {
   
        swal({
          text: 'No Slots Available',
          timer: 2000,
          buttons: false,
          icon: 'error',
        });
        return;
      }else if(passSlot.slots < selectedRows.length){
        swal({
          text: 'Insufficient slots for Selected User',
          timer: 2000,
          buttons: false,
          icon: 'error',
        });
        return;
      }
    
      const decre = await DecrePassSlots.DECRE_PASSSLOTS();
      if (decre.data.success === 1) {
        try {
          setShowBackdrop(true);
          let counter = 0;
          for (let i = 0; i < selectedRows.length; i++) {
            const row = selectedRows[i];
    
            if (passSlot.slots === 0) {
              setShowBackdrop(false);
              swal({
                text: 'No Slots Available',
                timer: 2000,
                buttons: false,
                icon: 'error',
              });
              break; 
            }
            const formData = new FormData();
            formData.append('email', row.email);
            formData.append('applicantNum', row.applicantNum);
            const res = await SetApplicant.SET_APPLICANT(formData);
            if (res.data.success === 1) {
              setPassSlot(decre.data.results[0]);
              setData(res.data.result);
              setPassscore(decre.data.results[0].passingscore);
              setSlots(decre.data.results[0].slots);
              counter++;
              if (counter === selectedRows.length) {
                setShowBackdrop(false);
                swal({
                  title: "Success",
                  text: "Done!",
                  icon: "success",
                  button: "OK",
                });
              }
            } else {
              setShowBackdrop(false);
              swal({
                title: "Failed",
                text: "Something Went Wrong!",
                icon: "error",
                button: "OK",
              });
            }
          }
        } catch (error) {
          console.log(error);
        }
      } else {
        setShowBackdrop(false);
        swal({
          text: 'No Slots Available',
          timer: 2000,
          buttons: false,
          icon: 'error',
        });
        return;
      }
    };
    const FailedAll = async() =>{
      const selectedRows = failedSelectionModel.map((selectedRow) =>
        data.find((row) => row.applicantNum === selectedRow));
        if(selectedRows.length === 0){
          swal({
            text: 'Please Select Users First',
            timer: 2000,
            buttons: false,
            icon: "warning",
          })
          return
        }
        setShowBackdrop(true);
        let counter = 0;
        for (let i=0 ;i<selectedRows.length;i++){
          const row = selectedRows[i];
          const schoapplied = row.SchoIarshipApplied
          const batch = row.Batch
          const reason = 'Score did not Meet Passing Score'
          const formData = new FormData();
          formData.append('applicantNum',row.applicantNum)
          formData.append('Name',row.Name)
          formData.append('ScholarshipApplied', schoapplied)
          formData.append('batch',batch)
          formData.append('Reason',reason)
          formData.append('email',row.email)
          formData.append('isSend',isSend)
          const response = await FailedUser.FAILED_USER(formData)
          if(response.data.success === 1){
            setData(response.data.result);
            setIsSend('No')
            counter++;
            if (counter === selectedRows.length) {
              setShowBackdrop(false);
              swal({
                title: "Success",
                text: "Done!",
                icon: "success",
                button: "OK",
              });
            }
          }else{
            setShowBackdrop(false);
            swal({
              title: "Failed",
              text: "Something Went Wrong!",
              icon: "error",
              button: "OK",
            });
          }
        }
    }

  return (
    <>
    <GrantUserAccess
      open={openDialog}
      onClose={handleCloseDialog}
      user={who}
    />
    <CustomDialog
      open={open}
      handleClose={handleClose}
      title={'Applicant Information'}
      content={<ApplicantDetails
      userDetails={applicantsInfo}
      />}
    />

    <div className='p-4'>
      <div className=''>
        <div className='flex justify-between items-center'>
            <CustomHeading
            title={'Registered Applicants'}
            />
            <div style={{marginRight:5,height:'100%'}}>
              <div style={{display:'flex',flexDirection:'column',height:'100%',width:'100%',alignItems:'center'}}>
                <div className='flex justify-center items-center gap-4'>
                  <CustomFields
                    label={'Passing Score'}
                    value={passscore}
                    placeholder={passSlot.passingscore}
                    onChange={(e) => setPassscore(e.target.value)}
                  />
                  <CustomFields
                    label={'Available Slot'}
                    placeholder={passSlot.slots}
                    onChange={(e) =>setSlots(e.target.value)}
                    value={slots}
                  />
                </div>
                <div>
                {isButtonVisible && <button className="btnofficials" onClick={ScoreSlot}>Save Changes</button>}
                </div>
              </div>
            </div>
        </div>
        <Box sx={{ height: 'maxContent', width: '100%',marginTop:"10px" }}>
        <Breadcrumbs sx={{backgroundColor:'#0047a4',marginBottom:'0px'}} aria-label="breadcrumb">
            <Button onClick={() => setActiveState('All')}>
              <Link
                underline="none"
                sx={{
                  color: 'white' ,
                  borderBottom: activeState === 'All' ? '5px solid white' : 'none',
                  transition:'all 0.3s ease-in-out',
                  display:'flex',
                  alignItems:'center'
                }}
              >
                <FormatListBulletedOutlinedIcon sx={{marginRight:'5px'}} fontSize='inherit' />
                All({data.length})
              </Link>
            </Button>
            <Button onClick={() => setActiveState('Passed')}>
              <Link
                underline="none"
                sx={{
                  color: 'white',
                  borderBottom: activeState === 'Passed' ? '5px solid white' : 'none',
                  transition:'all 0.3s ease-in-out',
                  display:'flex',
                  alignItems:'center'
                }}
              >
                <CheckCircleIcon sx={{marginRight:'5px'}} fontSize="inherit" />
                Passed({applicants.passed.length})
              </Link>
            </Button>
            <Button onClick={() => setActiveState('Failed')}>
              <Link
                underline="none"
                sx={{
                  color:'white',
                  borderBottom: activeState === 'Failed' ? '5px solid white' : 'none',
                  transition:'all 0.3s ease-in-out',
                  display:'flex',
                  alignItems:'center'
                }}
              >
                <CancelIcon sx={{marginRight:'5px'}} fontSize="inherit" />
                Failed({applicants.failed.length})
              </Link>
            </Button>
        </Breadcrumbs>
          {data.length === 0 && showBackdrop ? (
  <div
  style={{
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    textAlign: 'center',
  }}
>
  <div style={{ marginBottom: '16px' }}>
    <CircularProgress />
  </div>
  <div>
    <p>Loading...</p>
    <div className="loading-animation"></div>
  </div>
</div>) : (<Card sx={{height:'500px',borderRadius:'0px'}}>
              {activeState === 'All' && (
            <CustomDataGrid
              rows={data}
              columns={columns}
              getRowId={(row) => row.applicantNum}
              scrollbarSize={10}
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 5,
                  },
                },
              }}
              sx={{minHeight:'300px',border:'none',borderRadius:'0px'}}
              slots={{
                noRowsOverlay: CustomNoRowsOverlay,
              }}
              pageSizeOptions={[25]}
              disableRowSelectionOnClick
            />
          )}
            {activeState === 'Passed' && (
              <CustomDataGrid
                rows={applicants.passed}
                columns={passedColumn}
                getRowId={(row) => row.applicantNum}
                scrollbarSize={10}
                initialState={{
                  pagination: {
                    paginationModel: {
                      pageSize: 5,
                    },
                  },
                }}
                sx={{minHeight:'300px',border:'none',borderRadius:'0px'}}
                slots={{
                  noRowsOverlay: CustomNoRowsOverlay,
                }}
                pageSizeOptions={[25]}
                checkboxSelection
                onRowSelectionModelChange={handleRowSelectionModelChange}
                rowSelectionModel={rowSelectionModel}
                disableRowSelectionOnClick
              />
            )}
            {activeState === 'Failed' && (
              <CustomDataGrid
                rows={applicants.failed}
                columns={failedColumn}
                getRowId={(row) => row.applicantNum}
                scrollbarSize={10}
                initialState={{
                  pagination: {
                    paginationModel: {
                      pageSize: 5,
                    },
                  },
                }}
                sx={{minHeight:'300px',border:'none',borderRadius:'0px'}}
                slots={{
                  noRowsOverlay: CustomNoRowsOverlay,
                }}
                pageSizeOptions={[25]}
                checkboxSelection
                onRowSelectionModelChange={handleFailedSelectionModelChange}
                rowSelectionModel={failedSelectionModel}
                disableRowSelectionOnClick
              />
            )}
          </Card>)}
        </Box>    
      </div>
      {activeState === 'Passed' && <div sx={{width:'90%',margin:'10px',display:'flex',justifyContent:'flex-end',flexDirection:'column',alignItems:'flex-end'}}>
        <button className='btnofficials' onClick={Addall} >ADD ALL SELECTED TO APPLICANT LIST</button>
      </div>}
      {activeState === 'Failed' && <div sx={{width:'90%',margin:'10px',display:'flex',justifyContent:'flex-end',flexDirection:'column',alignItems:'flex-end'}}>
            <Checkbox
              checked={checked}
              onChange={handleChangeCheckbox}
              inputProps={{ 'aria-label': 'controlled' }}
            /><span>Sent Notification</span>
          <button className='btnofficials2' onClick={FailedAll} style={{margin:'10px'}} >SET FAILED THE SELECTED USERS</button>
      </div>} 
    </div>
    </>
  )
}

export default Evaluation