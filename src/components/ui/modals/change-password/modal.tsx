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

        <div className="mt-4 flex justify-end gap-2">
          <Button variant="outline" onClick={() => setChangePasswordModalOpen(false)}>
            {t('common.cancel')}
          </Button>
          <Button type="submit" isPending={isUpdating}>
            {t('password.updateButton')}
          </Button>
        </div>
      </form>
    </div>
  )
}

export default ChangePassword
