export interface IProfile {
  id: number
  username: string
  fullname: string
  email: string
}
export interface IProfileResponse {
  status: string
  message: string
  data: IProfile
}

export interface IUpdateProfile {
  username: string
  fullname: string
  email: string
}
export interface IUpdateProfileResponse {
  status: string
  message: string
  data: IUpdateProfile
}
export interface IChangePassword {
  oldPassword: string
  newPassword: string
  confirmPassword: string
}
export interface IChangePasswordResponse {
  status: string
  message: string
  data: IChangePassword
}
