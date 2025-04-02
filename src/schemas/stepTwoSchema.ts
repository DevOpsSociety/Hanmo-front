import { z } from 'zod';
import { Gender, MBTI, Department } from '../enums';

export const stepTwoSchema = z.object({
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

export type StepTwoForm = z.infer<typeof stepTwoSchema>;
