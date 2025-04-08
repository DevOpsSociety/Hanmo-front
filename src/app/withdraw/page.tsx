'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { deleteUser } from '../../api/user';
import styles from './styles.module.css';
import axios from 'axios';
import { delay } from '../../utils/delay';
import Image from 'next/image';
import withdrawImg from '../../../public/withdraw.png';
import { WithdrawForm, withdrawSchema } from '../../schemas/withdrawSchema';
import { borderClass, buttonClass, labelClass } from '../../utils/classNames';
import ErrorMessage from '../../components/errorMessage';

export default function WithdrawPage(): JSX.Element {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<WithdrawForm>({
    resolver: zodResolver(withdrawSchema),
  });

  const onSubmit = async ({ phoneNumber }: WithdrawForm) => {
    try {
      toast.loading('탈퇴 중...');

      await delay(1000);

      const res = await deleteUser(phoneNumber);

      if (res.status === 200) {
        toast.dismiss();
        toast.success('탈퇴 완료!');
        localStorage.removeItem('token');
        // router.push('/');
        router.push('/landing');
      } else {
        toast.error('탈퇴 실패: 정보를 확인해주세요.');
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.error('axios error status :', err.response?.status);
        if (err.response?.status === 404) {
          toast.dismiss();
          toast.error('존재하지 않는 사용자입니다.');
        }
      }
    }
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
          <div className=''>탈퇴하시려면 {`"DELETE"`}를 입력해주세요</div>
          <input
            type='text'
            {...register('deleteCheck')}
            placeholder='DELETE'
            className={borderClass}
          />
          <ErrorMessage message={errors.deleteCheck?.message} />
        </div>

        <div className={`flex flex-col gap-3 mt-4 ${styles.mansehFont}`}>
          <button type='submit' className={buttonClass}>
            탈퇴하기
          </button>
        </div>
      </form>
    </div>
  );
}
