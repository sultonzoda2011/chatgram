import { getProfileApi, updateProfileApi } from '@/api/profileApi'
import { Button } from '@/components/ui/button/button'
import FormInput from '@/components/ui/input/formInput'
import { UpdateProfileSchema } from '@/schemas/profile'
import type { IProfile, IUpdateProfile } from '@/types/profile'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Mail, User } from 'lucide-react'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'

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

  if (!updateProfileModalOpen) return null

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg w-full max-w-md">
      {isLoading && <p>{t('profile.loading')}</p>}

      <form
        onSubmit={handleSubmit(onSubmit)}
        className={isUpdating ? 'opacity-50 pointer-events-none' : ''}
      >
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

        <div className="mt-4 flex justify-end gap-2">
          <Button variant="outline" onClick={() => setUpdateProfileModalOpen(false)}>
            {t('common.cancel')}
          </Button>
          <Button type="submit" isPending={isUpdating}>
            {t('profile.updateTitle')}
          </Button>
        </div>
      </form>
    </div>
  )
}

export default UpdateProfile
