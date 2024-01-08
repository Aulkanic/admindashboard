import { ListofReq, FetchingSchoProg } from '../../../api/request';
import { useState } from 'react';
import { useEffect } from 'react';
import CustomButton from '../../../components/Buttons/button';
import { CustomDatagrid } from '../../../components/DataGrid/CustomDatagrid';
import { CustomHeading } from '../../../components/H1/h1';
import { RiAddFill } from "react-icons/ri";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { CreateReq } from "./Modals/CreateReq";
import { CustomModal } from '../../../components/Modal/CustomModal';
import { EditReq } from './Modals/EditReq';
import dayjs from "dayjs";

export const Requirements = () => {
  const [reqlist, setReqlist] = useState([]);
  const [submitted, setSublist] = useState([]);
  const [loading,setLoading] = useState(false)
  const [open, setOpen] = useState({
    create : false,
    update : false,
  });
  const [createRequirement,setCreateRequirement] = useState({
    requirementName:'',
    requirementFor:'',
    scholarshipCategory:'',
    deadline:'',
    batch:''
  })
  const [updateRequirement,setUpdateRequirement] = useState({
    deadline:'',
  })
  const [schocat, setSchocat] = useState([]);

  useEffect(() => {
    async function Fetch(){
      setLoading(true);
      const req = await ListofReq.FETCH_REQUIREMENTS()
      const scho = await FetchingSchoProg.FETCH_SCHOPROG()
      setReqlist(req.data.Requirements.results);
      setSublist(req.data.Requirements.results1);
      setSchocat(scho.data.SchoCat);
      setLoading(false);
    }
    Fetch();
  }, []);

  const mergedData = reqlist?.map((requirement) => {
    const { requirementID, requirementName, schoName, Status,batch,deadline,docsfor } = requirement;
    const submissions = submitted.filter((submission) => submission.requirement_Name === requirementName);
    return {
      requirementID,
      requirementName,
      schoName,
      batch,
      Status,
      deadline,
      docsfor,
      numSubmissions: submissions.length,
    };
  });
  const columns = [
     {
      field: 'schoName', 
      headerName: 'Scholraship',
      headerClassName: 'super-app-theme--header',
      width: 150
     },
     {
      field: 'requirementName', 
      headerName: 'Requirements',
      headerClassName: 'super-app-theme--header',
      width: 250
      },
    {
      field: 'batch',
      headerName: 'Batch',
      headerClassName: 'super-app-theme--header',
      width: 100,
      editable: false,
    },
    {
      field: 'docsfor',
      headerName: 'Requirements For',
      headerClassName: 'super-app-theme--header',
      width: 150,
      editable: false,
    },
    {
      field: 'deadline',
      headerName: 'Deadline',
      headerClassName: 'super-app-theme--header',
      width: 150,
      editable: false,
    },
    {
      field: 'numSubmissions',
      headerName: 'Total Submitted',
      headerClassName: 'super-app-theme--header',
      width: 125,
      editable: false,
    },
    {
    field: 'insert',
    headerName: 'Actions',
    headerClassName: 'super-app-theme--header',
    width: 260,
    renderCell: (params) => {
      return(
        <div className='flex gap-2'>
          <CustomButton
            icon={<CiEdit />}
            iconPosition={'start'}
            color={'blue'}
            onClick={() =>handleModalOpen('update',true,params.row)}
            label={'Edit'}
          />
          <CustomButton
            icon={<MdDelete />}
            iconPosition={'start'}
            color={'red'}
            // onClick={() => Delete(params.row)}
            label={'Delete'}
          />
      </div>
    )},
    },

  ];
  const handleModalOpen = (name,value,data) =>{
    if(data){
      let deadline = new Date(data.deadline)
      deadline = dayjs(deadline)
      setUpdateRequirement((prev) =>({
        ...prev,
        deadline:deadline,
      }))
    }
    setOpen({
      ...open,
      [name]:value
    })
  }
  return (
  <>
  <CustomModal
    title={'Add New Requirement'}
    open={open.create}
    onClose={() =>handleModalOpen('create',false)}
    content={<CreateReq
    schocat={schocat}
    data={createRequirement}
    setData={setCreateRequirement}
    setReqList={setReqlist}
    />}
  />
  <CustomModal
    title={'Edit Requirement Details'}
    open={open.update}
    onClose={() =>handleModalOpen('update',false)}
    content={<EditReq
    schocat={schocat}
    data={updateRequirement}
    setData={setUpdateRequirement}
    setReqList={setReqlist}   
    />}
  />
  <div className='w-full p-4'>
    <div className="w-full">
      <div className='w-full pr-4 mb-4 flex justify-between items-center'>
        <CustomHeading title={'Requirements'} />
        <CustomButton
          icon={<RiAddFill />}
          iconPosition={'start'}
          label={'Add new...'}
          onClick={() =>handleModalOpen('create',true)}
          color={'blue'}
        />
      </div>
      <div className='w-full'>
        <CustomDatagrid
          loading={loading}
          row={mergedData}
          columns={columns}
          rowId={'requirementID'}
        />
      </div>
    </div>
  </div>
  </>
  )
}
