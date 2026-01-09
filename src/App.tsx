// App.tsx
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './layout/layout'
import LoginPage from '@/pages/(auth)/login'
import RegisterPage from '@/pages/(auth)/register'
import { ProtectedRoute } from '@/layout/protectedRoute'
import HomePage from '@/pages/main/home'

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
