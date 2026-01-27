import { changePasswordApi } from '@/api/profileApi'
import { Button } from '@/components/ui/button/button'
import FormInput from '@/components/ui/input/formInput'
import { ChangePasswordSchema } from '@/schemas/profile'
import type { IChangePassword } from '@/types/profile'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { Lock, X } from 'lucide-react'
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

  const { control, handleSubmit, reset } = useForm<IChangePassword>({
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

  const handleClose = () => {
    reset()
    setChangePasswordModalOpen(false)
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
            onClick={handleClose}
          />
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <div className="bg-card border border-border rounded-xl shadow-2xl w-full max-w-md overflow-hidden">
              <div className="flex items-center justify-between p-6 border-b border-border bg-card/50">
                <h2 className="text-xl font-bold text-foreground">{t('password.updateButton')}</h2>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleClose}
                  className="p-1 hover:bg-accent rounded-lg transition-colors"
                >
                  <X size={20} className="text-muted-foreground" />
                </motion.button>
              </div>

              <div className="p-6">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="space-y-4">
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                    >
                      <FormInput
                        name="oldPassword"
                        control={control}
                        label={t('password.old')}
                        type="password"
                        icon={Lock}
                        placeholder={t('password.placeholderOld')}
                      />
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.15 }}
                    >
                      <FormInput
                        name="newPassword"
                        control={control}
                        label={t('password.new')}
                        type="password"
                        icon={Lock}
                        placeholder={t('password.placeholderNew')}
                      />
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <FormInput
                        name="confirmPassword"
                        control={control}
                        label={t('password.confirm')}
                        type="password"
                        icon={Lock}
                        placeholder={t('password.placeholderConfirm')}
                      />
                    </motion.div>
                  </div>
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25 }}
                    className="mt-6 flex justify-end gap-3"
                  >
                    <Button
                      variant="outline"
                      type="button"
                      onClick={handleClose}
                      disabled={isUpdating}
                      className="rounded-lg"
                    >
                      {t('common.cancel')}
                    </Button>
                    <Button
                      type="submit"
                      isPending={isUpdating}
                      className="rounded-lg"
                    >
                      {t('password.updateButton')}
                    </Button>
                  </motion.div>
                </form>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default ChangePassword
