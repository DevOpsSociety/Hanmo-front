'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { loginUser } from '../../api/user';

export default function LoginPage(): JSX.Element {
  const router = useRouter();
  const [studentNumber, setStudentNumber] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    if (!studentNumber || !phoneNumber) {
      toast.error('모든 항목을 입력해주세요.');
      return;
    }

    try {
      toast.loading('로그인 중...');
      const res = await loginUser({ studentNumber, phoneNumber });
      toast.dismiss();

      console.log('response :', res);

      if (res.status === 200) {
        toast.dismiss();
        toast.success('로그인 성공!');
        // 예: localStorage 저장, 전역 상태 저장, 페이지 이동
        localStorage.setItem('token', res.data.token);
        router.push('/');
      } else {
        setError('로그인 실패: 정보를 확인해주세요.');
        toast.error('로그인 실패');
      }
    } catch (err) {
      toast.dismiss();
      toast.error('서버 오류가 발생했습니다.');
      setError('로그인 중 오류 발생');
      console.error(err);
    }
  };

  return (
    <div className='flex flex-col'>
      <div className='text-center border-b border-solid border-#E7E7E7'>
        <span className='text-[38px] text-[#04447C]'>한</span>
        <span className='text-[38px] text-[#9ECCF3]'>모</span>
      </div>

      <div>
        <div className='text-[50px] text-[#04447c] text-center mt-[90px]'>
          로그인
        </div>
        <div className='w-[393px] h-[852px] mt-16 px-[56px] flex flex-col gap-4 mx-auto'>
          <div>
            <div className='text-[15px]'>학번</div>
            <input
              type='text'
              value={studentNumber}
              onChange={(e) => setStudentNumber(e.target.value)}
              placeholder='245151551'
              className='border border-solid border-black rounded-[10px] w-full h-11 px-3'
            />
          </div>

          <div className='mt-4'>
            <div className=''>전화번호</div>
            <input
              type='text'
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder='01011112222'
              className='border border-solid border-black rounded-[10px] w-full h-11 px-3'
            />
          </div>

          <div className='flex flex-col gap-3 mt-4'>
            <button
              onClick={handleLogin}
              className='border border-solid border-black bg-[#04447C] text-white rounded-[10px] h-[43px] text-[24px]'
            >
              로그인
            </button>
            <button className='border border-solid border-black rounded-[10px] h-[43px] text-[24px]'>
              회원탈퇴
            </button>
          </div>

          {error && <div className='text-[red] mt-3'>{error}</div>}
        </div>
      </div>
    </div>
  );
}
