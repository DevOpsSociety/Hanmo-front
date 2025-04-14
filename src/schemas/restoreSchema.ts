import { z } from 'zod';

export const restoreSchema = z.object({
  phoneNumber: z.string().min(10, '전화번호를 입력해주세요.'),
});

export type RestoreForm = z.infer<typeof restoreSchema>;
