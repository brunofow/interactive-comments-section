import { useContext } from 'react'
import { Button } from './Button'
import { CommentContext } from '../context/CommentContext'

interface Props {
  deleteCommentId: number | null
  closeModalFunction: () => void
}

export function DeleteModal({ deleteCommentId, closeModalFunction }: Props) {
  const { deleteComment } = useContext(CommentContext)

  function handleConfirm() {
    if (deleteCommentId) {
      deleteComment(deleteCommentId)
      closeModalFunction()
    }
    closeModalFunction()
  }

  return (
    <div className="fixed top-0 left-0 bottom-0 right-0 flex items-center justify-center bg-black bg-opacity-50 p-2">
      <div className="flex flex-col gap-4 bg-white rounded-md p-4 text-gray-500">
        <h3 className="text-lg font-bold text-gray-500">Delete comment</h3>
        <p>
          Are you sure you want to delete this comment? This will remove the
          comment and can't be undone.
        </p>

        <div className="w-full grid grid-cols-2 gap-4 uppercase">
          <Button
            onClick={closeModalFunction}
            className="bg-gray-500 hover:bg-gray-100 hover:text-gray-500"
          >
            No, cancel
          </Button>
          <Button
            onClick={handleConfirm}
            className="bg-red-500 hover:bg-red-50"
          >
            Yes, delete
          </Button>
        </div>
      </div>
    </div>
  )
}
