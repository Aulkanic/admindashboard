import { Box } from '@mui/material'
import React from 'react'
import Slide from '@mui/material/Slide';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import { IoReturnUpBackSharp } from "react-icons/io5";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

export const CustomDialog = ({open,handleClose,content,title}) => {
  console.log(handleClose)
  return (
  <Dialog
    fullScreen
    open={open}
    onClose={handleClose}
    TransitionComponent={Transition}
    >
    <AppBar sx={{ position: 'relative' }}>
        <Toolbar>
        <IconButton
            edge="start"
            color="inherit"
            onClick={handleClose}
            aria-label="close"
        >
          <IoReturnUpBackSharp />
        </IconButton>
        <h1>
            {title}
        </h1>
        </Toolbar>
    </AppBar>
    <Box>
        {content}
    </Box>
</Dialog> 
  )
}
