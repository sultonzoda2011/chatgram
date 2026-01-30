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
      <div className="flex-1 overflow-y-auto p-4 space-y-6 max-w-5xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="bg-card/60 backdrop-blur-xl rounded-3xl border border-border/50 p-8 shadow-2xl relative overflow-hidden group"
        >
          <motion.div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-colors duration-500" />

          <div className="relative z-10 flex flex-col items-center text-center">
            <div className="relative mb-4">
              <div className="w-24 h-24 bg-primary rounded-3xl flex items-center justify-center text-primary-foreground font-black text-4xl shadow-2xl  transition-transform duration-300">
                {getFirstLetter()}
              </div>
            </div>

            <h1 className="text-3xl font-black text-foreground tracking-tight mb-1">
              {profileData?.fullname}
            </h1>
            <p className="text-chart-1 font-bold tracking-widest uppercase text-xs">
              @{profileData?.username}
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-3 gap-3"
        >
          <Button className='bg-primary hover:bg-primary/80 text-white' onClick={() => setUpdateProfileModalOpen(true)}>
            <Edit2 size={20} className="group-hover:scale-110 transition-transform" />
            <span className="text-[10px] font-bold uppercase tracking-tighter">
              {t('profile.updateTitle')}
            </span>
          </Button>
          <Button className='bg-blue-500 hover:bg-blue-600 text-white' onClick={() => setChangePasswordModalOpen(true)}>
            <Lock size={20} className="group-hover:scale-110 transition-transform" />
            <span className="text-[10px] font-bold uppercase tracking-tighter">
              {t('profile.changePassword')}
            </span>
          </Button>
          <Button onClick={handleLogout} className='bg-red-500 hover:bg-red-600 text-white' variant="outline">
            <LogOut size={20} className="group-hover:scale-110 transition-transform" />
            <span className="text-[10px] font-bold uppercase tracking-tighter">
              {t('common.logout') }
            </span>
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-4"
        >
          <h2 className="text-sm font-black text-chart-1 uppercase tracking-[0.2em] px-2">
            {t('profile.contactInfo')}
          </h2>

          <div className="grid gap-3">
            {[
              { label: t('profile.username'), value: `@${profileData?.username}`, icon: User },
              { label: t('profile.fullname'), value: profileData?.fullname, icon: User },
              { label: t('profile.email'), value: profileData?.email, icon: Mail },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-card/60 backdrop-blur-md rounded-2xl border border-border/50 p-4 shadow-sm hover:border-primary/30 transition-all duration-300 group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                    <item.icon size={18} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-chart-1 uppercase tracking-widest mb-0.5">
                      {item.label}
                    </p>
                    <p className="text-sm font-bold text-foreground break-all">{item.value}</p>
                  </div>
                </div>
              </div>
            ))}
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
