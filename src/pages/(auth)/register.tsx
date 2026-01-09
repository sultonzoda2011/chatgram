import { RegisterSchema } from '@/schemas/auth'
import type { IRegister } from '@/types/auth'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import FormInput from '@/components/ui/formInput'
import { Lock, Mail, User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useMutation } from '@tanstack/react-query'
import { registerApi } from '@/api/authApi'
import { toast } from 'sonner'
import { setToken } from '@/lib/utils/cookie'
import { Link } from 'react-router-dom'
const RegisterPage = () => {
  const { mutate } = useMutation({
    mutationFn: registerApi,
    onSuccess: (res) => {
      toast.success(res.message)
      setToken(res.data.token)
    },
  })
  const { control, handleSubmit } = useForm<IRegister>({
    defaultValues: {
      username: '',
      fullname: '',
      email: '',
      password: '',
    },
    resolver: zodResolver(RegisterSchema),
  })
  const onSubmit = (data: IRegister) => {
    mutate(data)
  }
  return (
    <div className="w-full max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Sign Up</h2>
      <p className="mb-4 text-gray-500">Welcome! Please sign up to continue.</p>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
        <FormInput
          name="username"
          control={control}
          label="Username"
          type="text"
          placeholder="Enter your username"
          icon={User}
        />
        <FormInput
          name="fullname"
          control={control}
          label="Full Name"
          type="text"
          placeholder="Enter your full name"
          icon={User}
        />
        <FormInput
          name="email"
          control={control}
          label="Email"
          type="email"
          placeholder="Enter your email"
          icon={Mail}
        />
        <FormInput
          name="password"
          control={control}
          label="Password"
          type="password"
          placeholder="Enter your password"
          icon={Lock}
        />
        <Button type="submit">Sign In</Button>
      </form>
      <p className="mt-4 text-center text-sm text-gray-500">
        Already have an account?{' '}
        <Link to="/login" className="font-medium text-blue-500 hover:text-blue-700">
          Sign In
        </Link>
      </p>
    </div>
  )
}

export default RegisterPage
