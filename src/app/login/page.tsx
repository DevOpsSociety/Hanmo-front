'use client';

import { useRouter } from 'next/navigation';
import { handleLoginLogic } from '../../utils/authHandlers';
import { borderClass, buttonClass, labelClass } from '../../utils/classNames';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { findUser } from '../../api/user';
import { LoginForm, loginSchema } from '../../schemas/loginSchema';

export default function LoginPage(): JSX.Element {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  useEffect(() => {
    const checkToken = async () => {
      const tempToken = localStorage.getItem('token'); // 로컬스토리지에서 토큰 가져오기
      if (tempToken) {
        try {
          const res = await findUser(tempToken); // findUser API 호출로 토큰 검증
          // console.log('토큰 검증 응답:', res); // 응답 확인
          if (res.status === 200) {
            router.push('/main'); // 토큰이 유효하면 main으로 리다이렉트
          }
        } catch (error) {
          console.error('유효하지 않은 토큰:', error);
          // 토큰이 유효하지 않으면 아무 작업도 하지 않음
        }
      }
    };

    checkToken();
  }, [router]);

  const handleLogin = async (data: LoginForm) => {
    await handleLoginLogic(data, router, '/main');
  };

  return (
    <form
      onSubmit={handleSubmit(handleLogin)}
      className={`flex flex-col justify-center h-[calc(100vh-73px)]
        font-[pretendard] ${labelClass}`}
    >
      <div className='w-[393px] px-[56px] flex flex-col gap-4 mx-auto'>
        <div className={labelClass}>
          <label>학번</label>
          <input
            type='text'
            {...register('studentNumber')}
            placeholder='245151551'
            className={borderClass}
          />
        </div>

        <div className={labelClass}>
          <label>전화번호</label>
          <input
            type='text'
            {...register('phoneNumber')}
            placeholder='01012345678'
            className={borderClass}
          />
        </div>

        <div className={`flex flex-col gap-3 mt-4 font-[manSeh]`}>
          <button type='submit' className={`${buttonClass} bg-[#04447C]`}>
            로그인
          </button>
          <button
            type='button'
            onClick={() => router.push('/withdraw')}
            className='border border-solid border-[#04447C] border-opacity-60 rounded-[10px] h-[43px] text-[24px]'
          >
            회원탈퇴
          </button>
        </div>
        {(errors.studentNumber?.message || errors.phoneNumber?.message) && (
          <p className='text-red-500 font-[manSeh] text-[20px] '>
            틀렸어요 ㅠㅡㅠ
          </p>
        )}
      </div>
    </form>
  );
}
