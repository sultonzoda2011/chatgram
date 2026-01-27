import { getProfileApi, updateProfileApi } from '@/api/profileApi'
import { Button } from '@/components/ui/button/button'
import FormInput from '@/components/ui/input/formInput'
import { Loading } from '@/components/ui/loading'
import { UpdateProfileSchema } from '@/schemas/profile'
import type { IProfile, IUpdateProfile } from '@/types/profile'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Mail, User } from 'lucide-react'
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
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <div className="p-6 bg-card/95 backdrop-blur-lg rounded-lg shadow-2xl border border-border w-full max-w-md">
              {isLoading ? (
                <Loading text={t('profile.loading')} size="sm" />
              ) : (
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className={isUpdating ? 'opacity-50 pointer-events-none' : ''}
                >
                  <div className="space-y-4">
                    <FormInput
                      name="fullname"
                      control={control}
                      label={t('profile.fullname')}
                      type="text"
                      icon={User}
                      placeholder={t('profile.placeholders.fullname')}
                    />
                    <FormInput
                      name="email"
                      control={control}
                      label={t('profile.email')}
                      type="email"
                      icon={Mail}
                      placeholder={t('profile.placeholders.email')}
                    />
                    <FormInput
                      name="username"
                      control={control}
                      label={t('profile.username')}
                      type="text"
                      icon={User}
                      placeholder={t('profile.placeholders.username')}
                    />
                  </div>

                  <div className="mt-6 flex justify-end gap-2">
                    <Button variant="outline" onClick={() => setUpdateProfileModalOpen(false)}>
                      {t('common.cancel')}
                    </Button>
                    <Button type="submit" isPending={isUpdating}>
                      {t('profile.updateTitle')}
                    </Button>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default UpdateProfile
