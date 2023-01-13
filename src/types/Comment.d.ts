export interface CommentProps {
  id: number
  content: string
  createdAt: string
  score: number
  user: User
  replies: Omit<CommentProps, 'replies', 'replyingTo'>[]
  replyingTo?: { originalCommentId: number; targetUsername: string }
}
