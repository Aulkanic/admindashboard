import React from 'react'
import Noimg from '../../../../Images/noImg.png'
import CustomButton from '../../../../components/Buttons/button';
import CustomFields from '../../../../components/InputFields/CustomFields';
import { CustomFile } from '../../../../components/InputFields/CustomFile';
import { CustomDate } from '../../../../components/InputFields/CustomDate';
import { CustomRadio } from '../../../../components/InputFields/CustomRadio';
import { CustomTextArea } from '../../../../components/InputFields/CustomTextArea';
import ImagePreview from '../../../../Helpers/imagePreview';
import { IoAddSharp } from "react-icons/io5";
import { TiCancel } from "react-icons/ti";

export const UpdateScho = ({
  data,
  handleFileChange,
  handleInputChange,
  handleRadioChange,
  Create,
  loading,
  setUpdateScho
}) => {

  return (
    <form className='flex flex-col gap-4 p-4'>
    <div className='flex gap-4 p-4'> 
        <div className='w-full h-full'>
            <div className='w-full h-48 border-1 border-black relative rounded-md'>
            {!(data.newData.icon instanceof File) ? (
               <img src={data.newData.icon} className='object-contain w-full h-full' />
            ) : (
                <ImagePreview icon={data.newData.icon} />
            )}
            </div>
            <div className='mt-4'>
            <label className='block mb-2 text-sm font-medium text-gray-900' htmlFor="icon">Scholarship Logo</label>
            <CustomFile 
                onChange={handleFileChange}
                name={'icon'}
                label={''}
            />
            </div>
        </div>
        <div className='w-full flex flex-col flex-wrap gap-4 pl-2'>
            <CustomFields
            label={'Scholarship Name'}
            value={data.newData.title}
            defaultValue={data.oldData.name}
            id={'Update'}
            name={'title'}
            onChange={handleInputChange}
            />
            <div className='flex gap-2'>
            <CustomDate
             type={'date'}
             label={"Start Date"}
             value={data.newData.startDate}
             onChange={(value) => setUpdateScho(prev =>({...prev,newData:{...prev.newData,startDate:value}}))}
             disablePast={true}
            />
            <CustomDate
             type={'date'}
             label={"End Date"}
             value={data.newData.endDate}
             onChange={(value) => setUpdateScho(prev =>({...prev,newData:{...prev.newData,endDate:value}}))}
             disablePast={true}
            />
            </div>
            <div className='border-2 border-gray-300 rounded-lg p-2'>
            <CustomRadio
            isRow={true}
            label={'Status'}
            id={'Update'}
            name={'status'}
            value={data.newData.status || data.oldData.status}
            onChange={(e) =>handleRadioChange(e,'Update')}
            options={[{label:"Open",value:"Open"},{label:"Under Evaluation",value:"Under Evaluation"},{label:"Paused",value:"Paused"}]}
            />
            </div>
        </div>
    </div> 
    <div className='p-4'>
        <h3>Description:</h3>
        <CustomTextArea
            content={data.newData.description}
            onChange={(value) => setUpdateScho(prev =>({...prev,newData:{...prev.newData,description:value}}))}
        />
    </div>
    <div className='flex justify-end items-end gap-4 p-4'>
        <CustomButton
          type={'submit'}
          label={'Save'}
          onClick={Create}
          loading={loading}
          icon={<IoAddSharp />}
          iconPosition={'start'}
          color={'blue'}
        />
    </div>          
    </form>
  )
}
