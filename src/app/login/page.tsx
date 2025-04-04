'use client';

import { useRouter } from 'next/navigation';
import { handleLoginLogic } from '../../utils/authHandlers';
import styles from './styles.module.css';
import HanmoHeader from '@/components/HanmoHeader/HanmoHeader';
import { borderClass, buttonClass, labelClass } from '../../utils/classNames';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

const loginSchema = z.object({
  studentNumber: z.string().min(1, '학번을 입력해주세요.'),
  phoneNumber: z.string().min(1, '전화번호를 입력해주세요.'),
});

type LoginForm = z.infer<typeof loginSchema>;

export default function LoginPage(): JSX.Element {
  const router = useRouter();
  const {
    register,
    getValues,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });
  const handleLogin = async () => {
    const studentNumber = getValues('studentNumber');
    const phoneNumber = getValues('phoneNumber');

    await handleLoginLogic(studentNumber, phoneNumber, router, '/main');
  };

  const handleWithdrawPage = async () => {
    const studentNumber = getValues('studentNumber');
    const phoneNumber = getValues('phoneNumber');

    await handleLoginLogic(studentNumber, phoneNumber, router, '/withdraw');
  };

  return (
    <form className={`flex flex-col ${styles.pretendardFont} ${labelClass}`}>
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
            {...register('studentNumber')}
            placeholder='245151551'
            className={borderClass}
          />
        </div>

        <div className='mt-4'>
          <div className=''>전화번호</div>
          <input
            type='text'
            {...register('phoneNumber')}
            placeholder='01012345678'
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
        {(errors.studentNumber?.message || errors.phoneNumber?.message) && (
          <p className='text-red-500 font-[manSeh] text-[20px] '>
            틀렸어요 ㅠㅡㅠ
          </p>
        )}
      </div>
    </form>
  );
}
