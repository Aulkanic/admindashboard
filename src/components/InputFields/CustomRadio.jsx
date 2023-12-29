import React from 'react'
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

export const CustomRadio = ({label,options,value,onChange,isRow,name,id}) => {

  return (
    <FormControl>
      <label htmlFor={id} className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>{label}</label>
      <RadioGroup
        aria-labelledby="demo-controlled-radio-buttons-group"
        name={name}
        id={id}
        value={value}
        row={isRow}
        onChange={onChange}
       
      >
        {options.map((data,index) =>{
          return <FormControlLabel 
          key={index} 
          id={data.id}
          value={data.value} 
          control={<Radio size="small" />}
          label={data.label}
          sx={{fontSize:'12px'}} 
           />  
        })}
      </RadioGroup>
    </FormControl>
  )
}
