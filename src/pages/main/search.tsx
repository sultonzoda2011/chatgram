import { searchUserApi } from '@/api/userApi'
import { Loading } from '@/components/ui'
import { ErrorDisplay } from '@/components/ui/error'
import { Input } from '@/components/ui/input/input'
import UserItem from '@/components/ui/userItem'
import type { IUser } from '@/types/user'
import { useQuery } from '@tanstack/react-query'
import { Search } from 'lucide-react'
import { motion } from 'motion/react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

const SearchPage = () => {
  const { t } = useTranslation()
  const [search, setSearch] = useState('')

  const {
    data: usersData = [],
    isPending: usersPending,
    error: usersError,
    refetch,
  } = useQuery<IUser[]>({
    queryKey: ['users', search],
    queryFn: () => searchUserApi(search),
    enabled: search.length > 0,
    staleTime: 5 * 60 * 1000, 
    gcTime: 10 * 60 * 1000,
  })

  return (
    <div className="h-full flex flex-col max-w-5xl mx-auto w-full">
      <div className="p-4 bg-background/40 backdrop-blur-md sticky top-0 z-40 border-b border-border/50">
        <div className="relative group">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-chart-1 group-focus-within:text-primary transition-colors duration-200"
            size={20}
          />
          <Input
            value={search}
            placeholder={t('search.placeholder') || "Search for people..."}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-12 bg-card/60 border-border/50 rounded-2xl h-12 focus:ring-primary/20 focus:border-primary/30 transition-all duration-300 shadow-sm"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        {!search && (
          <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="w-24 h-24 rounded-3xl bg-linear-to-br from-primary/20 to-chart-2/20 flex items-center justify-center border border-primary/20"
            >
              <Search size={48} className="text-primary" />
            </motion.div>
            <div>
              <h3 className="text-xl font-bold text-foreground mb-1">{t('search.startTitle') || 'Find New Friends'}</h3>
              <p className="text-chart-1 font-medium max-w-62.5">{t('search.startDesc') || 'Search by username or name to start a conversation'}</p>
            </div>
          </div>
        )}

        {usersPending && search && <Loading text={t('common.loading')} className="p-8" />}

        {usersError && (
          <ErrorDisplay
            title={t('common.error')}
            error={usersError}
            onRetry={() => refetch()}
            className="m-4"
          />
        )}

        {!usersPending && usersData.length === 0 && search && (
          <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-destructive/10 flex items-center justify-center">
              <Search size={32} className="text-destructive" />
            </div>
            <p className="text-chart-1 font-medium">No users found for "{search}"</p>
          </div>
        )}

        {!usersPending && usersData.length > 0 && (
          <div className="space-y-3">
            {usersData.map((user, index) => (
              <motion.div
                key={user.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 30,
                  delay: index * 0.05
                }}
              >
                <UserItem index={index} user={user} />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default SearchPage
