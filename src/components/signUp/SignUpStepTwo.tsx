'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';
import { useState } from 'react';
import { Gender, MBTI, Department } from '../../enums';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { resetForm } from '../../store/signUpSlice';
import { enumToOptions, objectEnumToOptions } from '../../utils/enumToOptions';
import { RootState } from '../../store';
import { loginUser, signUpUser } from '../../api/user';
import { useRouter } from 'next/navigation';
import { delay } from '../../utils/delay';
import { handleToastError } from '../../utils/errorHandlers';
import { StepTwoForm, stepTwoSchema } from '../../schemas/stepTwoSchema';
import ErrorMessage from '../errorMessage';
import { borderClass, buttonClass, labelClass } from '../../utils/classNames';

export default function SignUpStepTwo() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const formData = useAppSelector((state: RootState) => state.signUp.formData);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<StepTwoForm>({
    resolver: zodResolver(stepTwoSchema),
  });

  const selectedGender = watch('gender');

  const onSubmit = async (data: StepTwoForm) => {
    console.log('formData : ', formData);
    console.log('data : ', data);

    if (!formData.name || !formData.phoneNumber) {
      toast.error(`필수 정보가 누락되었습니다.\n회원가입을 다시 시도해주세요.`);
      return;
    }

    const payload = {
      ...formData,
      ...data,
      studentNumber: data.studentNumber,
      gender: data.gender,
      mbti: data.mbti,
      department: data.department,
      instagramId: data.instagramId || '',
      name: formData.name,
      phoneNumber: formData.phoneNumber,
    };

    console.log('payload : ', payload);

    try {
      setLoading(true);
      toast.loading('가입 중...');

      await delay(1000); // 1초 대기

      const res = await signUpUser(payload);

      if (res.status === 200) {
        toast.dismiss();
        toast.success('가입 완료! 🎉');

        const loginRes = await loginUser({
          phoneNumber: payload.phoneNumber,
          studentNumber: payload.studentNumber,
        });

        if (loginRes.status === 200) {
          localStorage.setItem('token', loginRes.headers.temptoken); // 필요 시 저장 위치 변경 가능

          dispatch(resetForm());
          router.push('/nickname');
        } else {
          toast.error('로그인에 실패했습니다.');
        }
      } else if (res.status === 409) {
        toast.dismiss();
        toast.error('이미 등록된 회원입니다.');
      } else {
        toast.dismiss();
        toast.error('STATUS CODE : ' + res.status);
      }
    } catch (err) {
      toast.dismiss();
      handleToastError(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={`flex flex-col gap-5 w-[200px] mx-auto h-[calc(100vh-73px)] justify-center ${labelClass}`}
    >
      <div className='w-full flex flex-col'>
        <label>학번</label>
        <input
          {...register('studentNumber')}
          placeholder='ex)202010955'
          className={borderClass}
        />
        <ErrorMessage message={errors.studentNumber?.message} />

        <div className='text-[red] text-[9px] mt-2 text-center'>
          학번은 아이디로 사용되니 정확히 입력해주세요.
        </div>
      </div>

      <div className='w-full flex flex-col'>
        <label>성별</label>
        <div className='flex justify-between gap-5'>
          {enumToOptions(Gender).map((opt) => {
            const isSelected = selectedGender === String(opt.id);

            return (
              <label
                key={opt.id}
                className={`flex-1 text-[24px] text-center border cursor-pointer font-[manSeh] ${borderClass}
        ${
          isSelected
            ? 'bg-[#04447C] bg-opacity-90 text-white border-none'
            : 'text-[#2D2D2D] text-opacity-70'
        }
      `}
              >
                <input
                  type='radio'
                  value={opt.id}
                  {...register('gender')}
                  className='hidden'
                />
                {opt.label === 'MALE' ? '남' : '여'}
              </label>
            );
          })}
        </div>
        <ErrorMessage message={errors.gender?.message} />
      </div>

      <div className='w-full flex flex-col'>
        <label>MBTI</label>
        <select {...register('mbti')} className={borderClass}>
          <option value=''>선택</option>
          {enumToOptions(MBTI).map((opt) => (
            <option key={opt.id} value={opt.id}>
              {opt.label}
            </option>
          ))}
        </select>
        <ErrorMessage message={errors.mbti?.message} />
      </div>

      <div className='w-full flex flex-col text-black text-opacity-70'>
        <label className='text-[15px] mb-2'>학과</label>
        <select {...register('department')} className={borderClass}>
          <option value=''>선택</option>
          {objectEnumToOptions(Department).map((opt) => (
            <option key={opt.id} value={opt.id} className=''>
              {opt.label}
            </option>
          ))}
        </select>
        <ErrorMessage message={errors.department?.message} />
      </div>

      <div className='w-full flex flex-col'>
        <label>인스타</label>
        <input
          {...register('instagramId')}
          placeholder='hsu_it_zzang'
          className={borderClass}
        />
        <ErrorMessage message={errors.instagramId?.message} />
      </div>

      <button
        type='submit'
        disabled={loading}
        className={`${buttonClass} text-[20px] ${
          loading ? 'opacity-50 cursor-not-allowed' : ''
        }`}
      >
        {loading ? '가입 중...' : '가입하고 별명짓기'}
      </button>
      <p className='text-[10px] font-extrabold'>
        ※ 회원정보는 일주일 후에 자동 삭제됩니다.
      </p>
    </form>
  );
}
