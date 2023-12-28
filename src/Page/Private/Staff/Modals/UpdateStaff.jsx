import React from 'react'
import CustomFields from '../../../../components/InputFields/CustomFields'
import { CustomSelect } from '../../../../components/InputFields/CustomSelect'
import { CustomRadio } from '../../../../components/InputFields/CustomRadio'

export const UpdateStaff = ({data,handleInput,handleSelect,onSubmit,options}) => {
    const menu  = options?.List.filter(data => data.role !== 'Administrator')
    .map((option) => {
    return({
    value: option.role,
    label: `${option.role}(${option.total})`,
    name:'jobDes'
    })})
    console.log(options)
    console.log(data)
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
    <button type="submit" className="w-max text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
        <svg class="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"></path></svg>
        Update Staff Details
    </button>
    </form>
  )
}
