import toast from 'react-hot-toast';
import axios from 'axios';

export function handleToastError(error: unknown) {
  if (axios.isAxiosError(error)) {
    const errorMessage = error.response?.data.errorMessage;
    toast.error(errorMessage || '알 수 없는 오류가 발생했습니다.');
  } else if (error instanceof Error) {
    toast.error(error.message);
  } else {
    toast.error('알 수 없는 오류가 발생했습니다.');
  }
}
