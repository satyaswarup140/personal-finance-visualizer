import { z } from 'zod';

export const transactionSchema = z.object({
  amount: z.number().positive(),
  date: z.string(),
  description: z.string().min(1),
  category: z.string(),
});

export const budgetSchema = z.object({
  category: z.string(),
  amount: z.number().positive(),
  month: z.string(),
});
