import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import LoginPage from '@/pages/(auth)/login'
import RegisterPage from '@/pages/(auth)/register'
import HomePage from '@/pages/main/home'
import { ProtectedRoute } from '@/components/ui/layout/protectedRoute'
import Layout from '@/components/ui/layout/layout'
import ChatPage from '@/pages/main/chat'
import SearchPage from '@/pages/main/search'
import ChatsPage from '@/pages/main/chats'
import ProfilePage from '@/pages/main/profile'

const App = () => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: (
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      ),
      children: [
        {
          path: '/',
          element: <HomePage />,
        },
        {
          path: '/chats',
          element: <ChatsPage />,
        },

        {
          path: '/search',
          element: <SearchPage />,
        },
        {
          path: '/profile',
          element: <ProfilePage />,
        },
      ],
    },
    {
      path: '/chat/:id',
      element: <ChatPage />,
    },
    {
      path: '/login',
      element: <LoginPage />,
    },
    {
      path: '/register',
      element: <RegisterPage />,
    },
  ])

  return <RouterProvider router={router} />
}

export default App
