import React, { useEffect, useState } from 'react'
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import './batch.css'
import Button from 'react-bootstrap/Button';
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
  const columns = [
    { field: 'userNum', headerName: '#', width: 70 },
    { field: 'Name', headerName: 'Name', width: 200 },
    { field: 'gender', headerName: 'Gender', width: 100 },
    { field: 'ScholarshipApplied', headerName: 'Scholarship Applied', width: 150 },
    { field: 'remarks', headerName: 'Remarks', width: 130 },
    { field: 'status', headerName: 'Status', width: 130 },
    { field: 'baranggay', headerName: 'Baranggay', width: 170 },
    { field: 'yearLevel', headerName: 'Year Level', width: 150 },
    { field: 'batch', headerName: 'Batch', width: 130 },
  ];

  return (
    <>
      <div>
        <Datatable props={modifiedList} col={columns}/>
      </div>
    </>
  )
}

export default Batch