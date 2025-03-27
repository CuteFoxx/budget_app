import { date, z } from "zod";

export const registerFormSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
});

export const loginFormSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(6, {
    message: "Invalid password",
  }),
});

export const expenseFormSchema = z.object({
  name: z.string().min(4, {
    message: "Expense name must be at least 4 characters.",
  }),
  amount: z.coerce.number().min(1, {
    message: "Expense amount must be at least 1 digit long.",
  }),
  category: z.string().optional(),
  date: z.coerce.date(),
});

export const incomeFormSchema = z.object({
  name: z.string().min(4, {
    message: "Income name must be at least 4 characters.",
  }),
  amount: z.coerce.number().min(1, {
    message: "Income amount must be at least 1 digit long.",
  }),
  category: z.string().optional(),
  date: z.coerce.date(),
});

export const settingsFormSchema = z.object({
  currency: z.string(),
});
