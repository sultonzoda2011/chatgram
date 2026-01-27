import { getProfileApi, updateProfileApi } from '@/api/profileApi'
import { Button } from '@/components/ui/button/button'
import FormInput from '@/components/ui/input/formInput'
import { Loading } from '@/components/ui'
import { UpdateProfileSchema } from '@/schemas/profile'
import type { IProfile, IUpdateProfile } from '@/types/profile'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Mail, User, X } from 'lucide-react'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'
import { motion, AnimatePresence } from 'motion/react'

interface IUpdateProfileProps {
  updateProfileModalOpen: boolean
  setUpdateProfileModalOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const UpdateProfile = ({
  updateProfileModalOpen,
  setUpdateProfileModalOpen,
}: IUpdateProfileProps) => {
  const { t } = useTranslation()
  const queryClient = useQueryClient()
  const {
    data: profileData,
    isLoading,
  } = useQuery<IProfile>({
    queryKey: ['profile'],
    queryFn: getProfileApi,
  })

  const {
    mutate: updateProfile,
    isPending: isUpdating,
  } = useMutation({
    mutationFn: updateProfileApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile'] })
      toast.success(t('profile.successUpdate'))
      setUpdateProfileModalOpen(false)
    },
    onError: () => {
      toast.error(t('profile.errorUpdate'))
    },
  })

  const { control, handleSubmit, setValue } = useForm<IUpdateProfile>({
    defaultValues: {
      fullname: '',
      email: '',
      username: '',
    },
    resolver: zodResolver(UpdateProfileSchema),
  })

  useEffect(() => {
    if (profileData) {
      setValue('fullname', profileData.fullname)
      setValue('email', profileData.email)
      setValue('username', profileData.username)
    }
  }, [profileData, setValue])

  const onSubmit = (data: IUpdateProfile) => {
    updateProfile(data)
  }

  return (
    <AnimatePresence>
      {updateProfileModalOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setUpdateProfileModalOpen(false)}
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
                <h2 className="text-xl font-bold text-foreground">{t('profile.updateTitle')}</h2>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setUpdateProfileModalOpen(false)}
                  className="p-1 hover:bg-accent rounded-lg transition-colors"
                >
                  <X size={20} className="text-muted-foreground" />
                </motion.button>
              </div>

              <div className="p-6">
                {isLoading ? (
                  <Loading text={t('profile.loading')} className="py-4" />
                ) : (
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="space-y-4">
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                      >
                        <FormInput
                          name="fullname"
                          control={control}
                          label={t('profile.fullname')}
                          type="text"
                          icon={User}
                          placeholder={t('profile.placeholders.fullname')}
                        />
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.15 }}
                      >
                        <FormInput
                          name="email"
                          control={control}
                          label={t('profile.email')}
                          type="email"
                          icon={Mail}
                          placeholder={t('profile.placeholders.email')}
                        />
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                      >
                        <FormInput
                          name="username"
                          control={control}
                          label={t('profile.username')}
                          type="text"
                          icon={User}
                          placeholder={t('profile.placeholders.username')}
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
                        onClick={() => setUpdateProfileModalOpen(false)}
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
                        {t('profile.updateTitle')}
                      </Button>
                    </motion.div>
                  </form>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default UpdateProfile
