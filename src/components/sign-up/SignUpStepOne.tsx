'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import LogoImg from '../../../public/logo.png';
import { useAppDispatch } from '../../app/store/hooks';
import { updateFormData } from '../../app/store/signUpSlice';
import { useState } from 'react';

// ✅ 유효성 검사 스키마
const stepOneSchema = z.object({
  name: z.string().min(1, '이름을 입력해주세요'),
  phoneNumber: z.string().min(10, '전화번호를 정확히 입력해주세요'),
  authNumber: z.string().optional(), // 인증번호는 선택사항으로 설정
});

type StepOneForm = z.infer<typeof stepOneSchema>;

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

  // 인증완료 후 다음 페이지 이동
  const handleVerifySubmit = (data: StepOneForm) => {
    dispatch(updateFormData(data));
    console.log('인증완료:', data);
    router.push('/signup/2');
  };

  return (
    <div className='flex flex-col h-screen'>
      <div className='text-center border-b border-solid border-[#E7E7E7] h-[73px] flex items-center justify-center'>
        <span className='text-[38px] text-[#04447C]'>회원가입</span>
      </div>

      <div className='flex flex-col h-full justify-center'>
        <Image src={LogoImg} alt='로고' className='mx-auto' priority />

        <form
          onSubmit={
            verificationVisible
              ? handleSubmit(handleVerifySubmit) // 인증완료 버튼 누르면 제출
              : (e) => {
                  e.preventDefault(); // 인증 전은 기본 제출 막고
                  setVerificationVisible(true); // 인증창 활성화
                }
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
              className={`border border-solid border-black ${
                verificationVisible ? 'bg-gray-400' : 'bg-[#04447C]'
              } text-white rounded-[10px] h-[43px] text-[24px]`}
              disabled={verificationVisible}
            >
              인증하기
            </button>

            {/* 인증번호 영역 */}
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
                disabled={!verificationVisible}
              />
              <button
                type='submit'
                className={`border border-solid text-white rounded-[10px] h-[43px] text-[24px] ${
                  verificationVisible
                    ? 'bg-[#04447C]'
                    : 'bg-gray-400 cursor-not-allowed'
                }`}
                disabled={!verificationVisible}
              >
                인증확인
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
