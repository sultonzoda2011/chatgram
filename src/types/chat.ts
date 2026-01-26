export interface IChatItem {
  id: number
  username: string
  fullname: string
  last_message: string
  date: string
}

export interface IChatsResponse {
  status: string
  message: string
  data: IChatItem[]
}
