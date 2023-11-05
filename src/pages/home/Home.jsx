import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import "./home.scss"
import "./home.css"
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import { CircularProgress, Typography } from '@mui/material';
import { ApplicantsRequest,FetchingReportUser } from '../../api/request';
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
    fontWeight:'bold',
    lineHeight:'17.57px',
    fontSize:'18px',
    borderBottom:'2px solid gray',
    height:'maxContent'
  },
});
const Home = () => {
  const [totalscho,setTotalscho] = useState([]);
  const [post , setPost] = useState([]);
  const[loading,setLoading] = useState(false)

  useEffect(() => {
    async function Fetch(){
      setLoading(true)
      const scholars = await FetchingReportUser.FETCH_USERACCS()
      const scho = scholars.data.result
      setTotalscho(scho)
      const response = await ApplicantsRequest.ALL_APPLICANTS()
      const appdatali = response.data.results;
      setPost(appdatali.reverse());
      setLoading(false)
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
      width: 100,
      editable: false,
      renderCell: (params) =>(
        <>
        <p style={{margin:'0px'}}>{params.row.score}/100</p>
        </>
      ),
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 150,
      editable: true,
    },


  ];
  const filteredRows = totalscho.filter((row) => row.status === 'Applicant');
  const scholarNew = totalscho.filter((row) => row.remarks === 'New Scholar');
  const scholarExist = totalscho.filter((row) => row.remarks === 'Existing Scholar');
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
          Applicants
      </Typography>
      <div className="totalicon">
      <Typography variant="h5" component="div" sx={{borderRight:'2px solid black',width:'80%',color:'#043F97',fontFamily:'Roboto Serif',fontWeight:'700',lineHeight:'23.42px'}}>
          {filteredRows.length}
      </Typography>
      <FaGraduationCap style={{width:'20px',color:'blue'}} />
      </div>
      <Button size="small" href="/Evaluation" sx={{color:'#666',fontFamily:'Roboto Serif',fontWeight:'400',lineHeight:'11.42px',fontStyle:'italic',textTransform:'none'}}>
        View <br /> all
      </Button>
    </Card>

    <Card elevation={0} sx={{ minWidth: 200,display:'flex',justifyContent:'space-between',alignItems:'center',padding:'10px 15px 10px 30px'}}>
        <Typography sx={{ fontSize: 20,fontWeight:'900',color:'black',lineHeight:'17.57px',fontFamily:'Roboto Serif' ,textAlign:'center'}} gutterBottom>
          Total <br/> New Scholars
        </Typography>
        <div className="totalicon">
        <Typography variant="h5" component="div" sx={{borderRight:'2px solid black',width:'80%',color:'#043F97',fontFamily:'Roboto Serif',fontWeight:'700',lineHeight:'23.42px'}}>
          {scholarNew.length}
        </Typography>
        <FaUser style={{width:'20px',color:'blue'}} />
        </div>
        <Button size="small" href="/scholars" sx={{color:'#666',fontFamily:'Roboto Serif',fontWeight:'400',lineHeight:'11.42px',fontStyle:'italic',textTransform:'none'}}>
        View <br /> all
        </Button>
    </Card>

    <Card elevation={0} sx={{ minWidth: 200,display:'flex',justifyContent:'space-between',alignItems:'center',padding:'10px 15px 10px 30px'}}>
    <Typography sx={{ fontSize: 20,fontWeight:'900',color:'black',lineHeight:'17.57px',fontFamily:'Roboto Serif',textAlign:'center' }} gutterBottom>
          Total <br/> Existing Scholars
        </Typography>
        <div className="totalicon">
        <Typography variant="h5" component="div" sx={{borderRight:'2px solid black',width:'80%',color:'#043F97',fontFamily:'Roboto Serif',fontWeight:'700',lineHeight:'23.42px'}}>
          {scholarExist.length}
        </Typography>
        <BsFillCalendarDateFill style={{width:'20px',color:'blue'}} />
        </div>
        <Button size="small" href="/scholars" sx={{color:'#666',fontFamily:'Roboto Serif',fontWeight:'400',lineHeight:'11.42px',fontStyle:'italic',textTransform:'none'}}>
        View <br /> all
        </Button>
    </Card>

    </Box>

      <div className="listContainer">
      <h1 className="recentapph">Recent Applicants</h1>
      <Box 
        sx={{
          margin:'5px',
          width: 'max-content',
          color:'#666',
          fontFamily:'font-family: "Open Sans",sans-serif',
          borderRadius:'5px'
        }}>
      {loading ? (
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
      </div>) : (<CustomDataGrid
        rows={post}
        columns={columns}
        getRowId={(row) => row.applicantNum}
        scrollbarSize={10}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        pageSizeOptions={[25]}  
        disableRowSelectionOnClick
      />)}
      </Box>
      </div>
      </div>
      </div>
  )
}
export default Home