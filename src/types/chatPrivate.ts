export interface IPrivateChatHistory {
  id: string
  userId: string
  userName: string
  message: string
  createdAt: string
  isPrivate: boolean
  receiverUserId: string
  groupName: string
  type: number
  fileUrl: string
  fileName: string
  isEdited: boolean
  editedAt: string
  isDeleted: boolean
  isRead: boolean
  readAt: string
  reactions: {
    id: string
    userId: string
    userName: string
    reaction: string
    createdAt: string
  }
}

export interface IPrivateChatHistoryResponse {
  data: {
    items: IPrivateChatHistory[]
  }
}
