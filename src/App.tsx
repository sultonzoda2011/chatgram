import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import LoginPage from '@/pages/(auth)/login'
import RegisterPage from '@/pages/(auth)/register'
import HomePage from '@/pages/main/home'
import { ProtectedRoute } from '@/components/ui/layout/protectedRoute'
import Layout from '@/components/ui/layout/layout'
import ChatPage from '@/pages/main/chat'
import SearchPage from '@/pages/main/search'
import ProfilePage from '@/pages/main/profile'
import ChatLayout from '@/components/ui/layout/chatLayout'

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
          path: '/',
          element: <ChatLayout />,
          children: [
            {
              path: '/chats',
              element: null, 
            },
            {
              path: '/chat/:id',
              element: <ChatPage />,
            },
          ]
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
