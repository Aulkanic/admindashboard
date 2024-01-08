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

export const CreateScho = ({
    data,
    handleFileChange,
    handleInputChange,
    handleRadioChange,
    handleClose,
    Create,
    loading,
    setCreateScho
}) => {
  return (
    <form className='flex flex-col gap-4 p-4'>
    <div className='flex gap-4 p-4'> 
        <div className='w-full h-full'>
            <div className='w-full h-48 border-1 border-black relative bg-gray-300 rounded-md'>
            {data.icon === '' ? (
                <>
                <p className='absolute text-white font-bold top-20 left-10'>No Image to Preview</p>
               <img src={Noimg} className='object-contain w-full h-full' />
                </>

            ) : (
                <ImagePreview icon={data.icon} />
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
            value={data.title}
            id={'Create'}
            name={'title'}
            onChange={handleInputChange}
            />
            <div className='flex gap-2'>
            <CustomDate
             type={'date'}
             label={"Start Date"}
             value={data.startDate}
             onChange={(value) => setCreateScho({...data,startDate:value})}
             disablePast={true}
            />
            <CustomDate
             type={'date'}
             label={"End Date"}
             value={data.endDate}
             onChange={(value) => setCreateScho({...data,endDate:value})}
             disablePast={true}
            />
            </div>
            <div className='border-2 border-gray-300 rounded-lg p-2'>
            <CustomRadio
            isRow={true}
            label={'Status'}
            id={'Create'}
            name={'status'}
            value={data.status}
            onChange={(e) =>handleRadioChange(e,'Create')}
            options={[{label:"Open",value:"Open"},{label:"Under Evaluation",value:"Under Evaluation"},{label:"Paused",value:"Paused"}]}
            />
            </div>
        </div>
    </div> 
    <div className='p-4'>
        <h3>Description:</h3>
        <CustomTextArea
            content={data.description}
            handleChange={(value) =>setCreateScho({...data,description:value})}
        />
    </div>
    <div className='flex justify-end items-end p-4'>
        <CustomButton
          type={'submit'}
          label={'Create'}
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
