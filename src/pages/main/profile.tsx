import { useQuery } from '@tanstack/react-query'
import { getProfileApi } from '@/api/profileApi'
import type { IProfile } from '@/types/profile'
import { Mail, User, Edit2 } from 'lucide-react'
import UpdateProfile from '@/components/ui/modals/modal'
import { useState } from 'react'
import { Button } from '@/components/ui/button/button'
import ChangePassword from '@/components/ui/modals/change-password/modal'
import LanguageSwitcher from '@/components/ui/languageSwitcher'
import { ModeToggle } from '@/components/mode-toggle'

const ProfilePage = () => {
  const {
    data: profileData,
    isLoading,
    isError,
  } = useQuery<IProfile>({
    queryKey: ['profile'],
    queryFn: getProfileApi,
  })
  const [changePasswordModalOpen, setChangePasswordModalOpen] = useState(false)
  const [updateProfileModalOpen, setUpdateProfileModalOpen] = useState(false)

  const getFirstLetter = () => profileData?.fullname?.charAt(0).toUpperCase() || '?'

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="animate-spin mb-4">
            <div className="w-16 h-16 border-4 border-border border-t-primary rounded-full"></div>
          </div>
          <p className="text-foreground text-lg">Загрузка профиля...</p>
        </div>
      </div>
    )
  }

  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="bg-destructive/20 border border-destructive/50 rounded-2xl p-8 max-w-md text-center">
          <p className="text-destructive text-lg font-semibold">Ошибка загрузки профиля</p>
          <p className="text-destructive/70 text-sm mt-2">Пожалуйста, попробуйте позже</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen p-4 sm:p-8 bg-background text-foreground">
      <div className="max-w-2xl mx-auto space-y-6">
        <LanguageSwitcher />
        <ModeToggle />
        <div className="bg-card rounded-3xl shadow-lg p-8 flex flex-col sm:flex-row items-center gap-6">
          <div className="bg-primary text-background w-32 h-32 rounded-full flex items-center justify-center ring-4 ring-ring shadow-lg shrink-0">
            <span className="text-6xl font-bold text-card-foreground">{getFirstLetter()}</span>
          </div>

          <div className="flex-1 text-center sm:text-left">
            <h1 className="text-4xl font-bold mb-2">{profileData?.fullname}</h1>
            <p className="text-muted-foreground text-lg flex items-center gap-2 justify-center sm:justify-start">
              <User size={18} /> @{profileData?.username}
            </p>
            <Button
              onClick={() => setUpdateProfileModalOpen(true)}
              variant="default"
              size="default"
              className="mt-4"
            >
              <Edit2 size={20} /> Обновить профиль
            </Button>
            <Button
              onClick={() => setChangePasswordModalOpen(true)}
              variant="outline"
              size="default"
              className="mt-4 ml-4"
            >
              Изменить пароль
            </Button>
          </div>
        </div>

        <div className="bg-card rounded-3xl shadow-lg p-8 space-y-6">
          <h2 className="text-2xl font-bold mb-6">Контактная информация</h2>

          <div>
            <label className="text-muted-foreground text-sm font-semibold mb-2 flex items-center gap-2">
              <User size={16} /> Имя пользователя
            </label>
            <div className="bg-popover border border-border rounded-xl p-4 text-foreground text-lg">
              @{profileData?.username}
            </div>
          </div>

          <div>
            <label className="flex gap-2 items-center text-muted-foreground text-sm font-semibold mb-2">
              <User size={16} /> Полное имя
            </label>
            <div className="bg-popover border border-border rounded-xl p-4 text-foreground text-lg">
              {profileData?.fullname}
            </div>
          </div>

          <div>
            <label className="text-muted-foreground text-sm font-semibold mb-2 flex items-center gap-2">
              <Mail size={16} /> Электронная почта
            </label>
            <div className="bg-popover border border-border rounded-xl p-4 text-foreground text-lg break-all">
              {profileData?.email}
            </div>
          </div>
        </div>
      </div>

      <UpdateProfile
        updateProfileModalOpen={updateProfileModalOpen}
        setUpdateProfileModalOpen={setUpdateProfileModalOpen}
      />
      <ChangePassword
        changePasswordModalOpen={changePasswordModalOpen}
        setChangePasswordModalOpen={setChangePasswordModalOpen}
      />
    </div>
  )
}

export default ProfilePage
