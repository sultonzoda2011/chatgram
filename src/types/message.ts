export interface IChatMessage {
  id: number
  from_user_id: number
  to_user_id: number
  content: string
  date: string
}

export interface IChatMessagesResponse {
  status: string
  message: string
  data: IChatMessage[]
}
