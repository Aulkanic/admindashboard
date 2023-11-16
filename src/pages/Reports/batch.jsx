import React, { useEffect, useState } from 'react'
import PrintablePage from './printablePage';
import './batch.css'
import Datatable from './Datatable';

function Batch(filterdata){
  let data = filterdata.data ? filterdata.data.dataTransfer : [];
  const stat = filterdata.data ? filterdata.data.filterCriteria.Status : '';

  const modifiedList = data?.map((item, index) => ({
    ...item,
    userNum: index + 1,
    contactNum: `0${item.contactNum};`
  }));
  
  const title = filterdata.data ? filterdata.data.title : '';
  let columns=[
    { field: 'userNum', headerName: '#', width: 50 },
    { field: 'Name', headerName: 'Name', width: 170 },
    { field: 'gender', headerName: 'Gender', width: 100 },
    { field: 'contactNum', headerName: 'Phone Number', width: 150 },
    { field: 'ScholarshipApplied', headerName: 'Scholarship Applied', width: 100 },
    { field: 'UserProfileStatus', headerName: 'Status', width: 130 },
    { field: 'Remarks', headerName: 'Remarks', width: 170 },
    { field: 'baranggay', headerName: 'Baranggay', width: 150 },
    { field: 'yearLevel', headerName: 'Year Level', width: 150 },
    { field: 'school', headerName: 'School', width: 150 },
    { field: 'date', headerName: 'Date Applied', width: 150 },
    { field: 'Batch', headerName: 'Batch', width: 130 },
    
  ]
  if(stat === 'Applicant'){
    columns = [
      { field: 'userNum', headerName: '#', width: 50 },
      { field: 'Name', headerName: 'Name', width: 170 },
      { field: 'gender', headerName: 'Gender', width: 100 },
      { field: 'contactNum', headerName: 'Phone Number', width: 100 },
      { field: 'ScholarshipApplied', headerName: 'Scholarship Applied', width: 100 },
      { field: 'UserProfileStatus', headerName: 'Status', width: 130 },
      { field: 'Remarks', headerName: 'Remarks', width: 170 },
      { field: 'baranggay', headerName: 'Baranggay', width: 150 },
      { field: 'yearLevel', headerName: 'Year Level', width: 150 },
      { field: 'school', headerName: 'School', width: 150 },
      { field: 'date', headerName: 'Date Applied', width: 150 },
      { field: 'Batch', headerName: 'Batch', width: 130 },
    ];
  }
  if(stat === 'Approved'){
    columns = [
      { field: 'userNum', headerName: '#', width: 50 },
      { field: 'Name', headerName: 'Name', width: 170 },
      { field: 'gender', headerName: 'Gender', width: 100 },
      { field: 'ScholarshipApplied', headerName: 'Scholarship Applied', width: 170 },
      { field: 'UserProfileStatus', headerName: 'Status', width: 130 },
      { field: 'Remarks', headerName: 'Remarks', width: 170 },
      { field: 'baranggay', headerName: 'Baranggay', width: 150 },
      { field: 'yearLevel', headerName: 'Year Level', width: 150 },
      { field: 'school', headerName: 'Year Level', width: 150 },
      { field: 'approveDate', headerName: 'Date Approved', width: 150 },
      { field: 'renewedDate', headerName: 'Date Renewed', width: 150 },
      { field: 'Batch', headerName: 'Batch', width: 100 },
    ];
  }
  return (
    <>
      <PrintablePage for={'Data'} value={modifiedList} cols={columns} head={title}/>
      <Datatable props={modifiedList} col={columns}/>
    </>
  )
}

export default Batch