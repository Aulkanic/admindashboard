import React from 'react'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

export const CustomDate = ({type,label,value,onChange,disablePast}) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
    <DemoContainer components={['TimePicker', 'DatePicker']}>
        {type === 'date' ? (<DatePicker
        slotProps={{
            textField: {
                size: "small",
                error: false,
            },
            }}
        label={label}
        value={value}
        onChange={onChange}
        format="YYYY-MM-DD"
        disablePast={disablePast}
        />) :
        (<TimePicker
        slotProps={{
        textField: {
            size: "small",
            error: false,
        },
        }}
        label={label}
        value={value}
        onChange={onChange}
        />)}

    </DemoContainer>
</LocalizationProvider>
  )
}
