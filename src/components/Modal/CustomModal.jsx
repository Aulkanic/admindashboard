import React from 'react'
import { Modal,Box } from '@mui/material'

const style = {
    position: 'relative',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '50%',
    height: 'maxContent',
    bgcolor: 'background.paper',
    borderRadius:'8px 8px 0px 0px',
    
  };

export const CustomModal = ({open,title,content,onClose}) => {
  return (
    <Modal
    open={open}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description">
    <Box sx={style}>
        <div className="relative rounded-t-lg shadow bg-blueish dark:bg-gray-700">
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                    <h3 className="text-lg font-semibold text-gray-900 text-white">
                        {title}
                    </h3>
                    <button onClick={onClose} type="button" className="text-white bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="crud-modal">
                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                        </svg>
                        <span className="sr-only">Close modal</span>
                    </button>
            </div>
        </div>
        <div>
          {content}           
        </div>

    </Box>
    </Modal>
  )
}
