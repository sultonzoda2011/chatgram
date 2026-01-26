import { api } from '@/lib/utils/axiosConfig'
import type {
  IChangePassword,
  IChangePasswordResponse,
  IProfileResponse,
  IUpdateProfile,
  IUpdateProfileResponse,
} from '@/types/profile'

export const getProfileApi = async () => {
  try {
    const response = await api.get<IProfileResponse>('/auth/profile')
    return response.data.data
  } catch (error) {
    console.error('Failed to fetch profile:', error)
    throw error
  }
}

export const updateProfileApi = async (data: IUpdateProfile) => {
  try {
    const response = await api.post<IUpdateProfileResponse>('/auth/profile/update', data)
    return response.data.data
  } catch (error) {
    console.error('Failed to fetch profile:', error)
    throw error
  }
}

export const changePasswordApi = async (data: IChangePassword) => {
  try {
    const response = await api.post<IChangePasswordResponse>('/auth/profile/change-password', data)
    return response.data.data
  } catch (error) {
    console.error('Failed to change password:', error)
    throw error
  }
}
