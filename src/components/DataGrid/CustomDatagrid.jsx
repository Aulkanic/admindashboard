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
import LinearProgress from '@mui/material/LinearProgress';
import PaginationItem from '@mui/material/PaginationItem';


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

export const CustomDatagrid = ({loading,row,rowId,columns}) => {
  return (
    <div>
        <DataGrid
            loading={loading}
            slots={{
            toolbar: CustomToolbar,
            pagination: CustomPagination,
            loadingOverlay: LinearProgress,
            }}
            rows={row}
            columns={columns}
            getRowId={(row) => row[rowId]}
        />  
    </div>
  )
}
