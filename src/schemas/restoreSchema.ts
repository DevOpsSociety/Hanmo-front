import { z } from 'zod';

export const restoreSchema = z.object({
  phoneNumber: z.string().min(10, '전화번호를 입력해주세요.'),
  authNumber: z
    .string()
    .optional()
    .refine((val) => !val || val.length === 6, {
      message: '인증번호는 6자리여야 합니다.',
    }),
});

export type RestoreForm = z.infer<typeof restoreSchema>;
