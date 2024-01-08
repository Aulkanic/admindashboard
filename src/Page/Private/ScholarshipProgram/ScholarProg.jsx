import { FetchingSchoProg } from "../../../api/request";
import { useEffect } from "react";
import { useState } from "react";
import dayjs from 'dayjs';
import Avatar from '@mui/material/Avatar';
import { CustomHeading } from "../../../components/H1/h1";
import CustomButton from "../../../components/Buttons/button";
import { CustomDatagrid } from "../../../components/DataGrid/CustomDatagrid";
import { CreateScho } from "./Modal/CreateScho";
import { CustomModal } from "../../../components/Modal/CustomModal";
import { IoAddSharp } from "react-icons/io5";
import { CiEdit } from "react-icons/ci";
import { UpdateScho } from "./Modal/UpdateScho";

export const ScholarProg = () => {
  const [schocat, setSchocat] = useState([]);
  const [loading,setLoading] = useState(false)
  const [modals,setModals] = useState({
    AddOpen:false,
    EditOpen: false
  })
  const [createScho,setCreateScho] = useState({
    title:"",
    description:"",
    icon: '',
    status:'',
    startDate:'',
    endDate:'',
  })
  const [updateScho,setUpdateScho] = useState({
    oldData:[],
    newData:{
      title:"",
      description:"",
      status:"",
      startDate:"",
      endDate:"",
      icon: '',
    }
  })

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const response = await FetchingSchoProg.FETCH_SCHOPROG()
        const list = response.data.SchoCat?.map((data) =>{
          const start = dayjs(data.startDate).format('MMMM DD, YYYY');
          const end = dayjs(data.endDate).format('MMMM DD, YYYY');
          return({
            ...data,
            startDate: start,
            endDate: end
          })
        })
        setSchocat(list);
        setLoading(false);
        
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData()
  }, []);
   

  const columns = [
    {
      field: 'icon',
      headerClassName: 'super-app-theme--header',
      headerName: 'Program Logo',
      width: 150, 
      renderCell: (params) => {     
        return (
              <Avatar
                alt="No Image"
                src={params.value}
                sx={{ width: 35, height: 35 }}
              />
        );},},
    {
      field: 'name',
      headerClassName: 'super-app-theme--header',
      headerName: 'Scholarship Name',
      width: 200,
      editable: false,
    },
    {
      field: 'description',
      headerClassName: 'super-app-theme--header',
      headerName: 'Description',
      width: 235,
      editable: false,
    },
    {
      field: 'status',
      headerClassName: 'super-app-theme--header',
      headerName: 'Status',
      width: 120,
      editable: false,
    },
    {
      field: 'startDate',
      headerClassName: 'super-app-theme--header',
      headerName: 'Start Date',
      width: 150,
      editable: false,
    },
    {
      field: 'endDate',
      headerClassName: 'super-app-theme--header',
      headerName: 'End Date',
      width: 150,
      editable: false,
    },
    {
      field: 'insert',
      headerClassName: 'super-app-theme--header',
      headerName: 'Actions',
      width: 170,
      renderCell: (params) => (
        <CustomButton
          label={'Edit Details'}
          icon={<CiEdit />}
          onClick={() =>handleModalOpen('EditOpen',true,params.row)}
          color={'blue'}
          iconPosition={'start'}
        />
      ),
    },
  ];
  const handleFileChange = (event) =>{
    setCreateScho({
      ...createScho,
      icon: event.target.files[0]
    })
  }
  const handleInputChange = (e) =>{
    const { id,name,value } = e.target;
    if(id === 'Create'){
      setCreateScho({
        ...createScho,
        [name]: value
      })
    }else{
      setUpdateScho({
        ...updateScho,
        newData:{
          ...updateScho.newData,
          [name]: value
        }
      })
    }
  }
  const handleRadioChange = (e,id) =>{
    const { name,value } = e.target;
    if(id === 'Create'){
      if(id === 'Create'){
        setCreateScho({
          ...createScho,
          [name]: value
        })
      }else{
        setUpdateScho({
          ...updateScho,
          newData:{
            ...updateScho.newData,
            [name]: value
          }
        })
      }
    }
  }
  const handleModalOpen = (name,value,data) =>{
    if(data){
      const startDate = dayjs(data.startDate)
      const endDate = dayjs(data.endDate)
      setUpdateScho(prev =>
      ({
        ...prev,
        newData: {
          title:data.name,
          description:data.description,
          status:data.status,
          startDate:startDate,
          endDate:endDate,
          icon:data.icon
        }
      }))
      setModals(prev =>({
        ...prev,
        [name]:value
      }))
    }else{
      setModals(prev =>({
        ...prev,
        [name]:value
      }))
    }
  }

return (
  <>
  <CustomModal
    title={'Create Scholarship Program'}
    open={modals.AddOpen}
    onClose={() => setModals({...modals,AddOpen:false})}
    content={<CreateScho
    data={createScho}
    handleFileChange={handleFileChange}
    handleInputChange={handleInputChange}
    handleRadioChange={handleRadioChange}
    setCreateScho={setCreateScho}
    />}
  />
  <CustomModal
    title={'Edit Scholarship Program details'}
    open={modals.EditOpen}
    onClose={() => setModals({...modals,EditOpen:false})}
    content={<UpdateScho
    data={updateScho}
    handleFileChange={handleFileChange}
    handleInputChange={handleInputChange}
    handleRadioChange={handleRadioChange}
    setUpdateScho={setUpdateScho}
    />}
  />
  <div className="w-full">
      <div className="w-full p-4 flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <CustomHeading title={'Scholarship Program'}  />
          <CustomButton
            label={'Add Scholarship'}
            color={'blue'}
            icon={<IoAddSharp />}
            iconPosition={'start'}
            onClick={() =>setModals({...modals,AddOpen:true})}
          />
        </div>
        <div className="w-full">
          <CustomDatagrid
            loading={loading}
            columns={columns}
            row={schocat}
            rowId={'schoProgId'}
          />
        </div>
      </div>
  </div>
</>
)
}
