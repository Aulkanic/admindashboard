import React, { useEffect, useState } from 'react'
import PrintablePage from './printablePage';
import './batch.css'
import Datatable from './Datatable';

function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

function Batch(filterdata){
  let data = filterdata.data ? filterdata.data.filteredStudents : [];
  const stat = filterdata.data ? filterdata.data.filterCriteria.Status : '';

  const modifiedList = data.map((item, index) => ({
    ...item,
    userNum: index + 1,
    Name: capitalize(item.Name),
    gender: capitalize(item.gender),
    ScholarshipApplied: capitalize(item.ScholarshipApplied),
    status: capitalize(item.status),
    baranggay: capitalize(item.baranggay),
    yearLevel: capitalize(item.yearLevel),

  }));
  
  let title = 'List of User Report';
  let columns=[]
  if(stat === 'Applicant'){
    title = 'List of Applicants Report';
    columns = [
      { field: 'userNum', headerName: '#', width: 50 },
      { field: 'Name', headerName: 'Name', width: 170 },
      { field: 'gender', headerName: 'Gender', width: 100 },
      { field: 'ScholarshipApplied', headerName: 'Scholarship Applied', width: 100 },
      { field: 'status', headerName: 'Status', width: 130 },
      { field: 'baranggay', headerName: 'Baranggay', width: 150 },
      { field: 'yearLevel', headerName: 'Year Level', width: 150 },
      { field: 'batch', headerName: 'Batch', width: 130 },
      { field: 'date', headerName: 'Date', width: 120 },
    ];
  }
  if(stat === 'Approved'){
    title = 'List of Scholars Report';
    columns = [
      { field: 'userNum', headerName: '#', width: 30,  align: 'left', },
      { field: 'Name', headerName: 'Name', width: 250,  align: 'left', },
      { field: 'gender', headerName: 'Gender', width: 100,  align: 'left', },
      { field: 'yearLevel', headerName: 'Year Level', width: 150,  align: 'left', },
      { field: 'baranggay', headerName: 'Baranggay', width: 150,  align: 'left', },
      { field: 'batch', headerName: 'Batch', width: 100,  align: 'left', },
      { field: 'ScholarshipApplied', headerName: 'Scholarship Program', width: 170,  align: 'left', },
      { field: 'approveDate', headerName: 'Date', width: 150 },
    ];
  }
  return (
    <>
    <PrintablePage value={data} cols={columns} head={title}/>
      <div>
        <Datatable props={modifiedList} col={columns}/>
      </div>
    </>
  )
}

export default Batch