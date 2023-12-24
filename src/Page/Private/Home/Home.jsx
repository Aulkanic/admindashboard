import React, { useEffect, useState } from 'react'
import { CustomCard } from '../../../components/Card/CustomCard'
import TotalScho from '../../../Images/Graduation-Scholarship.png'
import TotalAppli from '../../../Images/4531669.png'
import TotalPending from '../../../Images/Blocked-Transparent-File.png'
import { CustomDatagrid } from '../../../components/DataGrid/CustomDatagrid'
import { MYDOUsers } from '../../../api/request'

const columns = [
  {
    field: 'Name',
    headerClassName: 'super-app-theme--header',
    headerName: 'Name',
    width: 300,
    editable: true,
  },
  
  {
    field: 'email',
    headerClassName: 'super-app-theme--header',
    headerName: 'Email',
    width: 250,
    editable: false,
  },
  {
    field: 'ScholarshipApplied',
    headerClassName: 'super-app-theme--header',
    headerName: 'Scholarship Applied',
    width: 250,
    editable: true,
  },
  {
    field: 'date',
    headerClassName: 'super-app-theme--header',
    headerName: 'Date Applied',
    width: 250,
    editable: false,
  },
  {
    field: 'score',
    headerClassName: 'super-app-theme--header',
    headerName: 'Score',
    width: 100,
    editable: false,
    renderCell: (params) =>(
      <>
      <p style={{margin:'0px'}}>{params.row.score}/100</p>
      </>
    ),
  },
  {
    field: 'UserProfileStatus',
    headerClassName: 'super-app-theme--header',
    headerName: 'Status',
    width: 150,
    editable: true,
  },


];

export const Home = () => {
  const [loading,setLoading] = useState(false)
  const [user,setUser] = useState({
    applicants: [],
    scholars: [],
    pending:[]
  })
  useEffect(() =>{
     async function Fetch(){
      setLoading(true)
      const res = await MYDOUsers.ALLDATA();
      const applicants = res.data.filter(data => data.UserProfileStatus === 'Applicant')
      const scholars = res.data.filter(data => data.UserProfileStatus === 'Approved')
      const pending = res.data.filter(data => data.UserProfileStatus === 'Approved' && data.Remarks === 'Pending Scholar')
      setUser({
        ...user,
        applicants: applicants,
        scholars :scholars,
        pending: pending
      })
      setLoading(false)
     }
     Fetch()
  },[])
  return (
    <div className='w-full'>
      <div className='w-full flex flex-wrap gap-4 p-4'>
        <CustomCard
        img={TotalScho}
        title={'45'}
        content={'Total Scholar'}
        />
        <CustomCard
        img={TotalAppli}
        title={'45'}
        content={'Total Scholar'}
        />
        <CustomCard
        img={TotalPending}
        title={'45'}
        content={'Total Scholar'}
        />
      </div>
      <div className='p-4'>
        <CustomDatagrid
          loading={loading}
          row={user.applicants}
          columns={columns}
          rowId={'applicantNum'}
        />
      </div>
    </div>
  )
}
