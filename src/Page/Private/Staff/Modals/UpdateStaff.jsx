import React from 'react'
import CustomFields from '../../../../components/InputFields/CustomFields'
import { CustomSelect } from '../../../../components/InputFields/CustomSelect'
import { CustomRadio } from '../../../../components/InputFields/CustomRadio'
import CustomButton from '../../../../components/Buttons/button'
import { RxUpdate } from "react-icons/rx";

export const UpdateStaff = ({data,handleInput,handleSelect,onSubmit,options}) => {
    const menu  = options?.List.filter(data => data.role !== 'Administrator')
    .map((option) => {
    return({
    value: option.role,
    label: `${option.role}(${option.total})`,
    name:'jobDes'
    })})
  return (
    <form onSubmit={onSubmit} class="p-4 flex flex-col gap-4 md:p-5">
    <div className='flex flex-col gap-2'>
      <CustomFields
        label={'Staff Name'}
        placeholder={'Enter Staff Name...'}
        onChange={handleInput}
        name={"username"}      
        readOnly={true}
        defaultValue={data.oldData.name}
      />
      <CustomFields
        label={'Staff Email'}
        readOnly={true}
        placeholder={'Enter Staff Email...'}
        onChange={handleInput}
        name={"username"}  
        defaultValue={data.oldData.email}
      />
      <CustomRadio
        name={'status'}
        label={'Status'}
        options={[{label:"Active",value:"Active"},{label:"In Active",value:"Inactive"}]}
        onChange={handleInput}
        value={data.newData.status || data.oldData.status}
        isRow={true}
      />
      <CustomSelect
        label={'Select Role'}
        options={menu}
        placeholder={'Select Staff Role...'}
        value={data.newData.jobDes || data.oldData.jobDes}
        onChange={handleSelect}       
      />
    </div>
    <div className='flex justify-end items-end '>
      <CustomButton
        type={'submit'}
        label={'Update Staff'}
        color={'blue'}
        icon={<RxUpdate />}
        iconPosition={'start'}
      />
    </div>
    </form>
  )
}
