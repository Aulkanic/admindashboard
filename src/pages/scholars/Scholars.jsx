import './scholars.scss';
import Sidebar from '../../components/sidebar/Sidebar'
import Navbar from '../../components/navbar/Navbar'
import { Tabs, Tab, Box, Modal } from "@mui/material"; 
import { DataGrid} from '@mui/x-data-grid';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';


import { useState, useEffect } from 'react';
import { FetchingBmccScho } from '../../api/request';

const Scholars = () => {
  const [data, setData] = useState([]);
  useEffect(() => {

    async function Fetch(){
      const scholars = await FetchingBmccScho.FETCH_SCHOLARS()
      console.log(scholars)
      setData(scholars.data.Scholars)
    }
    Fetch();
  }, []);
  const columns = [
    { 
      field: 'scholarId', 
      headerName: 'Scholar ID',
      width: 100
     },
     {
       field: 'scholarCode', 
        headerName: 'Scholar Code',
      width: 100
      },
    {
      field: 'scholarshipApplied',
      headerName: 'Scholarship Applied',
      width: 150,
      editable: false,
    },
    {
      field: 'Name',
      headerName: 'Name',
      width: 250,
      editable: false,
    },
    {
      field: 'yearLevel',
      headerName: 'Year Level',
      width: 150,
      editable: false,
    },
    {
      field: 'Baranggay',
      headerName: 'Baranggay',
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
      field: 'Batch',
      headerName: 'Batch',
      width: 110,
      editable: false,
    },

  ];

  return (
    <>
    <div className="scholars">
        <Sidebar/>
        <div className="scholarsContainer">
            <Navbar/>
            <div className="top">
            
              <h1>Scholars</h1>
              <Box sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={data}
        columns={columns}
        getRowId={(row) => row.scholarId}
        scrollbarSize={10}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[25]}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </Box>
              
            </div>
        </div>
    </div>
    </>
  )
}

export default Scholars