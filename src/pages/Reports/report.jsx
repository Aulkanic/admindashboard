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
import { FetchingReportApp,FetchingReportScho,FetchingReportUser } from '../../api/request';

const Report = () => {
    const [applicants,setApplicants] = useState([]);
    const [scholars,setScholars] = useState([]);
    const [useraccs,setUserAccs] = useState([]);
    const [activeSection, setActiveSection] = useState('applicants');


    useEffect(() =>{
        async function Fetch(){
            let res1 = await FetchingReportApp.FETCH_APPLICANTS()
            let res2 = await FetchingReportScho.FETCH_SCHOLARS()
            let res3 = await FetchingReportUser.FETCH_USERACCS()
            console.log(res1)
            setApplicants(res1.data.result)
            setScholars(res2.data.result)
            setUserAccs(res3.data.result)
        }
        Fetch() 
    },[])

    const column = [
        { 
          field: 'applicantNum',
          headerName: 'ID',
          width: 90, 
          headerAlign: 'center',
        
        },
    
        {
          field: 'SchoIarshipApplied',
          headerName: 'Scholarship Applied',
          width: 200,
          editable: true,
          headerAlign: 'center'
    
        },
        {
          field: 'Name',
          headerName: 'Name',
          width: 150,
          editable: true,
          headerAlign: 'center',
        
        },
    
        {
          field: 'email',
          headerName: 'Email',
          width: 150,
          editable: false,
          headerAlign: 'center',
        
        },
    
        {
          field: 'status',
          headerName: 'Remarks',
          width: 150,
          editable: false,
          headerAlign: 'center',
        
        },
        {
          field: 'Batch',
          headerName: 'Batch',
          width: 150,
          editable: false,
          headerAlign: 'center',
        
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
          field: 'standing',
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
      console.log(applicants)
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
        <Card style={{width:'95%',display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center',height:'100%',margin:20}}>
        <div style={{margin:10}}>
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
        </Breadcrumbs>
        </div>
                        {activeSection === 'applicants' && (
                <DataGrid
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
                </div>
                </Card>
        </div>
        </div>
    </div>
    </>
  )
}

export default Report