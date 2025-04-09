'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { handleWithdrawLogic } from '../../utils/authHandlers';
import { withdrawSchema } from '../../schemas/withdrawSchema';
import { borderClass, buttonClass, labelClass } from '../../utils/classNames';
import ErrorMessage from '../../components/errorMessage';
import Image from 'next/image';
import withdrawImg from '../../../public/withdraw.png';

type WithdrawForm = z.infer<typeof withdrawSchema>;

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
        <div className={labelClass}>
          <div className='text-[15px]'>휴대전화</div>
          <input
            type='text'
            {...register('phoneNumber')}
            placeholder='01012345678'
            className={borderClass}
          />
          <ErrorMessage message={errors.phoneNumber?.message} />
        </div>

        {/* DELETE 체크 */}
        <div className={labelClass}>
          <div className=''>
            탈퇴하시려면 <span className='text-red-500'>{`DELETE`}</span> 를
            입력해주세요
          </div>
          <input
            type='text'
            {...register('deleteCheck')}
            placeholder='DELETE'
            className={borderClass}
          />
          <ErrorMessage message={errors.deleteCheck?.message} />
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
