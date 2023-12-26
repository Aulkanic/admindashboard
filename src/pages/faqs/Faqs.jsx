import React, {useEffect, useState} from 'react'
import { FetchingBMCC,Activitylog,WebSection,BmccRoles } from '../../api/request';
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import { useSelector } from 'react-redux';
import { CustomModal } from '../../components/Modal/CustomModal';
import { CustomDatagrid } from '../../components/DataGrid/CustomDatagrid';
import { CustomDialog } from '../../components/Dialog/CustomDialog';
import CustomButton from '../../components/Buttons/button';
import { CreateStaff } from '../../Page/Private/Staff/Modal.jsx/CreateStaff';
import { UpdateStaff } from '../../Page/Private/Staff/Modal.jsx/UpdateStaff';
import { ManageStaff } from '../../Page/Private/Staff/Modal.jsx/ManageStaff';
import AddBmcc from '../../Page/Private/Staff/Action/AddBmcc';
import { CustomHeading } from '../../components/H1/h1';


const Faqs = () => {
  const { admin  } = useSelector((state) => state.login)
  const [loading, setLoading] = useState(false);
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
  const [bmcc,setBmcc] = useState([]);
  const [actlog,setActlog] = useState([]);
  const [roles, setRoles] = useState([]);
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [errors, setErrors] = useState({});
  const [activeState,setActiveState] = useState('log');
  const [websection,setWebsection] = useState([])
  const [selectedModules, setSelectedModules] = useState([]);
  const [selectedModules1, setSelectedModules1] = useState([]);
  const [isrole,setIsRole] = useState([])


  const handleClick = () => {
    setActiveState(activeState === 'log' ? 'admin' : 'log');
  };

  const columns = [
    {
      field: 'name',
      headerClassName: 'super-app-theme--header',
      headerName: 'Staff Name',
      width: 300,
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
        />
      ),
    },
  ];
  const handleOpen2 = () => setOpen2(true);
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


const handleModuleCheckboxChange = (moduleId) => {

  if (selectedModules.includes(moduleId)) {
    setSelectedModules(selectedModules.filter((id) => id !== moduleId));
  } else {
    setSelectedModules([...selectedModules, moduleId]);
  }
};
const handleModuleCheckboxChange1 = (moduleId) => {

  if (selectedModules1.includes(moduleId)) {
    setSelectedModules1(selectedModules1.filter((id) => id !== moduleId));
  } else {
    setSelectedModules1([...selectedModules1, moduleId]);
  }
};
const weblist = websection.map((data,index) => {
  return(
    <>
  {isrole.includes(data.name) ? null : (<label key={index}>
    <input
      type="checkbox"
      className='checkaccess'
      value={data.id}
      checked={selectedModules.includes(data.name) || isrole.includes(data.name)}
      onChange={() => handleModuleCheckboxChange(data.name)}
    />
    {data.name}
  </label>)}
  </>)
})
  return (
    <>
    <CustomModal
    open={modals.CreateOpen}
    title={'Add Staff'}
    onClose={() =>handleModalOpenClose('CreateOpen',false)}
    content={<CreateStaff
    data={createStaff}
    options={roles}
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
    options={roles}
    onSubmit={handleAddBmcc}
    handleInput={handleInputChange}
    handleSelect={handleOptionChange}
      />}
    />
    <CustomDialog
      open={modals.ManageOpen}
      title={'Manage Roles'}
      onClose={() =>handleModalOpenClose('ManageOpen',false)}
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
                  label={activeState === 'admin' ? 'Manage Employee' : 'View Activity Log'}
                  color={'blue'}
                />
                <CustomButton
                  onClick={handleOpen2}
                  label={'Manage staffs'}
                  color={'blue'}
                />
                <CustomButton
                  onClick={() =>handleModalOpenClose('CreateOpen',true)}
                  label={'Add staffs'}
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
                label={activeState === 'admin' ? 'Manage Employee' : 'View Activity Log'}
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
          </div>
          }
        </div>
    </div>
    </div>
    </>
  )
}

export default Faqs