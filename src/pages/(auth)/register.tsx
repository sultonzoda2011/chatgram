import { registerApi } from '@/api/authApi'
import { Button } from '@/components/ui/button/button'
import FormInput from '@/components/ui/input/formInput'
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
import { motion } from 'motion/react'
import { toast } from 'sonner'
import logo from '@/assets/logo.png'

const RegisterPage = () => {
  const navigate = useNavigate()
  const { t } = useTranslation()

  const { mutate, isPending } = useMutation({
    mutationFn: registerApi,
    onSuccess: (res) => {
      toast.success(res.message)
      setToken(res.data.token)
      navigate('/')
    },
    onError: (err) => {
      toast.error(err.message)
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
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-background via-background to-accent/10 p-4 relative overflow-hidden">
      <motion.div
        className="absolute inset-0 bg-linear-to-br from-primary/5 via-transparent to-chart-2/5 opacity-50"
        animate={{
          backgroundPosition: ['0% 0%', '100% 100%'],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          repeatType: 'reverse',
        }}
      />

      <motion.div
        className="absolute -top-40 -left-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <motion.div
        className="absolute top-4 right-4 z-50"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <LanguageSwitcher />
      </motion.div>

      <motion.div
        className="w-full max-w-md relative z-10"
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, type: 'spring', stiffness: 300, damping: 30 }}
      >
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-center mb-10"
        >
          <img src={logo} alt={t('register.brandName')} className="w-20 h-20 mx-auto mb-4 text-primary" />

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h1 className="text-4xl font-black bg-linear-to-r from-primary via-primary to-chart-2 bg-clip-text text-transparent mb-2 tracking-tight">
              ChatGram
            </h1>
            <div className="h-1 w-16 bg-linear-to-r from-primary to-chart-2 mx-auto rounded-full mb-3" />
            <p className="text-sm font-medium text-chart-1 tracking-widest uppercase">
              {t('register.subtitle')}
            </p>
          </motion.div>
        </motion.div>

        <div className="bg-card/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-border p-8 overflow-hidden relative">
          <motion.div
            className="absolute -top-1 -left-1 w-64 h-64 bg-linear-to-br from-primary/20 to-chart-2/20 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />

          <motion.div className="relative z-10">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mb-8"
            >
              <h2 className="text-2xl font-bold text-foreground mb-2">{t('register.title')}</h2>
              <p className="text-sm text-chart-1 font-medium">{t('register.subtitle')}</p>
            </motion.div>

            <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.35 }}
              >
                <FormInput
                  name="username"
                  control={control}
                  label={t('register.usernameLabel')}
                  type="text"
                  placeholder={t('register.usernamePlaceholder')}
                  icon={User}
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.4 }}
              >
                <FormInput
                  name="fullname"
                  control={control}
                  label={t('register.fullnameLabel')}
                  type="text"
                  placeholder={t('register.fullnamePlaceholder')}
                  icon={User}
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.45 }}
              >
                <FormInput
                  name="email"
                  control={control}
                  label={t('register.emailLabel')}
                  type="email"
                  placeholder={t('register.emailPlaceholder')}
                  icon={Mail}
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.5 }}
              >
                <FormInput
                  name="password"
                  control={control}
                  label={t('register.passwordLabel')}
                  type="password"
                  placeholder={t('register.passwordPlaceholder')}
                  icon={Lock}
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.55 }}
                className="pt-2"
              >
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    type="submit"
                    isPending={isPending}
                    className="w-full h-11 bg-linear-to-br from-primary via-primary to-primary/80 hover:from-primary/90 hover:via-primary/85 hover:to-primary/70 shadow-lg hover:shadow-xl transition-all duration-200 font-semibold text-base"
                  >
                    {t('register.submitButton')}
                  </Button>
                </motion.div>
              </motion.div>
            </form>

            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.4, delay: 0.6 }}
              className="flex items-center gap-3 my-6"
            >
              <div className="h-px flex-1 bg-border" />
              <span className="text-xs text-chart-1 font-medium">{t('register.divider')}</span>
              <div className="h-px flex-1 bg-border" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.65 }}
              className="text-center"
            >
              <p className="text-sm text-chart-1 mb-3">
                {t('register.haveAccount')}{' '}
                <Link
                  to="/login"
                  className="font-semibold text-primary hover:text-primary/80 transition-colors duration-200 relative inline-block group"
                >
                  {t('register.signIn')}
                  <motion.div
                    className="absolute bottom-0 left-0 w-0 h-0.5 bg-linear-to-r from-primary to-chart-2 group-hover:w-full transition-all duration-300"
                    layoutId="underline"
                  />
                </Link>
              </p>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="text-xs text-chart-1 text-center mt-6 leading-relaxed"
            >
              {t('register.termsText')}{' '}
              <Link to="#" className="text-primary hover:text-primary/80 transition-colors">
                {t('register.terms')}
              </Link>{' '}
              {t('register.and')}{' '}
              <Link to="#" className="text-primary hover:text-primary/80 transition-colors">
                {t('register.privacy')}
              </Link>
            </motion.p>
          </motion.div>
        </div>

        <motion.div
          className="absolute -bottom-20 -right-20 w-40 h-40 bg-chart-2/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </motion.div>
    </div>
  )
}

export default RegisterPage
