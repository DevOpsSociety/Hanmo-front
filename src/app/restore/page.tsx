'use client';

import Input from '../../components/common/Input';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { RestoreForm, restoreSchema } from '../../schemas/restoreSchema';
import { labelClass } from '../../utils/classNames';
import { useRouter } from 'next/navigation';
import { handleRestoreLogic } from '../../utils/authHandlers';
import { useState } from 'react';
import Button from '../../components/common/Button';

export default function RestorePage(): JSX.Element {
  const router = useRouter();

  const [verificationVisible, setVerificationVisible] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RestoreForm>({
    resolver: zodResolver(restoreSchema),
  });

  const onSubmit = async (data: RestoreForm) => {
    await handleRestoreLogic(
      data.phoneNumber,
      router,
      '/login',
      setVerificationVisible
    );
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={`w-[393px] px-[56px] flex flex-col justify-center gap-4 mx-auto h-[calc(100vh-73px)] font-[Pretendard] ${labelClass}`}
    >
      <Input
        label='휴대전화'
        register={register}
        registerName='phoneNumber'
        placeholder='01012345678'
        errorMessage={errors.phoneNumber?.message}
      />
      <div className='text-red-500 text-center'>
        3일 이내 탈퇴한 계정만 복원 가능합니다.
      </div>
      <Button
        name='탈퇴 계정 복원하기'
        verificationVisible={verificationVisible}
      />
    </form>
  );
}
