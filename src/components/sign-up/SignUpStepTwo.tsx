'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
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

// ✅ zod schema 정의
const stepTwoSchema = z.object({
  studentNumber: z.string().min(9, '학번을 입력해주세요'),
  gender: z.coerce
    .string()
    .refine((val) => Object.values(Gender).includes(Number(val)), {
      message: '성별을 선택해주세요',
    }),
  mbti: z.string().refine((val) => Object.values(MBTI).includes(Number(val)), {
    message: 'MBTI를 선택해주세요',
  }),
  department: z
    .string()
    .refine(
      (val) =>
        Object.values(Department).some(
          (dept) => dept.hasOwnProperty('id') && dept.id === Number(val)
        ),
      {
        message: '학과를 선택해주세요',
      }
    ),
  instagramId: z.string().min(1, '인스타그램 아이디를 입력해주세요'),
});

type StepTwoForm = z.infer<typeof stepTwoSchema>;

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
      toast.error('가입 또는 로그인 중 오류가 발생했습니다.');
      console.error('가입 실패:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='flex flex-col h-screen'>
      <div className='text-center border-b h-[73px] flex items-center justify-center'>
        <span className='text-[38px] font-[manSeh]'>정보입력</span>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className='flex flex-col gap-5 w-[200px] mx-auto h-full justify-center'
      >
        <div className='w-full flex flex-col'>
          <label className='text-[15px] mb-2 text-black text-opacity-70'>
            학번
          </label>
          <input
            {...register('studentNumber')}
            placeholder='ex)202010955'
            className='border rounded-[10px] w-full h-11 px-3'
          />
          {errors.studentNumber && (
            <p className='text-red-500 text-xs mt-1 text-center'>
              {errors.studentNumber.message}
            </p>
          )}
          <div className='text-[red] text-[9px] mt-2 text-center'>
            학번은 아이디로 사용되니 정확히 입력해주세요.
          </div>
        </div>

        <div className='w-full flex flex-col'>
          <label className='text-[15px] mb-2 text-black text-opacity-70'>
            성별
          </label>
          <div className='flex justify-between gap-5'>
            {enumToOptions(Gender).map((opt) => {
              const isSelected = selectedGender === String(opt.id);

              return (
                <label
                  key={opt.id}
                  className={`w-full h-[43px] text-[24px] flex items-center justify-center rounded-[10px] border cursor-pointer font-[manSeh]
        ${
          isSelected
            ? 'bg-[#04447C] bg-opacity-90 text-white'
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
          {errors.gender && (
            <p className='text-red-500 text-xs mt-1 text-center'>
              {errors.gender.message}
            </p>
          )}
        </div>

        <div className='w-full flex flex-col'>
          <label className='text-[15px] mb-2 text-black text-opacity-70'>
            MBTI
          </label>
          <select
            {...register('mbti')}
            className='border rounded-[10px] w-full h-11 px-3 font-bold'
          >
            <option value=''>선택</option>
            {enumToOptions(MBTI).map((opt) => (
              <option key={opt.id} value={opt.id}>
                {opt.label}
              </option>
            ))}
          </select>
          {errors.mbti && (
            <p className='text-red-500 text-xs mt-1 text-center'>
              {errors.mbti.message}
            </p>
          )}
        </div>

        <div className='w-full flex flex-col text-black text-opacity-70'>
          <label className='text-[15px] mb-2'>학과</label>
          <select
            {...register('department')}
            className='border rounded-[10px] w-full h-11 px-3 font-bold'
          >
            <option value=''>선택</option>
            {objectEnumToOptions(Department).map((opt) => (
              <option key={opt.id} value={opt.id} className=''>
                {opt.label}
              </option>
            ))}
          </select>
          {errors.department && (
            <p className='text-red-500 text-xs mt-1 text-center'>
              {errors.department.message}
            </p>
          )}
        </div>

        <div className='w-full flex flex-col'>
          <label className='text-[15px] mb-2 text-black text-opacity-70'>
            인스타
          </label>
          <input
            {...register('instagramId')}
            placeholder='hsu_it_zzang'
            className='border rounded-[10px] w-full h-11 px-3'
          />
          {errors.instagramId && (
            <p className='text-red-500 text-xs mt-1 text-center'>
              {errors.instagramId.message}
            </p>
          )}
        </div>

        <button
          type='submit'
          disabled={loading}
          className={`bg-[#04447C] text-white rounded-[10px] w-[170px] h-[43px] text-[24px] mt-5 mx-auto font-[manSeh] ${
            loading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {loading ? '가입 중...' : '가입하기'}
        </button>
      </form>
    </div>
  );
}
