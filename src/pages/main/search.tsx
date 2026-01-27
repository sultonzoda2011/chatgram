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
    staleTime: 5 * 60 * 1000, // 5 минут
    gcTime: 10 * 60 * 1000, // 10 минут (раньше был cacheTime)
  })

  return (
    <div className="h-full flex flex-col bg-background">
      <div className="p-4 space-y-4 sticky top-15 z-40 bg-background border-b border-border">
        <div className="relative">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
            size={20}
          />
          <Input
            value={search}
            placeholder="Search users..."
            onChange={(e) => setSearch(e.target.value)}
            className="pl-12 pr-12 py-6 text-base bg-accent/50 border-0 rounded-2xl"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        {!search && (
          <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
            <div className="w-20 h-20 rounded-full bg-linear-to-br from-accent to-secondary flex items-center justify-center">
              <Search size={40} className="text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-1">Search for users</h3>
              <p className="text-sm text-muted-foreground">Find people to start a conversation</p>
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
            <div className="text-muted-foreground">
              <p>No users found for "{search}"</p>
            </div>
          </div>
        )}

        {!usersPending && usersData.length > 0 && (
          <div className="space-y-4">
            {usersData.map((user, index) => (
              <motion.div
                key={user.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
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
