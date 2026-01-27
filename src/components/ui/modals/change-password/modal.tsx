import { changePasswordApi } from '@/api/profileApi'
import { Button } from '@/components/ui/button/button'
import FormInput from '@/components/ui/input/formInput'
import { ChangePasswordSchema } from '@/schemas/profile'
import type { IChangePassword } from '@/types/profile'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { Lock } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'
import { motion, AnimatePresence } from 'motion/react'

interface IChangePasswordProps {
  changePasswordModalOpen: boolean
  setChangePasswordModalOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const ChangePassword = ({
  changePasswordModalOpen,
  setChangePasswordModalOpen,
}: IChangePasswordProps) => {
  const { t } = useTranslation()
  const { mutate: changePassword, isPending: isUpdating } = useMutation({
    mutationFn: changePasswordApi,
    onSuccess: () => {
      toast.success(t('password.successUpdate'))
      setChangePasswordModalOpen(false)
    },
    onError: () => {
      toast.error(t('password.errorUpdate'))
    },
  })

  const { control, handleSubmit } = useForm<IChangePassword>({
    defaultValues: {
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
    resolver: zodResolver(ChangePasswordSchema),
  })

  const onSubmit = (data: IChangePassword) => {
    changePassword(data)
  }

  return (
    <AnimatePresence>
      {changePasswordModalOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setChangePasswordModalOpen(false)}
          />
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <div className="p-6 bg-card/95 backdrop-blur-lg rounded-lg shadow-2xl border border-border w-full max-w-md">
              <form
                onSubmit={handleSubmit(onSubmit)}
                className={isUpdating ? 'opacity-50 pointer-events-none' : ''}
              >
                <div className="space-y-4">
                  <FormInput
                    name="oldPassword"
                    control={control}
                    label={t('password.old')}
                    type="password"
                    icon={Lock}
                    placeholder={t('password.placeholderOld')}
                  />
                  <FormInput
                    name="newPassword"
                    control={control}
                    label={t('password.new')}
                    type="password"
                    icon={Lock}
                    placeholder={t('password.placeholderNew')}
                  />
                  <FormInput
                    name="confirmPassword"
                    control={control}
                    label={t('password.confirm')}
                    type="password"
                    icon={Lock}
                    placeholder={t('password.placeholderConfirm')}
                  />
                </div>

                <div className="mt-6 flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setChangePasswordModalOpen(false)}>
                    {t('common.cancel')}
                  </Button>
                  <Button type="submit" isPending={isUpdating}>
                    {t('password.updateButton')}
                  </Button>
                </div>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default ChangePassword
