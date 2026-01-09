import { z } from 'zod'

export const LoginSchema = z.object({
  username: z
    .string()
    .min(3, 'Username must be at least 3 characters')
    .max(20, 'Username must be less than 20 characters'),

  password: z.string().min(6, 'Password must be at least 6 characters'),
})

export const RegisterSchema = z.object({
  username: z
    .string()
    .min(3, 'Username must be at least 3 characters')
    .max(20, 'Username must be less than 20 characters'),

  fullname: z.string().min(2, 'Full name must be at least 2 characters'),

  email: z.string().email('Invalid email'),

  password: z.string().min(6, 'Password must be at least 6 characters'),
})
