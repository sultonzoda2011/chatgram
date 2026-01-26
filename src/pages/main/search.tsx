import { searchUserApi } from '@/api/userApi'
import { Input } from '@/components/ui/input/input'
import type { IUser } from '@/types/user'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { Link } from 'react-router-dom'

const SearchPage = () => {
  const [search, setSearch] = useState('')
  const {
    data: usersData,
    isPending: usersPending,
    error: usersError,
  } = useQuery<IUser[]>({
    queryKey: ['users', search],
    queryFn: () => searchUserApi(search),
    enabled: !!search,
  })

  return (
    <div>
      <Input value={search} onChange={(e) => setSearch(e.target.value)} />
      {usersPending && <div>Loading...</div>}
      {usersError && <div>Error!</div>}
      {usersData?.map((user) => (
        <Link
          key={user.id}
          to={`/chat/${user.id}`}
          className="block px-4 py-3 hover:bg-gray-100 transition"
        >
          <h3 className="font-medium">{user.fullname}</h3>
          <p className="text-sm text-gray-500">@{user.username}</p>
        </Link>
      ))}
    </div>
  )
}

export default SearchPage
