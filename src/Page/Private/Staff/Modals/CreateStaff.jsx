import React from 'react'
import CustomFields from '../../../../components/InputFields/CustomFields'
import { CustomSelect } from '../../../../components/InputFields/CustomSelect'
import CustomButton from '../../../../components/Buttons/button'
import { MdAdd } from "react-icons/md";

export const CreateStaff = ({data,handleInput,handleSelect,onSubmit,options}) => {
  const menu  = options?.List.filter(data => data.role !== 'Administrator')
    .map((option) => {
    return({
    value: option.role,
    label: `${option.role}(${option.total})`,
    name:'jobDes',
    id:'Create'
    })})

  return (
    <form onSubmit={onSubmit} class="p-4 flex flex-col gap-4 md:p-5">
    <div className='flex flex-col gap-2'>
      <CustomFields
        label={'Staff Name'}
        value={data.username}
        id={'Create'}
        placeholder={'Enter Staff Name...'}
        onChange={handleInput}
        name={"username"}      
      />
      <CustomFields
        label={'Staff Email'}
        value={data.email}
        id={'Create'}
        placeholder={'Enter Staff Email...'}
        onChange={handleInput}
        name={"email"}      
      />
      <CustomSelect
        label={'Select Role'}
        options={menu}
        id={'Create'}
        placeholder={'Select Staff Role...'}
        value={data.jobDes}
        onChange={handleSelect}       
      />
    </div>
    <div className='flex justify-end items-end '>
      <CustomButton
        type={'submit'}
        label={'Add Staff'}
        color={'blue'}
        icon={<MdAdd />}
        iconPosition={'start'}
      />
    </div>
    </form>
  )
}
