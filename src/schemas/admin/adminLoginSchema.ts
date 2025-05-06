import { z } from "zod";

export const adminLoginSchema = z.object({
  phoneNumber: z
    .string()
    .min(10, "최소 10자리의 전화번호를 입력해주세요.")
    .max(11, "최대 11자리의 전화번호를 입력해주세요."),
  loginId: z.string().min(5, "최소 5자리 이상 아이디를 입력해주세요.")
    .max(20, "최대 20자 이하로 입력해주세요."),
  loginPw: z.string().min(5, "최소 5자리 이상 비밀번호를 입력해주세요").max(20, "최대 20자 이하로 입력해주세요."),
});

export type AdminLoginForm = z.infer<typeof adminLoginSchema>;
