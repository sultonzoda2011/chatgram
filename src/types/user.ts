export interface IUser {
  id: number
  username: string
  fullname: string
}

export interface IUserResponse {
  status: string
  message: string
  data: IUser[]
}
