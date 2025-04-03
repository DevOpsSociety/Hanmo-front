'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { handleLoginLogic } from '../../utils/authHandlers';
import styles from './styles.module.css';
import HanmoHeader from '@/components/HanmoHeader/HanmoHeader';
import { borderClass, buttonClass, labelClass } from '../../utils/classNames';

export default function LoginPage(): JSX.Element {
  const router = useRouter();
  const [studentNumber, setStudentNumber] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    await handleLoginLogic(
      studentNumber,
      phoneNumber,
      router,
      '/main',
      setError
    );
  };

  const handleWithdrawPage = async () => {
    await handleLoginLogic(
      studentNumber,
      phoneNumber,
      router,
      '/withdraw',
      setError
    );
  };

  return (
    <div className={`flex flex-col ${styles.pretendardFont} ${labelClass}`}>
      {/* <div className="text-center border-b border-solid border-#E7E7E7">
        <span className="text-[38px] text-[#04447C]">한</span>
        <span className="text-[38px] text-[#9ECCF3]">모</span>
      </div> */}

      <HanmoHeader />

      <div className='w-[393px] h-[852px] mt-16 px-[56px] flex flex-col gap-4 mx-auto'>
        <div>
          <div className='text-[15px]'>학번</div>
          <input
            type='text'
            value={studentNumber}
            onChange={(e) => setStudentNumber(e.target.value)}
            placeholder='245151551'
            className={borderClass}
          />
        </div>

        <div className='mt-4'>
          <div className=''>전화번호</div>
          <input
            type='text'
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder='01011112222'
            className={borderClass}
          />
        </div>

        <div className={`flex flex-col gap-3 mt-4 ${styles.mansehFont} `}>
          <button
            onClick={handleLogin}
            className={`${buttonClass} bg-[#04447C]`}
          >
            로그인
          </button>
          <button
            onClick={handleWithdrawPage}
            className='border border-solid border-black rounded-[10px] h-[43px] text-[24px]'
          >
            회원탈퇴
          </button>
        </div>
        {error && <div className='text-[red] mt-3'>{error}</div>}
      </div>
    </div>
  );
}
