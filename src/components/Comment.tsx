import type { CommentProps } from '../types/Comment'
import { ReplyIcon, EditIcon, DeleteIcon } from '../assets/svg'
import { ScoreVote } from './ScoreVote'
import { useContext, useState } from 'react'
import { UserContext } from '../context/UserContext'
import { ActionButton } from './ActionButton'
import { CommentContext } from '../context/CommentContext'
import { EditCommentInput } from './EditCommentInput'
import { ReplyCommentInput } from './ReplyCommentInput'
import { useWindowSize } from '../hooks/useWindowSize'

export function Comment(comment: CommentProps) {
  const { currentUser } = useContext(UserContext)
  const { openDeleteModal } = useContext(CommentContext)
  const isCurrentUser = currentUser.username === comment.user.username
  const [isEditing, setIsEditing] = useState<boolean>(false)
  const [isReplying, setIsReplying] = useState<boolean>(false)
  const [_, isMobile] = useWindowSize()

  function finishEditing() {
    setIsEditing(false)
  }

  function finishReplying() {
    setIsReplying(false)
  }

  return (
    <>
      <div className="w-full flex gap-4 bg-white rounded p-4 text-gray-500 relative">
        {!isMobile && (
          <ScoreVote
            commentId={comment.id}
            score={comment.score}
            vertical={true}
          />
        )}
        <div className="w-full flex flex-col gap-2">
          <div className="flex items-center gap-4">
            <img src={comment.user.image.png} className="w-10" />
            <h4 className="text-gray-700 font-bold">{comment.user.username}</h4>
            {isCurrentUser && (
              <span className="bg-blue-500 text-white rounded-md px-1">
                you
              </span>
            )}
            <span>{comment.createdAt}</span>

            {!isMobile && (
              <div className="flex justify-between text-blue-500 font-bold ml-auto">
                {isCurrentUser ? (
                  <div className="flex items-center gap-4">
                    <ActionButton
                      onClick={() => openDeleteModal(comment.id)}
                      color="red"
                    >
                      <DeleteIcon /> Delete
                    </ActionButton>
                    <ActionButton onClick={() => setIsEditing(true)}>
                      <EditIcon /> Edit
                    </ActionButton>
                  </div>
                ) : (
                  <ActionButton onClick={() => setIsReplying(true)}>
                    <ReplyIcon /> Reply
                  </ActionButton>
                )}
              </div>
            )}
          </div>
          {isEditing ? (
            <EditCommentInput
              editingComment={comment}
              finishEditing={finishEditing}
            />
          ) : (
            <p>
              {comment.replyingTo && (
                <span className="text-blue-500 font-bold mr-1 select-none">
                  @{comment.replyingTo.targetUsername}
                </span>
              )}
              {comment.content}
            </p>
          )}
          {isMobile && (
            <div className="flex justify-between text-blue-500 font-bold">
              <ScoreVote score={comment.score} commentId={comment.id} />
              {isCurrentUser ? (
                <div className="flex items-center gap-4">
                  <ActionButton
                    onClick={() => openDeleteModal(comment.id)}
                    color="red"
                  >
                    <DeleteIcon /> Delete
                  </ActionButton>
                  <ActionButton onClick={() => setIsEditing(true)}>
                    <EditIcon /> Edit
                  </ActionButton>
                </div>
              ) : (
                <ActionButton onClick={() => setIsReplying(true)}>
                  <ReplyIcon /> Reply
                </ActionButton>
              )}
            </div>
          )}
        </div>
      </div>

      {isReplying && (
        <ReplyCommentInput
          replyingComment={comment}
          finishReplying={finishReplying}
        />
      )}
    </>
  )
}
