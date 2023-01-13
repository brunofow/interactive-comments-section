import { CommentProps } from '../types/Comment'
import { User } from '../types/User'

export function generateId(comments: CommentProps[]): number {
  if (!comments.length) return 1
  let ids: number[] = []

  comments.map(comment => {
    ids.push(comment.id)

    if (comment.replies?.length) {
      comment.replies.map(replie => {
        ids.push(replie.id)
      })
    }
  })

  const lastIndex = Math.max(...ids)

  return lastIndex + 1
}

export function getCommentIndex(
  comments: CommentProps[],
  commentId: number
): { commentIndex: number; replieIndex?: number } {
  let commentIndex = -1

  comments.map((comment, index) => {
    if (comment.id === commentId) {
      commentIndex = index
    }
  })

  if (commentIndex === -1) {
    let replieIndex = -1
    comments.map((comment, index) => {
      comment.replies.map((replie, replyIndex) => {
        if (replie.id === commentId) {
          commentIndex = index
          replieIndex = replyIndex
        }
      })
    })

    return { commentIndex, replieIndex }
  }

  return { commentIndex }
}

export function buildComment(
  id: number,
  content: string,
  currentUser: User,
  replyingTo?: { originalCommentId: number; targetUsername: string }
): CommentProps {
  const replies: Omit<CommentProps, 'replies'>[] = []
  return {
    id,
    content,
    user: currentUser,
    score: 0,
    replies,
    createdAt: 'now',
    replyingTo
  }
}
