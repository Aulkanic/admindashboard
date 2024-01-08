import { UsersRequest } from '../../../api/request';
import { useEffect, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import { CustomDatagrid } from '../../../components/DataGrid/CustomDatagrid';
import { CustomHeading } from '../../../components/H1/h1';

export const UserAccs = () => {
  const [display, setDisplay] = useState([]);
  const [loading,setLoading] = useState(false);

  const columns = [
    {
      field: 'ScholarshipApplied',
      headerName: 'Scholarship',
      headerClassName: 'super-app-theme--header',
      width: 100,
      editable: false,
    },
    {
      field: 'profile',
      headerName: 'Profile',
      headerClassName: 'super-app-theme--header',
      width: 120,
      renderCell: (params) => {
        const isOnline = params.row.isOnline; 
        let chipColor = 'error'; 
        let status = 'Offline';
        if (isOnline === 'True') {
          chipColor = 'success'; 
          status = 'Online'
        }
        return (
          <Chip 
            color={chipColor}
            label={status}
            avatar={
              <Avatar
                alt="No Image"
                src={params.value}
                sx={{ width: 35, height: 35 }}
              />}/>
        );},
      },
    {
      field: 'userType',
      headerName: 'Type',
      headerClassName: 'super-app-theme--header',
      width: 100,
      editable: true,
    },
    {
      field: 'Name',
      headerName: 'Name',
      headerClassName: 'super-app-theme--header',
      width: 250,
      editable: true,
    },
    {
      field: 'email',
      headerName: 'Email',
      headerClassName: 'super-app-theme--header',
      width: 230,
      editable: false,
    },
    {
      field: 'status',
      headerName: 'Status',
      headerClassName: 'super-app-theme--header',
      width: 100,
      editable: false,
    },
    {
      field: 'remarks',
      headerName: 'Remarks',
      headerClassName: 'super-app-theme--header',
      width: 150,
      editable: false,
    },
    {
      field: 'device',
      headerName: 'Device used',
      headerClassName: 'super-app-theme--header',
      width: 120,
      editable: false,
    },
  ];

  useEffect(() => {
    async function Fetch(){
      setLoading(true)
      const userinfo = await UsersRequest.ALL_USERS()
      setDisplay(userinfo.data.UserAccounts);
      setLoading(false)
    }
    Fetch();
  },[]);

  return (
    <>
    <div className='w-full p-8 flex flex-col justify-center items-center'>
      <div className='w-full mb-4'>
      <CustomHeading title={'Users Account List'}   />
      </div>
      <div className='w-max'>
      <CustomDatagrid
        loading={loading}
        row={display}
        columns={columns}
        rowId={'applicantNum'}
      />
      </div>
    </div>
    </>
  )
}
