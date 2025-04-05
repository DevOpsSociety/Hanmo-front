import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import toast from 'react-hot-toast';
import { loginUser } from '../api/user';
import axios from 'axios';

export async function handleLoginLogic(
  studentNumber: string,
  phoneNumber: string,
  router: AppRouterInstance,
  onSuccessRedirect: string
) {
  if (!studentNumber || !phoneNumber) {
    toast.error('모든 항목을 입력해주세요.');
    return;
  }

  try {
    toast.loading('로그인 중...');
    const res = await loginUser({ studentNumber, phoneNumber });
    toast.dismiss();

    console.log('로그인 응답:', res); // 응답 확인

    if (res.status === 200) {
      toast.success('로그인 성공!');
      localStorage.setItem('token', res.headers.temptoken);
      router.push(onSuccessRedirect); // ✅ 전달받은 router 사용
    } else {
      toast.error('로그인 실패');
      return res;
      // onError?.('로그인 실패: 정보를 확인해주세요.');
    }
  } catch (err) {
    toast.dismiss();
    toast.error('서버 오류가 발생했습니다.');
    // onError?.('로그인 중 오류 발생');

    if (axios.isAxiosError(err)) {
      if (err.response?.status === 404) {
        // onError?.('존재하지 않는 사용자입니다.');
      }
    }
  }
}
