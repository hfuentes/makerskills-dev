import { User } from './user'

export class Comment {
  id: string
  email: string
  name: string
  comment: string
  createdAt: Date
  constructor(data?: any) {
    if (!data) return
    this.id = data.id
    this.email = data.email
    this.name = data.name
    this.comment = data.comment
    this.createdAt = data.createdAt
  }
}

export class CommentForm {
  user: User
  comment: string
  constructor(data?: any) {
    if (!data) return
    this.user = data.user
    this.comment = data.comment
  }
}
