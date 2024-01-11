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

export const CustomDatagrid = ({loading,row,rowId,columns,title,handleRowSelectionModelChange,rowSelectionModel}) => {
  return (
    <Box 
     sx={{
        padding: '4px',
        width: '100%',
        height: row.length === 0 ? '400px' : 'auto',
        '& .super-app-theme--header': {
          backgroundColor: '#2F96DB',
          borderBottom: '1px solid rgba(255, 7, 0, 0.9)',
          borderRadius:0 ,
          color:'white',
          fontWeight:900
        },
        '& .css-1iyq7zh-MuiDataGrid-columnHeaders': {
          borderRadius:0  
        },
        '& .css-t89xny-MuiDataGrid-columnHeaderTitle': {
          fontWeight:600
        },
        
      }}
    >
      <div className='mb-2'>
      <CustomHeading  
       title={title}
      />
      </div>
        <DataGrid
            className='min-h-96 w-full bg-white'
            loading={loading}
            autoHeight
            slots={{
            toolbar: CustomToolbar,
            pagination: CustomPagination,
            loadingOverlay: LoadingOverlay,
            noRowsOverlay: EmptyRow
            }}
            rows={row}
            columns={columns}
            initialState={{
              ...row.initialState,
              pagination: { paginationModel: { pageSize: 10 } },
            }}
            sx={{ '--DataGrid-overlayHeight': '300px' }}
            pageSizeOptions={[5, 10, 25]}
            getRowId={(row) => row[rowId]}
            onRowSelectionModelChange={handleRowSelectionModelChange}
            rowSelectionModel={rowSelectionModel}
            disableExtendRowFullWidth
        />  
    </Box>
  )
}

