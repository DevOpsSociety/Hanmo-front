'use client';

import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import LogoImg from '../../../public/signUpLogo.png';
import { useAppDispatch } from '../../store/hooks';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { StepOneForm, stepOneSchema } from '../../schemas/stepOneSchema';
import { labelClass, buttonClass, borderClass } from '../../utils/classNames';
import {
  handleSendCodeLogic,
  handleVerifyCodeLogic,
} from '../../utils/authHandlers';
import ErrorMessage from '../ErrorMessage1';
import Link from 'next/link';

export default function SignUpStepOne(): JSX.Element {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [verificationVisible, setVerificationVisible] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<StepOneForm>({
    resolver: zodResolver(stepOneSchema),
  });

  const sendCode = async (data: StepOneForm) => {
    await handleSendCodeLogic(data, setVerificationVisible);
  };

  const verifyCode = async (data: StepOneForm) => {
    await handleVerifyCodeLogic(data, dispatch, router);
  };

  return (
    <div className='flex flex-col justify-center h-[calc(100vh-73px)] font-[Pretendard]'>
      <Link href='/landing'>
        <Image
          src={LogoImg}
          alt='로고'
          className='mx-auto w-[113px] h-[134px]'
          priority
        />
      </Link>

      <form
        className='w-[393px] px-[56px] flex flex-col gap-4 mx-auto'
        onSubmit={handleSubmit(verificationVisible ? verifyCode : sendCode)}
      >
        {/* 이름 */}
        <div className={`${labelClass} mt-12`}>
          <label>이름 입력</label>
          <input
            type='text'
            {...register('name')}
            placeholder='이름을 입력해주세요'
            className={borderClass}
          />

          <ErrorMessage message={errors.name?.message} />
        </div>

        {/* 전화번호 */}
        <div className={labelClass}>
          <label>전화번호</label>
          <input
            type='text'
            {...register('phoneNumber')}
            placeholder='번호를 입력해주세요'
            className={borderClass}
          />
          <ErrorMessage message={errors.phoneNumber?.message} />
        </div>

        {/* 인증 버튼 */}
        <div className='flex flex-col gap-2 mt-4'>
          <button
            type='submit'
            className={`${buttonClass} ${verificationVisible && 'bg-gray-400'}`}
            disabled={verificationVisible}
          >
            인증하기
          </button>

          {/* 인증번호 입력 및 확인 */}
          {verificationVisible && (
            <div className='flex flex-col gap-6 mt-5'>
              <input
                type='text'
                {...register('authNumber')}
                placeholder='인증번호를 입력해주세요'
                className={borderClass}
              />
              <button type='submit' className={buttonClass}>
                인증확인
              </button>
              <ErrorMessage message={errors.authNumber?.message} />
            </div>
          )}
        </div>
      </form>
    </div>
  );
}
