import React from 'react'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    border: '1px solid #000',
    boxShadow: 24,
    p: 2,
    borderRadius:'10px',
    minWidth:'200px'
  };


export const CustomModal = ({
    open,
    handleClose,
    title,
    content,
}) => {
  return (
    <Modal
    keepMounted
    open={open}
    onClose={handleClose}
    aria-labelledby="keep-mounted-modal-title"
    aria-describedby="keep-mounted-modal-description"
  >
    <Box sx={style}>
      <Typography id="keep-mounted-modal-title" variant="h6" component="h2">
        {title}
      </Typography>
      <div>
        {content}
      </div>
    </Box>
  </Modal>
  )
}
