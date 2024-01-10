import React from 'react'
import Popover from '@mui/material/Popover';
import Badge from '@mui/material/Badge';
import { IoNotificationsCircleSharp } from "react-icons/io5";

export const Notifications = ({length,onClickIcon,content,onClose,isOpen,anchorEl}) => {
const open = Boolean(isOpen);
const id = open ? 'simple-popover' : undefined;
  return (
    <div>
        <Badge 
        badgeContent={length} 
        color="error"
        onClick={onClickIcon}
        className='text-4xl text-white cursor-pointer'
        >
          <IoNotificationsCircleSharp />
        </Badge>
        <Popover
          id={id}
          open={open}
          anchorReference="anchorPosition"
          anchorEl={anchorEl}
          onClose={onClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
    
          anchorPosition={{ top:70, left: 1400 }}
        >
         {content()}
        </Popover>
    </div>
  )
}
