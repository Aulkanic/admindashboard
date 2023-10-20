import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import "./home.scss"
import "./home.css"
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { FetchingBmccScho,ApplicantsRequest } from '../../api/request';
import { useState } from "react";
import { useEffect } from "react";
import { DataGrid} from '@mui/x-data-grid';
import { styled } from '@mui/material/styles';
import { FaGraduationCap } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { BsFillCalendarDateFill } from "react-icons/bs";


const CustomDataGrid = styled(DataGrid)({
  '& .MuiDataGrid-columnHeaders': {
    fontFamily:'Roboto Serif',
    fontWeight:'700',
    lineHeight:'17.57px',
    fontSize:'15px',
    borderBottom:'2px solid gray'
  },
});
const Home = () => {
  const [totalscho,setTotalscho] = useState([]);
  const [post , setPost] = useState([]);

  useEffect(() => {

    async function Fetch(){
      const scholars = await FetchingBmccScho.FETCH_SCHOLARS()
      const scho = scholars.data.Scholars?.filter(data => data.status === 'Approved' && (data.remarks === 'Existing Scholar' || data.remarks === 'New Scholar'))
      setTotalscho(scho)
      const response = await ApplicantsRequest.ALL_APPLICANTS()
      const appdatali = response.data.results;
      setPost(appdatali.reverse());
    }
    Fetch();
  }, []);
  const columns = [
    {
      field: 'Name',
      headerName: 'Name',
      width: 250,
      editable: true,
    },
    
    {
      field: 'email',
      headerName: 'Email',
      width: 250,
      editable: false,
    },
    {
      field: 'SchoIarshipApplied',
      headerName: 'Scholarship Applied',
      width: 250,
      editable: true,
    },
    {
      field: 'DateApplied',
      headerName: 'Date Applied',
      width: 200,
      editable: false,
    },
    {
      field: 'score',
      headerName: 'Score',
      width: 150,
      editable: false,
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 110,
      editable: true,
    },


  ];
  const filteredRows = post.filter((row) => row.status === 'For Evaluation');
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
      <Navbar />
    <Box
      sx={{
        margin:'10px',
        display: 'flex',
        flexDirection:'row',
        justifyContent:'space-around',
        flexWrap: 'wrap',
        '& > :not(style)': {
          m: 1,
          width: '30%',
          height: 70,
          backgroundColor:"#FFFFFF",
          borderRadius:'10px'
        },
      }}>

    <Card elevation={0} sx={{ minWidth: 200,display:'flex',justifyContent:'space-between',alignItems:'center',padding:'10px 15px 10px 10px'}}>
      <Typography sx={{ fontSize: 20,fontWeight:'900',color:'black',lineHeight:'17.57px',fontFamily:'Roboto Serif',textAlign:'center' }} gutterBottom>
          Total <br/>
          Scholars
      </Typography>
      <div className="totalicon">
      <Typography variant="h5" component="div" sx={{borderRight:'2px solid black',width:'80%',color:'#043F97',fontFamily:'Roboto Serif',fontWeight:'700',lineHeight:'23.42px'}}>
          {totalscho.length}
      </Typography>
      <FaGraduationCap style={{width:'20px',color:'blue'}} />
      </div>
      <Button size="small" href="/scholars" sx={{color:'#666',fontFamily:'Roboto Serif',fontWeight:'400',lineHeight:'11.42px',fontStyle:'italic',textTransform:'none'}}>
        View <br /> all
      </Button>
    </Card>

    <Card elevation={0} sx={{ minWidth: 200,display:'flex',justifyContent:'space-between',alignItems:'center',padding:'10px 15px 10px 30px'}}>
        <Typography sx={{ fontSize: 20,fontWeight:'900',color:'black',lineHeight:'17.57px',fontFamily:'Roboto Serif' ,textAlign:'center'}} gutterBottom>
          Total <br/> Applicants
        </Typography>
        <div className="totalicon">
        <Typography variant="h5" component="div" sx={{borderRight:'2px solid black',width:'80%',color:'#043F97',fontFamily:'Roboto Serif',fontWeight:'700',lineHeight:'23.42px'}}>
          {filteredRows.length}
        </Typography>
        <FaUser style={{width:'20px',color:'blue'}} />
        </div>
        <Button size="small" href="/applicants" sx={{color:'#666',fontFamily:'Roboto Serif',fontWeight:'400',lineHeight:'11.42px',fontStyle:'italic',textTransform:'none'}}>
        View <br /> all
        </Button>
    </Card>

    <Card elevation={0} sx={{ minWidth: 200,display:'flex',justifyContent:'space-between',alignItems:'center',padding:'10px 15px 10px 30px'}}>
    <Typography sx={{ fontSize: 20,fontWeight:'900',color:'black',lineHeight:'17.57px',fontFamily:'Roboto Serif',textAlign:'center' }} gutterBottom>
          Appointed <br/> Today
        </Typography>
        <div className="totalicon">
        <Typography variant="h5" component="div" sx={{borderRight:'2px solid black',width:'80%',color:'#043F97',fontFamily:'Roboto Serif',fontWeight:'700',lineHeight:'23.42px'}}>
          {filteredRows.length}
        </Typography>
        <BsFillCalendarDateFill style={{width:'20px',color:'blue'}} />
        </div>
        <Button size="small" href="/appointments" sx={{color:'#666',fontFamily:'Roboto Serif',fontWeight:'400',lineHeight:'11.42px',fontStyle:'italic',textTransform:'none'}}>
        View <br /> all
        </Button>
    </Card>

    </Box>

      <div className="listContainer">
      <h1 className="recentapph">Recent Applicants</h1>
      <Box 
        sx={{
          margin:'5px',
          height: '500px',
          width: 'max-content',
          color:'#666',
          fontFamily:'font-family: "Open Sans",sans-serif',
          borderRadius:'5px'
        }}>
      <CustomDataGrid
        rows={post}
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
        pageSizeOptions={[25]}  
        disableRowSelectionOnClick
      />
      </Box>
      </div>
      </div>
      </div>
  )
}
export default Home