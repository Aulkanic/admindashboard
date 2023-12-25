import React from 'react'
import {
    DataGrid,
    GridToolbarContainer,
    GridToolbarFilterButton,
    gridPageCountSelector,
    GridPagination,
    useGridApiContext,
    useGridSelector,
  } from '@mui/x-data-grid';
import MuiPagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import { LoadingOverlay } from './Overlay';
import { EmptyRow } from './EmptyRow';
import { Box } from '@mui/material';
import { CustomHeading } from '../H1/h1';


  function Pagination({ page, onPageChange, className }) {
    const apiRef = useGridApiContext();
    const pageCount = useGridSelector(apiRef, gridPageCountSelector);
  
    return (
      <MuiPagination
        color="primary"
        className={className}
        variant="outlined"
        shape="rounded"
        count={pageCount}
        page={page + 1}
        renderItem={(props2) => <PaginationItem {...props2} disableRipple />}
        onChange={(event, newPage) => {
          onPageChange(event, newPage - 1);
        }}
      />
    );
  }
  function CustomPagination(props) {
    return <GridPagination ActionsComponent={Pagination} {...props} />;
  }
  function CustomToolbar() {
    return (
      <GridToolbarContainer>
        <GridToolbarFilterButton />
      </GridToolbarContainer>
    );
  }

export const CustomDatagrid = ({loading,row,rowId,columns,title}) => {
  return (
    <Box className='w-full'
     sx={{
        minHeight: '400px',
        height:'400px',
        maxHeight:'maxContent',
        padding: '4px',
        width: '100%',
        '& .super-app-theme--header': {
          backgroundColor: '#2F96DB',
          borderBottom: '1px solid rgba(255, 7, 0, 0.9)',
          borderRadius:0 ,
          color:'white',
        },
        '& .css-1iyq7zh-MuiDataGrid-columnHeaders': {
          borderRadius:0  
        },
      }}
    >
      <CustomHeading  
       title={title}
      />
        <DataGrid
            className='overflow-x-auto w-full bg-white'
            loading={loading}
            slots={{
            toolbar: CustomToolbar,
            pagination: CustomPagination,
            loadingOverlay: LoadingOverlay,
            noRowsOverlay: EmptyRow
            }}
            rows={row}
            columns={columns}
            getRowId={(row) => row[rowId]}
        />  
    </Box>
  )
}

