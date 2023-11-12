import React from 'react'
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { styled } from '@mui/material';
import CustomNoRowsOverlay from '../Design/Norows';

const CustomDataGrid = styled(DataGrid)({
    '& .MuiDataGrid-columnHeaders': {
      color: 'white', 
      fontWeight:'bold',
      backgroundColor:'#0047a4',
      fontWeight:'bold'
    },
  });

export default function Datatable(data) {
    const rowdata = data.props || [];
    const column = data.col;
  return (
    <Box sx={{ backgroundColor:'white',minHeight:'300px',width:'100%',overflowX:'auto'}}>
    <CustomDataGrid
      sx={{minHeight:'300px'}}
      rows={rowdata}
      columns={column}
      getRowId={(row) => row.applicantNum}
      initialState={{
        pagination: {
          paginationModel: {
            pageSize: 10,
           },
          },
        }}
        slots={{
          noRowsOverlay: CustomNoRowsOverlay,
        }}
      pageSizeOptions={[5,10,20]}
      disableRowSelectionOnClick
    /> 
    </Box>
  )
}
