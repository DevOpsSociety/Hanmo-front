import { z } from "zod";

export const adminSignupSchema = z.object({
  phoneNumber: z
    .string()
    .min(10, "최소 10자리의 전화번호를 입력해주세요.")
    .max(11, "최대 11자리의 전화번호를 입력해주세요."),
  loginId: z.string().min(5, "최소 5자리 이상 아이디를 입력해주세요.")
    .max(20, "최대 20자 이하로 입력해주세요."),
  loginPw: z.string().min(5, "최소 5자리 이상 비밀번호를 입력해주세요").max(20, "최대 20자 이하로 입력해주세요."),
  loginPwCheck: z.string().min(5, "최소 5자리 이상 비밀번호를 입력해주세요").max(20, "최대 20자 이하로 입력해주세요."),
})
  .superRefine((data, ctx) => {
    if (data.loginPw !== data.loginPwCheck) {
      ctx.addIssue({
        path: ["loginPwCheck"], // 어떤 필드에 오류 표시할지
        code: z.ZodIssueCode.custom,
        message: "비밀번호가 일치하지 않습니다.",
      });
    }
  });

export type AdminSignupForm = z.infer<typeof adminSignupSchema>;