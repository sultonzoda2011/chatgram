import { LoginSchema } from '@/schemas/auth'
import type { ILogin } from '@/types/auth'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import FormInput from '@/components/ui/formInput'
import { Lock, User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useMutation } from '@tanstack/react-query'
import { loginApi } from '@/api/authApi'
import { toast } from 'sonner'
import { setToken } from '@/lib/utils/cookie'
import { Link } from 'react-router-dom'
const LoginPage = () => {
  const { mutate } = useMutation({
    mutationFn: loginApi,
    onSuccess: (res) => {
      toast.success(res.message)
      setToken(res.data.token)
    },
  })
  const { control, handleSubmit } = useForm<ILogin>({
    defaultValues: {
      username: '',
      password: '',
    },
    resolver: zodResolver(LoginSchema),
  })
  const onSubmit = (data: ILogin) => {
    mutate(data)
  }
  return (
    <div className="w-full max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Sign In</h2>
      <p className="mb-4 text-gray-500">Welcome back! Please sign in to continue.</p>
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
        Don't have an account?{' '}
        <Link to="/register" className="font-medium text-blue-500 hover:text-blue-700">
          Sign Up
        </Link>
      </p>
    </div>
  )
}

export default LoginPage
