import { registerApi } from '@/api/authApi'
import { Button } from '@/components/ui/button'
import FormInput from '@/components/ui/formInput'
import LanguageSwitcher from '@/components/ui/languageSwitcher'
import { setToken } from '@/lib/utils/cookie'
import { RegisterSchema } from '@/schemas/auth'
import type { IRegister } from '@/types/auth'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { Lock, Mail, User } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
const RegisterPage = () => {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const { mutate } = useMutation({
    mutationFn: registerApi,
    onSuccess: (res) => {
      toast.success(res.message)
      setToken(res.data.token)
      navigate('/')
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
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="absolute top-4 right-4">
        <LanguageSwitcher />
      </div>
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">{t('register.title')}</h2>
        <p className="mb-4 text-gray-500">{t('register.subtitle')}</p>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
          <FormInput
            name="username"
            control={control}
            label={t('register.usernameLabel')}
            type="text"
            placeholder={t('register.usernamePlaceholder')}
            icon={User}
          />
          <FormInput
            name="fullname"
            control={control}
            label={t('register.fullnameLabel')}
            type="text"
            placeholder={t('register.fullnamePlaceholder')}
            icon={User}
          />
          <FormInput
            name="email"
            control={control}
            label={t('register.emailLabel')}
            type="email"
            placeholder={t('register.emailPlaceholder')}
            icon={Mail}
          />
          <FormInput
            name="password"
            control={control}
            label={t('register.passwordLabel')}
            type="password"
            placeholder={t('register.passwordPlaceholder')}
            icon={Lock}
          />
          <Button type="submit">{t('register.submitButton')}</Button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-500">
          {t('register.haveAccount')}{' '}
          <Link to="/login" className="font-medium text-blue-500 hover:text-blue-700">
            {t('register.signIn')}
          </Link>
        </p>
      </div>
    </div>
  )
}

export default RegisterPage
