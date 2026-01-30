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
  const { data: profileData, isLoading, isError, refetch } = useQuery<IProfile>({
    queryKey: ['profile'],
    queryFn: getProfileApi,
  })

  const navigate = useNavigate()
  const { t } = useTranslation()

  const [changePasswordModalOpen, setChangePasswordModalOpen] = useState(false)
  const [updateProfileModalOpen, setUpdateProfileModalOpen] = useState(false)

  const getFirstLetter = () =>
    profileData?.fullname?.charAt(0).toUpperCase() || '?'

  const handleLogout = () => {
    removeToken()
    navigate('/login')
  }

  if (isLoading) {
    return <Loading text={t('profile.loading')} className="p-10" />
  }

  if (isError) {
    return (
      <ErrorDisplay
        title={t('profile.errorTitle')}
        message={t('profile.errorDesc')}
        onRetry={() => refetch()}
        className="m-6"
      />
    )
  }

  return (
    <div className="min-h-full flex flex-col px-1 sm:px-6 lg:px-8">
      <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-8 sm:py-8 lg:px-0">
        <div className="mx-auto w-full max-w-6xl space-y-8">

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', stiffness: 260, damping: 25 }}
            className="relative overflow-hidden
                       rounded-2xl sm:rounded-3xl
                       bg-card/60 backdrop-blur-xl
                       border border-border/50
                       p-6 sm:p-8 lg:p-10
                       shadow-xl"
          >
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/10 rounded-full blur-3xl" />

            <div className="relative z-10 flex flex-col items-center text-center gap-4 sm:gap-5">
              <div
                className="w-24 h-24 sm:w-28 sm:h-28
                           rounded-2xl sm:rounded-3xl
                           bg-primary flex items-center justify-center
                           text-primary-foreground
                           text-4xl sm:text-5xl
                           font-black shadow-xl"
              >
                {getFirstLetter()}
              </div>

              <div>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black">
                  {profileData?.fullname}
                </h1>
                <p className="text-xs sm:text-sm text-chart-1 font-bold tracking-widest uppercase mt-1">
                  @{profileData?.username}
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-4"
          >
            <Button
              className="bg-primary hover:bg-primary/80 text-white flex gap-2 py-6"
              onClick={() => setUpdateProfileModalOpen(true)}
            >
              <Edit2 size={18} />
              <span className="text-xs font-bold uppercase">
                {t('profile.updateTitle')}
              </span>
            </Button>

            <Button
              className="bg-blue-500 hover:bg-blue-600 text-white flex gap-2 py-6"
              onClick={() => setChangePasswordModalOpen(true)}
            >
              <Lock size={18} />
              <span className="text-xs font-bold uppercase">
                {t('profile.changePassword')}
              </span>
            </Button>

            <Button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white flex gap-2 py-6"
            >
              <LogOut size={18} />
              <span className="text-xs font-bold uppercase">
                {t('common.logout')}
              </span>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-4"
          >
            <h2 className="text-xs sm:text-sm font-black text-chart-1 uppercase tracking-[0.25em] px-1">
              {t('profile.contactInfo')}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { label: t('profile.username'), value: `@${profileData?.username}`, icon: User },
                { label: t('profile.fullname'), value: profileData?.fullname, icon: User },
                { label: t('profile.email'), value: profileData?.email, icon: Mail },
              ].map((item, i) => (
                <div
                  key={i}
                  className="rounded-xl sm:rounded-2xl
                             bg-card/60 backdrop-blur-md
                             border border-border/50
                             p-5 sm:p-6
                             shadow-sm
                             hover:border-primary/30 transition"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className="w-11 h-11 rounded-xl
                                 bg-primary/5
                                 flex items-center justify-center
                                 text-primary"
                    >
                      <item.icon size={18} />
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-chart-1">
                        {item.label}
                      </p>
                      <p className="text-sm font-bold break-all mt-0.5">
                        {item.value}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
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
