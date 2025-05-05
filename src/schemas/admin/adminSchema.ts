import { z } from "zod";

export const adminSchema = z.object({
  phoneNumber: z.string().min(10, '최소 10자리의 전화번호를 입력해주세요.').max(11, '최대 11자리의 전화번호를 입력해주세요.'),
  loginId: z.string().min(9, '아이디를 입력해주세요.'),
  loginPw: z.string().min(10, '비밀번호를 입력해주세요.'),
  loginPwCheck: z.string().min(10, '비밀번호를 입력해주세요.').optional(),
});

export type AdminForm = z.infer<typeof adminSchema>;