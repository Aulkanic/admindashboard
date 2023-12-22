// toastUtils.js

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const showToast = (message, type = 'default', options = {}) => {
  const defaultOptions = {
    autoClose: 3000, // Default auto-close duration
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  };

  const mergedOptions = { ...defaultOptions, ...options };

  switch (type) {
    case 'success':
      toast.success(message, mergedOptions);
      break;
    case 'error':
      toast.error(message, mergedOptions);
      break;
    case 'info':
      toast.info(message, mergedOptions);
      break;
    default:
      toast(message, mergedOptions);
  }
};
