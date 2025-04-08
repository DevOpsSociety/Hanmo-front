import { z } from 'zod';

export const stepOneSchema = z.object({
  name: z.string().min(2, '이름은 최소 2글자 이상이어야 합니다.'),
  phoneNumber: z
    .string()
    .regex(/^\d+$/, '전화번호는 숫자만 입력해야 합니다.')
    .min(10, '전화번호는 최소 10자리 이상이어야 합니다.'),
  authNumber: z
    .string()
    .optional()
    .refine((val) => !val || val.length === 6, {
      message: '인증번호는 6자리여야 합니다.',
    }),
});

export type StepOneForm = z.infer<typeof stepOneSchema>;
