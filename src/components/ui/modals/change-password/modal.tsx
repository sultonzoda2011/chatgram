import { changePasswordApi } from '@/api/profileApi'
import { Button } from '@/components/ui/button/button'
import FormInput from '@/components/ui/input/formInput'
import { ChangePasswordSchema } from '@/schemas/profile'
import type { IChangePassword } from '@/types/profile'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { Lock } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

interface IChangePasswordProps {
  changePasswordModalOpen: boolean
  setChangePasswordModalOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const ChangePassword = ({
  changePasswordModalOpen,
  setChangePasswordModalOpen,
}: IChangePasswordProps) => {
  const { mutate: changePassword, isPending: isUpdating } = useMutation({
    mutationFn: changePasswordApi,
    onSuccess: () => {
      toast.success('Password updated successfully')
      setChangePasswordModalOpen(false)
    },
    onError: () => {
      toast.error('Failed to update password')
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

  if (!changePasswordModalOpen) return null

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg w-full max-w-md">

      <form
        onSubmit={handleSubmit(onSubmit)}
        className={isUpdating ? 'opacity-50 pointer-events-none' : ''}
      >
        <FormInput
          name="oldPassword"
          control={control}
          label="Old Password"
          type="password"
          icon={Lock}
          placeholder="Enter your old password"
        />
        <FormInput
          name="newPassword"
          control={control}
          label="New Password"
          type="password"
          icon={Lock}
          placeholder="Enter your new password"
        />
        <FormInput
          name="confirmPassword"
          control={control}
          label="Confirm New Password"
          type="password"
          icon={Lock}
          placeholder="Enter your new password"
        />

        <div className="mt-4 flex justify-end gap-2">
          <Button variant="outline" onClick={() => setChangePasswordModalOpen(false)}>
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

export default ChangePassword
