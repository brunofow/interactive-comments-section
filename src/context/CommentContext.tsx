import { createContext, ReactNode, useState, useEffect } from 'react'
import data from '../../data.json'
import { DeleteModal } from '../components/DeleteModal'
import type { CommentProps } from '../types/Comment'
import { User } from '../types/User'
import {
  buildComment,
  generateId,
  getCommentIndex
} from '../utils/CommentUtils'

interface CommentContextProps {
  comments: CommentProps[]
  addComment: (comment: CommentProps) => void
  deleteComment: (id: number) => void
  editComment: (editingComment: CommentProps, newContent: string) => void
  replyComment: (
    replyingComment: CommentProps,
    content: string,
    currentUser: User
  ) => void
  openDeleteModal: (deleteCommentId: number) => void
  voteComment: (
    commentId: number,
    type: 'upvote' | 'downvote',
    hasChangedVote?: boolean
  ) => void
}

export const CommentContext = createContext({} as CommentContextProps)

export function CommentProvider({ children }: { children: ReactNode }) {
  const [comments, setComments] = useState<CommentProps[]>([] as CommentProps[])
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [actualDeleteId, setActualDeleteId] = useState<number | null>(null)

  useEffect(() => {
    const savedComments = localStorage.getItem('comments')
    if (savedComments && JSON.parse(savedComments).length) {
      setComments(JSON.parse(savedComments))

      return
    }
    setComments(data.comments)
  }, [])

  useEffect(() => {
    if (comments.length) {
      localStorage.setItem('comments', JSON.stringify(comments))
    }
  }, [comments])

  function addComment(comment: CommentProps) {
    setComments([...comments, comment])
  }

  function deleteComment(id: number) {
    let commentsArr = comments
    let filteredComment = comments.filter(comment => {
      return comment.id === id
    })

    if (!filteredComment.length) {
      let originalCommentIndex = 0
      let filteredReply = {} as Omit<CommentProps, 'replies'>
      comments.map((comment, index) => {
        comment.replies?.map(replie => {
          if (replie.id === id) {
            originalCommentIndex = index
            filteredReply = replie
          }
        })
      })

      const removeId =
        commentsArr[originalCommentIndex].replies!.indexOf(filteredReply)
      commentsArr[originalCommentIndex].replies?.splice(removeId, 1)
      setComments([...commentsArr])
      return
    }

    const removeId = commentsArr.indexOf(filteredComment[0])
    commentsArr.splice(removeId, 1)
    setComments([...commentsArr])
  }

  function editComment(editingComment: CommentProps, newContent: string) {
    let commentsArr = comments
    let replaceIndex: number | null = null
    comments.map((comment, index) => {
      if (comment.id === editingComment.id) {
        replaceIndex = index
      }
    })

    if (!replaceIndex) {
      let originalCommentIndex = 0
      let replieReplaceIndex = 0
      comments.map(({ replies }, commentIndex) => {
        replies?.map((replie, replieIndex) => {
          if (replie.id === editingComment.id) {
            replieReplaceIndex = replieIndex
            originalCommentIndex = commentIndex
          }
        })
      })

      commentsArr = comments
      commentsArr[originalCommentIndex].replies![replieReplaceIndex] = {
        ...editingComment,
        content: newContent
      }

      setComments([...commentsArr])
      return
    }

    commentsArr[replaceIndex] = {
      ...editingComment,
      content: newContent
    }

    setComments([...commentsArr])
  }

  function replyComment(
    replyingComment: CommentProps,
    content: string,
    currentUser: User
  ) {
    const replyingTo = {
      originalCommentId: replyingComment.id,
      targetUsername: replyingComment.user.username
    }
    let commentsArr = comments
    const newComment = buildComment(
      generateId(comments),
      content,
      currentUser,
      replyingTo
    )

    if (replyingComment.replyingTo) {
      const { commentIndex: originalCommentIndex } = getCommentIndex(
        comments,
        replyingComment.replyingTo.originalCommentId
      )
      commentsArr[originalCommentIndex].replies.push(newComment)

      setComments([...commentsArr])

      return
    }

    const { commentIndex: originalCommentIndex } = getCommentIndex(
      comments,
      replyingComment.id
    )

    commentsArr[originalCommentIndex].replies.push(newComment)

    setComments([...commentsArr])
  }

  function voteComment(
    commentId: number,
    type: 'upvote' | 'downvote',
    hasChangedVote?: boolean
  ) {
    const voteValue = hasChangedVote ? 2 : 1
    let commentsArr = comments
    const { commentIndex, replieIndex } = getCommentIndex(comments, commentId)
    if (replieIndex) {
      commentsArr[commentIndex].replies[replieIndex].score +=
        type === 'upvote' ? voteValue : -voteValue
      setComments([...commentsArr])

      return
    }

    commentsArr[commentIndex].score +=
      type === 'upvote' ? voteValue : -voteValue
    setComments([...commentsArr])
  }

  function openDeleteModal(deleteCommentId: number) {
    setActualDeleteId(deleteCommentId)
    setIsModalOpen(true)
  }

  function closeModal() {
    setIsModalOpen(false)
  }

  return (
    <CommentContext.Provider
      value={{
        comments,
        addComment,
        deleteComment,
        editComment,
        replyComment,
        openDeleteModal,
        voteComment
      }}
    >
      <>
        {children}
        {isModalOpen && (
          <DeleteModal
            deleteCommentId={actualDeleteId}
            closeModalFunction={closeModal}
          />
        )}
      </>
    </CommentContext.Provider>
  )
}
