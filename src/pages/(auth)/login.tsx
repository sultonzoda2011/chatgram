import { loginApi } from '@/api/authApi'
import { Button } from '@/components/ui/button'
import FormInput from '@/components/ui/formInput'
import { setToken } from '@/lib/utils/cookie'
import LanguageSwitcher from '@/components/ui/LanguageSwitcher'
import { LoginSchema } from '@/schemas/auth'
import type { ILogin } from '@/types/auth'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { Lock, User } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
const LoginPage = () => {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const { mutate } = useMutation({
    mutationFn: loginApi,
    onSuccess: (res) => {
      toast.success(res.message)
      setToken(res.data.token)
      navigate('/')
    },
    onError: (err) => {
      toast.error(err.message)
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
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="absolute top-4 right-4">
        <LanguageSwitcher />
      </div>
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">{t('login.title')}</h2>
        <p className="mb-4 text-gray-500">{t('login.subtitle')}</p>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
          <FormInput
            name="username"
            control={control}
            label={t('login.usernameLabel')}
            type="text"
            placeholder={t('login.usernamePlaceholder')}
            icon={User}
          />
          <FormInput
            name="password"
            control={control}
            label={t('login.passwordLabel')}
            type="password"
            placeholder={t('login.passwordPlaceholder')}
            icon={Lock}
          />
          <Button type="submit">{t('login.submitButton')}</Button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-500">
          {t('login.noAccount')}{' '}
          <Link to="/register" className="font-medium text-blue-500 hover:text-blue-700">
            {t('login.signUp')}
          </Link>
        </p>
      </div>
    </div>
  )
}

export default LoginPage
