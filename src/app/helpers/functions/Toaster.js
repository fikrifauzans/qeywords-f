import { toast } from 'react-toastify';

export const TOASTER_SUCCESS = 'success';
export const TOASTER_ERROR = 'error';
export const TOASTER_WARNING = 'warn';
export const TOASTER_INFO = 'info';

// type = info, success, warn, error
// position = top-left, top-right, top-center, bottom-left, bottom-right, bottom-center
const toaster = (message = '', type = null, duration = 3000, position = 'top-right') => {
  // default
  if (!type && message === '') {
    toast('🦄 Wow so easy!', {
      position: 'top-right',
      autoClose: duration,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: 0,
      theme: 'colored'
    });
  }

  if (type && message !== '') {
    // Toast Info
    if (type === TOASTER_INFO) {
      toast.info(message, {
        position: position,
        autoClose: duration,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: 0,
        theme: 'colored'
      });
    }

    // Toast Success
    if (type === TOASTER_SUCCESS) {
      toast.success(message, {
        position: position,
        autoClose: duration,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: 0,
        theme: 'colored'
      });
    }

    // Toast Warning
    if (type === TOASTER_WARNING) {
      toast.warn(message, {
        position: position,
        autoClose: duration,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: 0,
        theme: 'colored'
      });
    }

    // Toast Error
    if (type === TOASTER_ERROR) {
      toast.error(message, {
        position: position,
        autoClose: duration,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: 0,
        theme: 'colored'
      });
    }
  }
};
export default toaster;
