import { z } from 'zod'

export const loginSchema = z.object({
  email: z.string().email({
    message: 'Please enter a valid email address'
  }),
  password: z.string({
    required_error: 'password is required'
  })
})

export const registerSchema = z
  .object({
    email: z.string().email({
      message: 'Please enter a valid email address'
    }),
    password: z.string().min(6, {
      message: 'Password must be at least 6 characters'
    }).max(10,{
      message: 'Password must be at most 10 characters'
    }),
    confirmPassword: z.string()
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword']
  })
