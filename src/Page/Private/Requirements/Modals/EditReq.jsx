import React from 'react'
import CustomButton from '../../../../components/Buttons/button'
import { CustomDate } from '../../../../components/InputFields/CustomDate'
import { CustomSelect } from '../../../../components/InputFields/CustomSelect'
import CustomFields from '../../../../components/InputFields/CustomFields'
import Addreq from '../Actions/Addreq'
import { MdAdd } from "react-icons/md";

export const EditReq = ({
    schocat,
    data,
    setData,
    setLoading,
    setReqList
}) => {
    console.log(data)
    const handleInputChange = (e) =>{
    const {value,name} = e.target;
    setData(prevState=>({...prevState,[name]: value}))
    }
    const handleDateChange = (value,name) =>{
    setData(prevState=>({...prevState,[name]: value}))
    }
  return (
    <form onSubmit={(event) =>Addreq({event,data,setLoading,setReqList})} className='p-4'>
        <div className='flex flex-col gap-2'>
        <div className="w-full flex gap-2 flex-wrap">
            <div className='flex-1'>
            <CustomDate
            label={'Due Date'}
            type={'date'}
            value={data?.deadline}
            onChange={handleDateChange}
            />
            </div>

        </div>
        </div>
        <div className='flex justify-end items-end gap-4 mt-4'>
            <CustomButton
             icon={<MdAdd />}
             type={'submit'}
             iconPosition={'start'}
             label={'Add Requirement'}
             color={'blue'}
            />
        </div>
    </form>
  )
}
