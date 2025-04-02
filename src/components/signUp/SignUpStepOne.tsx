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

export default function SignUpStepOne(): JSX.Element {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [verificationVisible, setVerificationVisible] = useState(false);
  const [error] = useState('');

  const {
    register,
    handleSubmit,
    // getValues,
    formState: { errors },
  } = useForm<StepOneForm>({
    resolver: zodResolver(stepOneSchema),
  });
  // 인증하기 버튼 클릭 시
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

  // 인증완료 후 다음 페이지 이동
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
    <div className='flex flex-col h-screen font-[Pretendard]'>
      <div className='text-center border-b border-solid border-[#E7E7E7] h-[73px] flex items-center justify-center'>
        <span className='text-[38px] font-[manSeh]'>회원가입</span>
      </div>

      <div className='flex flex-col h-full justify-center'>
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
              : handleSendCodeSubmit // ✅ now validation runs
          }
          className='w-[393px] px-[56px] flex flex-col gap-4 mx-auto'
        >
          {/* 이름 입력 */}
          <div className='mt-12'>
            <div className='text-[15px] text-black text-opacity-70'>
              이름 입력
            </div>
            <input
              type='text'
              {...register('name')}
              placeholder='이름을 입력해주세요'
              className='border-[1.5px] border-solid border-[rgba(0,0,0,0.5)] rounded-[10px] w-full h-11 px-3'
            />
            {errors.name && (
              <p className='text-red-500 text-xs mt-1'>{errors.name.message}</p>
            )}
          </div>

          {/* 전화번호 입력 */}
          <div>
            <div className='text-[15px] text-black text-opacity-70'>
              휴대전화
            </div>
            <input
              type='text'
              {...register('phoneNumber')}
              placeholder='번호를 입력해주세요'
              className='border-[1.5px] border-solid border-[rgba(0,0,0,0.5)] rounded-[10px] w-full h-11 px-3'
            />
            {errors.phoneNumber && (
              <p className='text-red-500 text-xs mt-1'>
                {errors.phoneNumber.message}
              </p>
            )}
          </div>

          {/* 인증 버튼 영역 */}
          <div className='flex flex-col gap-2 mt-4'>
            <button
              type='submit'
              className={`border border-solid ${
                verificationVisible ? 'bg-gray-400' : 'bg-[#04447C]'
              } text-white rounded-[10px] h-[43px] text-[24px] font-[manSeh] shadow-md`}
              disabled={verificationVisible}
            >
              인증하기
            </button>

            {/* 인증번호 영역 */}
            {verificationVisible && (
              <div className='flex flex-col gap-6 mt-5'>
                <input
                  type='text'
                  {...register('authNumber')}
                  placeholder='인증번호를 입력해주세요'
                  className={`border-[1.5px] border-solid rounded-[10px] w-full h-11 px-3 ${
                    verificationVisible
                      ? 'border-[rgba(0,0,0,0.5)] bg-white'
                      : 'border-[rgba(0,0,0,0.3)] bg-gray-100'
                  }`}
                />
                <button
                  type='submit'
                  className={`border border-solid text-white rounded-[10px] h-[43px] text-[24px] font-[manSeh] ${
                    verificationVisible
                      ? 'bg-[#04447C]'
                      : 'bg-gray-400 cursor-not-allowed'
                  }`}
                >
                  인증확인
                </button>
                {error && <div className='text-[red] mt-3'>{error}</div>}
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
