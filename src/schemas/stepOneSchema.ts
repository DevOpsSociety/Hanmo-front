import { z } from 'zod';

export const stepOneSchema = z.object({
  name: z.string().min(2, '이름을 입력해주세요'),
  phoneNumber: z.string().min(10, '전화번호를 정확히 입력해주세요'),
  authNumber: z.string().min(6, '인증번호가 6자리인지 확인해주세요'),
});

export type StepOneForm = z.infer<typeof stepOneSchema>;
