'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { handleWithdrawLogic } from '../../utils/authHandlers';
import { WithdrawForm, withdrawSchema } from '../../schemas/withdrawSchema';
import { buttonClass, labelClass } from '../../utils/classNames';
import Image from 'next/image';
import withdrawImg from '../../../public/withdraw.png';
import Input from '../../components/common/Input';

export default function WithdrawPage(): JSX.Element {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<WithdrawForm>({
    resolver: zodResolver(withdrawSchema),
  });

  const onSubmit = async (data: WithdrawForm) => {
    await handleWithdrawLogic(data.phoneNumber, router, '/landing');
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={`w-[393px] px-[56px] flex flex-col justify-center gap-4 mx-auto h-[calc(100vh-73px)] font-[Pretendard] ${labelClass}`}
      >
        <Image src={withdrawImg} alt='로고' className='mx-auto' priority />

        {/* 휴대전화 */}
        <Input
          label='휴대전화'
          register={register}
          registerName='phoneNumber'
          placeholder='01012345678'
          errorMessage={errors.phoneNumber?.message}
        />

        {/* DELETE 체크 */}
        <Input
          label={
            <>
              탈퇴하시려면 <span className='text-red-500'>DELETE</span> 를
              입력해주세요
            </>
          }
          register={register}
          registerName='deleteCheck'
          placeholder='DELETE'
          errorMessage={errors.deleteCheck?.message}
        />

        <div className='text-red-500 text-center mt-5'>
          회원탈퇴 시, 3일 간 재가입이 불가합니다!!
        </div>

        <div className={`flex flex-col gap-3 mt-4`}>
          <button type='submit' className={buttonClass}>
            탈퇴하기
          </button>
        </div>
      </form>
    </div>
  );
}
