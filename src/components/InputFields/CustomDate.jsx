import React from 'react'
import { DemoContainer,DemoItem  } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { YearCalendar } from '@mui/x-date-pickers/YearCalendar';
import { MonthCalendar } from '@mui/x-date-pickers/MonthCalendar';

export const CustomDate = ({type,label,value,onChange,disablePast,openTo}) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
    <DemoContainer components={['TimePicker', 'DatePicker']}>
        {type === 'date' && (<DatePicker
        slotProps={{
            textField: {
                size: "small",
                error: false,
            },
            }}
        label={label}
        value={value}
        openTo={openTo}
        sx={{width:'100%'}}
        onChange={onChange}
        format="YYYY-MM-DD"
        disablePast={disablePast}
        />)} 
        {type === 'time' &&(<TimePicker
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
        {type === 'year' && (
        <DatePicker
        slotProps={{
            textField: {
                size: "small",
                error: false
            },
        }}
        sx={{width:'100%'}}
        label={label} 
        openTo="year"
        />)}

    </DemoContainer>
</LocalizationProvider>
  )
}
