import toast from 'react-hot-toast';
import axios from 'axios';

export function handleToastError(error: unknown) {
  if (error instanceof Error) {
    toast.error(error.message);
  } else {
    toast.error('알 수 없는 오류가 발생했습니다.');
  }
}

export function handleAxiosError(
  error: unknown,
  customMessages: Record<number, string> = {}
) {
  if (axios.isAxiosError(error)) {
    const status = error.response?.status;
    if (status && customMessages[status]) {
      toast.error(customMessages[status]);
    } else {
      toast.error('서버 오류가 발생했습니다.');
    }
  } else {
    handleToastError(error);
  }
}
