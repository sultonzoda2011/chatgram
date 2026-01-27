import { useQuery } from '@tanstack/react-query'
import { getProfileApi } from '@/api/profileApi'
import { Loading } from '@/components/ui'
import { ErrorDisplay } from '@/components/ui/error'
import type { IProfile } from '@/types/profile'
import { Mail, User, Edit2, Lock, LogOut } from 'lucide-react'
import UpdateProfile from '@/components/ui/modals/update-profile/modal'
import { useState } from 'react'
import { Button } from '@/components/ui/button/button'
import ChangePassword from '@/components/ui/modals/change-password/modal'
import { useTranslation } from 'react-i18next'
import { motion } from 'motion/react'
import { removeToken } from '@/lib/utils/cookie'
import { useNavigate } from 'react-router-dom'

const ProfilePage = () => {
  const {
    data: profileData,
    isLoading,
    isError,
    refetch,
  } = useQuery<IProfile>({
    queryKey: ['profile'],
    queryFn: getProfileApi,
  })
  const navigate = useNavigate()
  const [changePasswordModalOpen, setChangePasswordModalOpen] = useState(false)
  const [updateProfileModalOpen, setUpdateProfileModalOpen] = useState(false)
  const { t } = useTranslation()

  const getFirstLetter = () => profileData?.fullname?.charAt(0).toUpperCase() || '?'

  const handleLogout = () => {
    removeToken()
    navigate('/login')
  }

  if (isLoading) {
    return <Loading text={t('profile.loading')} className="p-8" />
  }

  if (isError) {
    return (
      <ErrorDisplay
        title={t('profile.errorTitle')}
        message={t('profile.errorDesc')}
        onRetry={() => refetch()}
        className="m-4"
      />
    )
  }

  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0 }}
          className="bg-card rounded-xl border border-border p-6 shadow-sm hover:shadow-md transition-all"
        >
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gradient-to-br from-primary to-chart-2 rounded-lg flex items-center justify-center text-primary-foreground font-bold text-2xl shrink-0">
              {getFirstLetter()}
            </div>

            <div className="flex-1">
              <h1 className="text-2xl font-bold text-foreground">{profileData?.fullname}</h1>
              <p className="text-sm text-muted-foreground">@{profileData?.username}</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex gap-3"
        >
          <Button
            onClick={() => setUpdateProfileModalOpen(true)}
            variant="default"
            size="default"
            className="flex-1 rounded-lg"
          >
            <Edit2 size={18} />
            {t('profile.updateTitle')}
          </Button>
          <Button
            onClick={() => setChangePasswordModalOpen(true)}
            variant="outline"
            size="default"
            className="flex-1 rounded-lg"
          >
            <Lock size={18} />
            {t('profile.changePassword')}
          </Button>
          <Button
            onClick={handleLogout}
            variant="destructive"
            size="default"
            className="flex-1 rounded-lg"
          >
            <LogOut size={18} />
            {t('common.logout') || 'Logout'}
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-3"
        >
          <h2 className="text-lg font-semibold text-foreground px-1">{t('profile.contactInfo')}</h2>

          <div className="bg-card rounded-xl border border-border p-4 shadow-sm hover:shadow-md transition-all">
            <label className="flex items-center gap-2 text-xs text-muted-foreground font-semibold mb-2">
              <User size={14} />
              {t('profile.username')}
            </label>
            <p className="text-foreground text-sm font-medium">@{profileData?.username}</p>
          </div>

          <div className="bg-card rounded-xl border border-border p-4 shadow-sm hover:shadow-md transition-all">
            <label className="flex items-center gap-2 text-xs text-muted-foreground font-semibold mb-2">
              <User size={14} />
              {t('profile.fullname')}
            </label>
            <p className="text-foreground text-sm font-medium">{profileData?.fullname}</p>
          </div>

          <div className="bg-card rounded-xl border border-border p-4 shadow-sm hover:shadow-md transition-all">
            <label className="flex items-center gap-2 text-xs text-muted-foreground font-semibold mb-2">
              <Mail size={14} />
              {t('profile.email')}
            </label>
            <p className="text-foreground text-sm font-medium break-all">{profileData?.email}</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        ></motion.div>
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
