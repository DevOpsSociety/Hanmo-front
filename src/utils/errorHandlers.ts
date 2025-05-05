import axios from 'axios';
import toast from 'react-hot-toast';

export function handleToastError(error: unknown) {
  console.log('catch Error:', error); // 에러 로그 추가
  if (axios.isAxiosError(error)) {
    const errorMessage = error.response?.data.errorMessage;
    toast.error(errorMessage || '알 수 없는 오류가 발생했습니다.');
  } else if (error instanceof Error) {
    toast.error(error.message);
  } else {
    toast.error('알 수 없는 오류가 발생했습니다.');
  }
}
