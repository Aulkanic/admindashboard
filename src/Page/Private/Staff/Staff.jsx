import React, {useEffect, useState} from 'react'
import { FetchingBMCC,Activitylog,WebSection,BmccRoles } from '../../../api/request';
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import { CiEdit } from "react-icons/ci";
import { MdOutlineManageAccounts } from "react-icons/md";
import { MdOutlineManageHistory } from "react-icons/md";
import { FaUserCog } from "react-icons/fa";
import { FaUserPlus } from "react-icons/fa";
import { CustomModal } from '../../../components/Modal/CustomModal';
import { CustomDatagrid } from '../../../components/DataGrid/CustomDatagrid';
import { CustomDialog } from '../../../components/Dialog/CustomDialog';
import CustomButton from '../../../components/Buttons/button';
import { CreateStaff } from './Modals/CreateStaff';
import { UpdateStaff } from './Modals/UpdateStaff';
import { ManageStaff } from './Modals/ManageStaff';
import AddBmcc from './Action/AddBmcc';
import { CustomHeading } from '../../../components/H1/h1';
import AddMYDORole from './Action/AddRole';
import Authorization from './Action/Authorization';
import UpdateBmcc from './Action/UpdateBmcc';

export const Staff = () => {
  const [loading, setLoading] = useState(false);
  const [selectedRole,setSelectedRole] = useState({
    value:'',
    list:[],
    checked:[]
  })
  const [createStaff,setCreateStaff] = useState({
    username: '',
    email: '',
    jobDes: ''
  })
  const [updateStaff,setUpdateStaff] = useState({
    oldData: [],
    newData:{
      jobDes: '',
      status: '',
    }
  })
  const [officials,setOfficials] = useState({
    List:[],
    Administrator: [],
    Officer: [] ,
    Coordinator:[],
    Manager:[]
  })
  const [modals,setModals] = useState({
    CreateOpen:false,
    UpdateOpen:false,
    ManageOpen:false
  })
  const [addRole,setAddRole] = useState([])
  const [bmcc,setBmcc] = useState([]);
  const [actlog,setActlog] = useState([]);
  const [errors, setErrors] = useState({});
  const [activeState,setActiveState] = useState('log');
  const [websection,setWebsection] = useState([])


  const handleClick = () => {
    setActiveState(activeState === 'log' ? 'admin' : 'log');
  };

  const columns = [
    {
      field: 'name',
      headerClassName: 'super-app-theme--header',
      headerName: 'Staff Name',
      width: 320,
      editable: false,
    },
    {
      field: 'action',
      headerClassName: 'super-app-theme--header',
      headerName: 'Action',
      width: 350,
      editable: false,
    },
    {
      field: 'applicantNum',
      headerClassName: 'super-app-theme--header',
      headerName: 'Applicant Code',
      width: 250,
      editable: false,
    },
    {
      field: 'date',
      headerClassName: 'super-app-theme--header',
      headerName: 'When',
      width: 250,
      editable: false,
    }
  ];
  const columns1 = [
    {
      field: 'profile',
      headerClassName: 'super-app-theme--header',
      headerName: 'Active Status',
      width: 200,
      renderCell: (params) => {
        const isOnline = params.row.isOnline;
        
        let chipColor = 'error'; 
        let status = 'Offline';
        let color = 'rgba(229, 226, 226, 1)';
        let font = 'black'
        if (isOnline === 'True') {
          chipColor = 'primary'; 
          status = 'Online';
          color = 'rgba(0, 255, 10, 1)';
          font = 'white'
        }
        return (
          <Chip 
            label={status}
            sx={{backgroundColor:color,color: font,fontWeight:'bold'}}
            avatar={
              <Avatar
                alt="No Image"
                src={params.value}
                sx={{ width: 35, height: 35 }}
              />}/>
        );},},

    {
      field: 'name',
      headerClassName: 'super-app-theme--header',
      headerName: 'Staff Name',
      width: 200,
      editable: false,
    },
    {
      field: 'email',
      headerClassName: 'super-app-theme--header',
      headerName: 'Staff Email',
      width: 150,
      editable: false,
    },
    {
      field: 'jobDescription',
      headerClassName: 'super-app-theme--header',
      headerName: 'Role',
      width: 170,
      editable: false,
    },
    {
      field: 'status',
      headerClassName: 'super-app-theme--header',
      headerName: 'Account Status',
      width: 200,
      editable: false,
    },
    {
      field: 'insert',
      headerClassName: 'super-app-theme--header',
      headerName: 'Action',
      width: 250,
      renderCell: (params) => (
        <CustomButton
          onClick={() =>handleModalOpenClose('UpdateOpen',true,params.row)}
          color={'blue'}
          label={'Edit Details'}
          icon={<CiEdit className='text-lg' />}
          iconPosition={'start'}
        />
      ),
    },
  ];
  const handleInputChange = (event) =>{
     const { name,value,id } = event.target;
     if(id === 'Create'){
      setCreateStaff({...createStaff,[name]: value})
     }else{
      setUpdateStaff((prev) =>({
        ...prev,
        newData:{
          ...prev.newData,
          [name]: value
        }
      }))
     }
  }
  const handleOptionChange = (data)=>{
    const { name,value,id } = data;
    if(id === 'Create'){
      setCreateStaff({...createStaff,[name]: value})
     }else if(id === 'Manage'){
       const listed = officials.List?.filter(data => data.role === value)
       setSelectedRole({
        ...selectedRole,
        value: value,
        list: listed[0].accessList
       })
     }
     else{
      setUpdateStaff((prev) =>({
        ...prev,
        newData:{
          ...prev.newData,
          [name]: value
        }
      }))
     }
  }
  const handleChecked = (data) =>{
    if(selectedRole.checked.includes(data)){
      setSelectedRole({
        ...selectedRole,
        checked: selectedRole.checked.filter((id) => id !== data)
      })
    }else{
      setSelectedRole({
        ...selectedRole,
        checked: [...selectedRole.checked, data]
      })
    }
  }
  const handleCheckboxChange = (moduleId) => {
    if (addRole.includes(moduleId)) {
      setAddRole(addRole.filter((id) => id !== moduleId));
    } else {
      setAddRole([...addRole, moduleId]);
    }
  };
  const handleModalOpenClose = (modalType,value,isData) =>{
    setModals({
      ...modals,
      [modalType]:value
    })
    if(isData){
      setUpdateStaff((prev) =>({
        ...prev,
        oldData:isData
      }))      
    }
  }

  useEffect(() =>{
        async function Fetch(){
        setLoading(true)
        const list = await FetchingBMCC.FETCH_BMCC()
        const actlog = await Activitylog.ACTIVITY_LOG()
        const web = await WebSection.WEB_SEC()
        const rls = await BmccRoles.BMCC_ROLE()
        const roleData = rls.data.roles;
        setOfficials({
          ...officials,
          List: roleData.sort((a,b) => a.role.localeCompare(b.role)),
          Administrator: roleData.filter(data => data.roleNum === 1),
          Officer: roleData.filter(data => data.roleNum === 3),
          Coordinator: roleData.filter(data=> data.roleNum === 4),
          Manager: roleData.filter(data => data.roleNum === 2)
        })
          setWebsection(web.data.result)
          setBmcc(list.data.message)
          const activitylog = actlog.data.Log
          setActlog(activitylog.reverse())
          setLoading(false)
        }
        Fetch();
  },[])

  const handleAddBmcc = () => {
    AddBmcc({
      setErrors,
      handleModalOpenClose,
      setBmcc,
      setCreateStaff,
      setLoading,
      createStaff
    });
  };



  return (
    <>
    <CustomModal
    open={modals.CreateOpen}
    title={'Add Staff'}
    onClose={() =>handleModalOpenClose('CreateOpen',false)}
    content={<CreateStaff
    data={createStaff}
    options={officials}
    onSubmit={handleAddBmcc}
    handleInput={handleInputChange}
    handleSelect={handleOptionChange}
      />}
    />
    <CustomModal
    open={modals.UpdateOpen}
    title={'Update Staff'}
    onClose={() =>handleModalOpenClose('UpdateOpen',false)}
    content={<UpdateStaff
    data={updateStaff}
    options={officials}
    onSubmit={() => UpdateBmcc({updateStaff,setLoading,setBmcc,setModals,modals,setBmcc})}
    handleInput={handleInputChange}
    handleSelect={handleOptionChange}
      />}
    />
    <CustomDialog
      open={modals.ManageOpen}
      title={'Manage Roles'}
      handleClose={() =>handleModalOpenClose('ManageOpen',false)}
      content={<ManageStaff 
      officials={officials}
      AddMYDORoles={() =>AddMYDORole({addRole,setOfficials,officials,setLoading})}
      handleSelect={handleOptionChange}
      selectedRole={selectedRole}
      webSection={websection}
      handleChecked={handleChecked}
      handleCheckboxChange={handleCheckboxChange}
      addRole={addRole}
      setLoading={setLoading}
      setOfficials={setOfficials}
      setSelectedRole={setSelectedRole}
      Authorization={() =>Authorization({setSelectedRole,selectedRole,setOfficials,officials,setLoading})}
      />}

    />
    <div className="w-full">
      <div className="top">
        <div className="w-full">
          {activeState === 'log' && 
          <div className="w-full p-4">
            <div className='flex justify-between items-center w-full mb-4'>
              <CustomHeading  title={'Staff List'} />
              <div className='flex gap-4'>
                <CustomButton
                  onClick={handleClick}
                  label={'View Activity Log'}
                  icon={<MdOutlineManageHistory />}
                  iconPosition={'start'}
                  color={'blue'}
                />
                <CustomButton
                  onClick={() =>handleModalOpenClose('ManageOpen',true)}
                  label={'Manage staffs'}
                  icon={<FaUserCog />}
                  iconPosition={'start'}
                  color={'blue'}
                />
                <CustomButton
                  onClick={() =>handleModalOpenClose('CreateOpen',true)}
                  label={'Add staffs'}
                  icon={<FaUserPlus />}
                  iconPosition={'start'}
                  color={'blue'}
                />
              </div>
            </div>
            <div>
              <CustomDatagrid
                loading={loading}
                row={bmcc}
                columns={columns1}
                rowId={'id'}
              />
            </div>
            
          </div>}
          {activeState === 'admin' && 
          <div className="w-full p-4">
            <div className='flex justify-between items-center mb-4'>
              <CustomHeading title={'Activity Log'} />
              <CustomButton
                onClick={handleClick}
                label={'Manage Employee'}
                icon={<MdOutlineManageAccounts />}
                iconPosition={'start'}
                color={'blue'}
              />
            </div>
            <div>
              <CustomDatagrid
                loading={loading}
                row={actlog}
                columns={columns}
                rowId={'activityLog'}
              />
            </div>
          </div>}
        </div>
    </div>
    </div>
    </>
  )
}
