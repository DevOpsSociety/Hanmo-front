import { z } from "zod";

export const adminLoginSchema = z.object({
    id: z.string().min(9, '아이디를 입력해주세요.'),
    password: z.string().min(10, '비밀번호를 입력해주세요.'),
  });
  
  export type AdminLoginForm = z.infer<typeof adminLoginSchema>;