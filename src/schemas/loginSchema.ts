import { z } from 'zod';

export const loginSchema = z.object({
  studentNumber: z.string().min(9, '학번을 입력해주세요.'),
  phoneNumber: z.string().min(10, '전화번호를 입력해주세요.'),
});

export type LoginForm = z.infer<typeof loginSchema>;
