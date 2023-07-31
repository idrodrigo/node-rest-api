import z from 'zod'

export const authSchema = z.object({
  email: z
    .string({
      required_error: 'Email is required'
    })
    .email({
      message: 'invalid email'
    }),
  password: z
    .string({
      required_error: 'Password is required'
    })
    .min(6, {
      message: 'Password must be at least 6 characters'
    }).max(10, {
      message: 'Password must be maximum of 10 characters'
    })
})

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string()
  // .min(6, {
  //   message: 'Password must be at least 6 characters'
  // }).max(10, {
  //   message: 'Password must be maximum of 10 characters'
  // })
})
