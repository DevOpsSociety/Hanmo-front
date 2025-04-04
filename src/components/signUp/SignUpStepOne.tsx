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
import { delay } from '../../utils/delay';
import ErrorMessage from '../errorMessage';

export default function SignUpStepOne(): JSX.Element {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [verificationVisible, setVerificationVisible] = useState(false);

  const {
    register,
    // getValues,
    handleSubmit,
    // watch,
    formState: { errors },
  } = useForm<StepOneForm>({
    resolver: zodResolver(stepOneSchema),
  });

  console.log('폼 에러:', errors); // errors 객체 출력
  console.log('name 에러 메시지:', errors.name?.message); // name 필드 에러 메시지 확인
  console.log('phoneNumber 에러 메시지:', errors.phoneNumber?.message); // phoneNumber 필드 에러 메시지 확인

  const onSendCode = async (data: StepOneForm) => {
    const { name, phoneNumber } = data;

    console.log('name : ', name);
    console.log('phoneNumber : ', phoneNumber);

    try {
      toast.loading('인증번호 전송 중...');
      await sendCode(phoneNumber);
      toast.dismiss();
      toast.success('인증번호가 전송되었습니다.');
      setVerificationVisible(true);
    } catch (err) {
      toast.dismiss();
      handleToastError(err);
    }
  };

  const onVerifyCode = async (data: StepOneForm) => {
    const { name, phoneNumber, authNumber } = data;

    if (!authNumber) {
      toast.error('인증번호를 입력해주세요.');
      return;
    }

    try {
      toast.loading('인증번호 확인 중...');

      await delay(1000); // 1초 대기

      const res = await verifyCode(authNumber);

      if (res.status === 200) {
        toast.dismiss();
        toast.success('인증 성공!');
        dispatch(updateFormData({ name, phoneNumber }));
        router.push('/signup/2');
      } else {
        toast.dismiss();
        toast.error('인증 실패');
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
        className='w-[393px] px-[56px] flex flex-col gap-4 mx-auto'
        onSubmit={handleSubmit(verificationVisible ? onVerifyCode : onSendCode)}
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
          {/* <div className='text-sm text-gray-500'>현재 입력값: {nameValue}</div> */}
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
            // onClick={onSendCode}
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
              <button
                type='submit'
                // onClick={onVerifyCode}
                className={buttonClass}
              >
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
