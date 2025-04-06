'use client';

import { useRouter } from 'next/navigation';
import { handleLoginLogic } from '../../utils/authHandlers';
import styles from './styles.module.css';
import { borderClass, buttonClass, labelClass } from '../../utils/classNames';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

const loginSchema = z.object({
  studentNumber: z.string().min(9, '학번을 입력해주세요.'),
  phoneNumber: z.string().min(10, '전화번호를 입력해주세요.'),
});

type LoginForm = z.infer<typeof loginSchema>;

export default function LoginPage(): JSX.Element {
  const router = useRouter();
  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });
  const handleLogin = async () => {
    console.log('로그인 버튼 클릭됨');
    const studentNumber = getValues('studentNumber');
    const phoneNumber = getValues('phoneNumber');

    await handleLoginLogic(studentNumber, phoneNumber, router, '/main');
  };

  // const handleWithdrawPage = async () => {
  //   const studentNumber = getValues('studentNumber');
  //   const phoneNumber = getValues('phoneNumber');

  //   await handleLoginLogic(studentNumber, phoneNumber, router, '/withdraw');
  // };

  return (
    <form
      onSubmit={handleSubmit(handleLogin)}
      className={`flex flex-col justify-center h-[calc(100vh-73px)] ${styles.pretendardFont} ${labelClass}`}
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
