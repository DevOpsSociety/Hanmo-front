'use client';

import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import LogoImg from '../../../public/signUpLogo.png';
import { useAppDispatch } from '../../store/hooks';
import { updateFormData } from '../../store/signUpSlice';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { sendCode, verifyCode } from '../../api/sms';
import { useRouter } from 'next/navigation';
import { StepOneForm, stepOneSchema } from '../../schemas/stepOneSchema';
import { handleToastError, handleAxiosError } from '../../utils/errorHandlers';
import { labelClass, buttonClass, borderClass } from '../../utils/classNames';
import ErrorMessage from '../errorMessage';

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

  const handleSendCodeSubmit = handleSubmit(async (data) => {
    const phoneNumber = data.phoneNumber;

    console.log('[인증하기 버튼 클릭됨]');
    console.log('입력된 전화번호:', phoneNumber);

    if (!phoneNumber) {
      toast.error('휴대전화 번호를 입력해주세요.');
      return;
    }

    try {
      toast.loading('인증번호 전송 중...');
      await sendCode(phoneNumber);
      toast.dismiss();
      toast.success('인증번호가 전송되었습니다.');
      setVerificationVisible(true);
    } catch (error) {
      toast.dismiss();
      handleToastError(error);
    }
  });

  const handleVerifySubmit = async (data: StepOneForm) => {
    const { name, phoneNumber, authNumber } = data;

    console.log('[인증확인 버튼 클릭됨]');
    console.log('입력된 이름:', name);
    console.log('입력된 전화번호:', phoneNumber);
    console.log('입력된 인증번호:', authNumber);

    if (!authNumber) {
      toast.error('인증번호를 입력해주세요.');
      return;
    }

    try {
      toast.loading('인증번호 확인 중...');
      const res = await verifyCode(authNumber);

      console.log('[인증번호 확인 응답]', res);

      if (res.status === 200) {
        toast.dismiss();
        toast.success('인증 성공!');
        dispatch(updateFormData({ name, phoneNumber }));
        router.push('/signup/2');
      } else {
        toast.dismiss();
      }
    } catch (err) {
      toast.dismiss();
      handleAxiosError(err, {
        400: '인증번호가 일치하지 않습니다.',
      });
    }
  };

  return (
    <div className='flex flex-col justify-center h-[calc(100vh-73px)] font-[Pretendard]'>
      <Image
        src={LogoImg}
        alt='로고'
        className='mx-auto w-[113px] h-[134px]'
        priority
      />

      <form
        onSubmit={
          verificationVisible
            ? handleSubmit(handleVerifySubmit)
            : handleSendCodeSubmit
        }
        className='w-[393px] px-[56px] flex flex-col gap-4 mx-auto'
      >
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

        <div className={labelClass}>
          <label>휴대전화</label>
          <input
            type='text'
            {...register('phoneNumber')}
            placeholder='번호를 입력해주세요'
            className={borderClass}
          />
          <ErrorMessage message={errors.phoneNumber?.message} />
        </div>

        <div className='flex flex-col gap-2 mt-4'>
          <button
            type='submit'
            className={`${buttonClass} ${verificationVisible && 'bg-gray-400'}`}
            disabled={verificationVisible}
          >
            인증하기
          </button>

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
