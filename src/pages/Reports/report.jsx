import React, { useEffect, useState } from 'react'
import Navbar from "../../components/navbar/Navbar"
import Sidebar from "../../components/sidebar/Sidebar"
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { FetchingReportApp,FetchingReportScho,FetchingReportUser,RevokeUserList } from '../../api/request';
import { LineChart } from '@mui/x-charts/LineChart';
import { PieChart, pieArcLabelClasses } from '@mui/x-charts/PieChart';

const Report = () => {
    const [applicants,setApplicants] = useState([]);
    const [failed,setFailed] = useState([]);
    const [scholars,setScholars] = useState([]);
    const [useraccs,setUserAccs] = useState([]);
    const [activeSection, setActiveSection] = useState('applicants');


    useEffect(() =>{
        async function Fetch(){
            let res1 = await FetchingReportApp.FETCH_APPLICANTS()
            let res2 = await FetchingReportScho.FETCH_SCHOLARS()
            let res3 = await FetchingReportUser.FETCH_USERACCS()
            let res4 = await RevokeUserList.FETCH_REVOKE()
            console.log(res4)
            const res = res1.data.result?.filter(data => data.status === 'For Evaluation' || data.status === 'Qualified' || data.status === 'Applicant')
            const activescho = res2.data.result?.filter(data => data.status === 'Active' || data.status === 'Hold')
            setApplicants(res)
            setFailed(res4.data.result)
            setScholars(activescho)
            setUserAccs(res3.data.result)
        }
        Fetch() 
    },[])

    const column = [
        { 
          field: 'applicantNum',
          headerName: 'ID',
          width: 90, 
        
        },
    
        {
          field: 'SchoIarshipApplied',
          headerName: 'Scholarship Applied',
          width: 200,
          editable: true,
    
        },
        {
          field: 'Name',
          headerName: 'Name',
          width: 250,
          editable: false,
        
        },
    
        {
          field: 'email',
          headerName: 'Email',
          width: 250,
          editable: false,
        
        },
    
        {
          field: 'status',
          headerName: 'Remarks',
          width: 150,
          editable: false,     
        },
        {
          field: 'Batch',
          headerName: 'Batch',
          width: 150,
          editable: false,      
        },
      ];
    const column1 = [
        { 
          field: 'applicantNum',
          headerName: 'Applicant ID',
          width: 90, 
          headerAlign: 'center',
        
        },
    
        {
          field: 'scholarshipApplied',
          headerName: 'Scholarship Applied',
          width: 200,
          editable: true,
          headerAlign: 'center'
    
        },
        {
          field: 'Name',
          headerName: 'Name',
          width: 250,
          editable: true,
          headerAlign: 'center',
        
        },
    
        {
          field: 'email',
          headerName: 'Email',
          width: 250,
          editable: false,
          headerAlign: 'center',
        
        },
    
        {
          field: 'status',
          headerName: 'Remarks',
          width: 90,
          editable: false,
          headerAlign: 'center',
        
        },
      ];
    const column2 = [
        { 
          field: 'applicantNum',
          headerName: 'Applicant ID',
          width: 90, 
          headerAlign: 'center',
        
        },
    
        {
          field: 'ScholarshipApplied',
          headerName: 'Scholarship Applied',
          width: 200,
          editable: true,
          headerAlign: 'center'
    
        },
        {
          field: 'Name',
          headerName: 'Name',
          width: 250,
          editable: true,
          headerAlign: 'center',
        
        },
    
        {
          field: 'email',
          headerName: 'Email',
          width: 250,
          editable: false,
          headerAlign: 'center',
        
        },
    
        {
          field: 'status',
          headerName: 'Remarks',
          width: 90,
          editable: false,
          headerAlign: 'center',
        
        },
      ];
    const column3 = [
        { 
          field: 'applicantNum',
          headerName: 'Applicant ID',
          width: 90, 
          headerAlign: 'center',
        
        },
    
        {
          field: 'Name',
          headerName: 'Name',
          width: 200,
          editable: true,
          headerAlign: 'center'
    
        },
        {
          field: 'ScholarshipApplied',
          headerName: 'ScholarshipApplied',
          width: 250,
          editable: true,
        
        },
    
        {
          field: 'Batch',
          headerName: 'Batch',
          width: 200,
          editable: false,
        
        },
    
        {
          field: 'Reason',
          headerName: 'Reason',
          width: 300,
          editable: false,
        
        },
      ];
      const data = [
        { value: `${applicants.length}`, label: 'Applicants',color:'orange' },
        { value: `${scholars.length}`, label: 'Scholars',color:'green' },
        { value: `${failed.length}`, label: 'Failed',color:'red' },
      ];
      
      const size = {
        width: 450,
        height: 400,
      };
      const TOTAL = data.map((item) => item.value).reduce((a, b) => a + b, 0);
      const getArcLabel = (params) => {
        const percent = params.value / TOTAL;
        return `${(percent * 100).toFixed(0)}%`;
      };

  return (
    <>
    <div className="scholarships" style={{backgroundColor:'whitesmoke'}}>
        <Sidebar/>
    <div className="scholarshipsContainer">
        <Navbar/>
        <div>
            <Typography style={{fontSize:30,fontWeight:'bold',margin:10}}>
                Reports
            </Typography>
        <Card style={{width:'98%',display:'flex',justifyContent:'center',alignItems:'center',height:'100%',padding:'10px',flexDirection:'column'}}>
          <div style={{display:'flex',width:'100%'}}>
              <div style={{width:'40%',margin:'10px'}}>
              <PieChart
                series={[
                  {
                  outerRadius: 150,
                  data,
                  arcLabel: getArcLabel,
                  },
                ]}
                sx={{
                  [`& .${pieArcLabelClasses.root}`]: {
                    fill: 'white',
                    fontWeight: 'bold',
                    fontSize:'13px'
                  },
                  "--ChartsLegend-rootOffsetX": "0px",
                }}
                {...size}
              />            
              </div>
              <div style={{width:'40%',height:'100%'}}>
              <LineChart
                  xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
                  series={[
                    {
                      data: [2, 5.5, 2, 8.5, 1.5, 5],
                      area: true,
                    },
                  ]}
                  width={600}
                  height={400}
                />
              </div>
        </div>
        <div style={{width:'100%'}}>
        <div style={{backgroundColor:'green',width:'100%'}}>
        <Breadcrumbs aria-label="breadcrumb">
        <Button onClick={() => setActiveSection('applicants')}>
            <Link underline="hover"
                      sx={{
                        color: activeSection === 'applicants' ? 'white' : 'black',
                      }}>
          Applicants
        </Link>
        </Button>
        <Button onClick={() => setActiveSection('scholars')}>
        <Link
          underline="hover"
          sx={{
            color: activeSection === 'scholars' ? 'white' : 'black',
          }}
        >
          Scholars
        </Link>
        </Button>
        <Button onClick={() => setActiveSection('useraccs')}>
        <Link
          underline="hover"
          sx={{
            color: activeSection === 'useraccs' ? 'white' : 'black',
          }}
          aria-current="page"
        >
          User Account
        </Link>
        </Button>
        <Button onClick={() => setActiveSection('failed')}>
        <Link
          underline="hover"
          sx={{
            color: activeSection === 'failed' ? 'white' : 'black',
          }}
          aria-current="page"
        >
          Failed Applicants/Scholars
        </Link>
        </Button>
        </Breadcrumbs>
        </div>
                {activeSection === 'applicants' && (
                <DataGrid
                    sx={{width:'100%'}}
                    slots={{ toolbar: GridToolbar }}
                    columns={column}
                    rows={applicants}
                    getRowId={(row) => row.applicantNum}
                    scrollbarSize={10}
                    initialState={{
                    pagination: {
                        paginationModel: {
                        pageSize: 5,
                        },},}}

                    checkboxSelection   
                    disableRowSelectionOnClick
                    pageSizeOptions={[25]}
                />
                )}
                {activeSection === 'scholars' && (
                <DataGrid
                slots={{ toolbar: GridToolbar }}
                    columns={column1}
                    rows={scholars}
                    getRowId={(row) => row.applicantNum}
                    scrollbarSize={10}
                    initialState={{
                    pagination: {
                        paginationModel: {
                        pageSize: 5,
                        },},}}

                    checkboxSelection   
                    disableRowSelectionOnClick
                    pageSizeOptions={[25]}
                />
                )}
                {activeSection === 'useraccs' && (
                <DataGrid
                slots={{ toolbar: GridToolbar }}
                    columns={column2}
                    rows={useraccs}
                    getRowId={(row) => row.applicantNum}
                    scrollbarSize={10}
                    initialState={{
                    pagination: {
                        paginationModel: {
                        pageSize: 5,
                        },},}}

                    checkboxSelection   
                    disableRowSelectionOnClick
                    pageSizeOptions={[25]}
                />
                )}
                {activeSection === 'failed' && (
                <DataGrid
                slots={{ toolbar: GridToolbar }}
                    columns={column3}
                    rows={failed}
                    getRowId={(row) => row.applicantNum}
                    scrollbarSize={10}
                    initialState={{
                    pagination: {
                        paginationModel: {
                        pageSize: 5,
                        },},}}

                    checkboxSelection   
                    disableRowSelectionOnClick
                    pageSizeOptions={[25]}
                />
                )}
        </div>
        </Card>
        </div>
        </div>
    </div>
    </>
  )
}

export default Report