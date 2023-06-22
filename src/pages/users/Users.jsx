import { UsersRequest } from '../../api/request';
import Navbar from '../../components/navbar/Navbar';
import Sidebar from '../../components/sidebar/Sidebar';
import './users.scss';
import { useEffect, useState } from 'react';
import { Tabs, Tab, Box, Modal } from "@mui/material"; 
import { styled } from '@mui/material/styles';
import { DataGrid} from '@mui/x-data-grid';
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';

const Users = () => {
  
  const [open, setOpen] = useState(false);
  const [display, setDisplay] = useState([]);
  const [status, setStatus] = useState('Active');

  const handleButtonClick = (id) => {
    setDisplay(prevDisplay => {
      return prevDisplay.map(row => {
        if (row.applicantNum === id) {
          if (row.remarks === 'Active') {
            return { ...row, remarks: 'Inactive' };
          } else if (row.status === 'Inactive') {
            return { ...row, remarks: 'Deactivated' };
          } else {
            return { ...row, remarks: 'Active' };
          }
        }
        return row;
      });
    });
  };
  
  const columns = [
    { field: 'applicantNum',
     headerName: 'Applicant ID',
      width: 100, 
       
    },
    {
      field: 'ScholarshipApplied',
      headerName: 'Scholarship Applied',
      width: 250,
      editable: true,
    },
    {
      field: 'profile',
      headerName: 'Profile',
      width: 150,
      renderCell: (params) => {
        console.log(params)
        const isOnline = params.row.isOnline; // Assuming there's a field named 'online' in your data
        
        let chipColor = 'error'; 
        let status = 'Offline';
        if (isOnline === 'True') {
          chipColor = 'success'; // Set color to green if user is online
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
              />
            }
          />
        );
      },
    },
    {
      field: 'Name',
      headerName: 'Name',
      width: 250,
      editable: true,
    },
    {
      field: 'email',
      headerName: 'Email',
      width: 250,
      editable: false,
    },
    {
      field: 'status',
      headerName: 'Remarks',
      width: 100,
      editable: false,
    },
    {
      field: 'remarks',
      headerName: 'Account Status',
      width: 110,
      renderCell: (params) => (
        <button onClick={() => handleButtonClick(params.row.applicantNum)}>
          {params.row.remarks === 'Active'
            ? 'Active'
            : params.row.remarks === 'Inactive'
            ? 'Inactive'
            : 'Deactivated'}
        </button>
      ),
    },
  ];
  const CustomDataGrid = styled(DataGrid)({
    '& .MuiDataGrid-columnHeaders': {
      backgroundColor: 'green', 
      color: 'white', 
    },
  });
  
  useEffect(() => {
    async function Fetch(){
      const userinfo = await UsersRequest.ALL_USERS()
      console.log(userinfo)
      setDisplay(userinfo.data.UserAccounts);
    }
    Fetch();
   
  }, []);

console.log(display)
  return (
    <>
    <div className="users">
      <Sidebar />
      <div className="usersContainer">
        <Navbar />
        <div className="top">
          <h1> Users Account List </h1>
          <Box sx={{ height: 400, width: '100%' }}>
      <CustomDataGrid
        rows={display}
        columns={columns}
        getRowId={(row) => row.applicantNum}
        scrollbarSize={10}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        checkboxSelection   
        disableRowSelectionOnClick
        pageSizeOptions={[25]}
      />
    </Box>
        </div>
      </div>
    </div>
    </>
  )
}


export default Users