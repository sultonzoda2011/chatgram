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
import { toast } from 'sonner'

interface IUpdateProfileProps {
  updateProfileModalOpen: boolean
  setUpdateProfileModalOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const UpdateProfile = ({
  updateProfileModalOpen,
  setUpdateProfileModalOpen,
}: IUpdateProfileProps) => {
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
      toast.success('Profile updated successfully')
      setUpdateProfileModalOpen(false)
    },
    onError: () => {
      toast.error('Failed to update profile')
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
      {isLoading && <p>Loading profile...</p>}

      <form
        onSubmit={handleSubmit(onSubmit)}
        className={isUpdating ? 'opacity-50 pointer-events-none' : ''}
      >
        <FormInput
          name="fullname"
          control={control}
          label="Full Name"
          type="text"
          icon={User}
          placeholder="Enter your full name"
        />
        <FormInput
          name="email"
          control={control}
          label="Email"
          type="email"
          icon={Mail}
          placeholder="Enter your email"
        />
        <FormInput
          name="username"
          control={control}
          label="Username"
          type="text"
          icon={User}
          placeholder="Enter your username"
        />

        <div className="mt-4 flex justify-end gap-2">
          <Button variant="outline" onClick={() => setUpdateProfileModalOpen(false)}>
            Cancel
          </Button>
          <Button type="submit" isPending={isUpdating}>
            Update Profile
          </Button>
        </div>
      </form>
    </div>
  )
}

export default UpdateProfile
