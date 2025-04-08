import { z } from 'zod';

// ✅ zod 스키마
export const withdrawSchema = z.object({
  phoneNumber: z.string().min(10, '휴대전화 번호를 입력해주세요'),
  deleteCheck: z.string().refine((val) => val === 'DELETE', {
    message: '"DELETE"를 정확히 입력해주세요',
  }),
});

export type WithdrawForm = z.infer<typeof withdrawSchema>;
