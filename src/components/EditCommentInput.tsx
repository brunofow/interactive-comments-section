import { useContext, useState } from 'react'
import { CommentContext } from '../context/CommentContext'
import { CommentProps } from '../types/Comment'

interface EditCommentInputProps {
  editingComment: CommentProps
  finishEditing: () => void
}

export function EditCommentInput({
  editingComment,
  finishEditing
}: EditCommentInputProps) {
  const { editComment } = useContext(CommentContext)
  const [content, setContent] = useState<string>(editingComment.content)

  function submitComment() {
    editComment(editingComment, content)

    setContent('')

    finishEditing()

    return
  }

  return (
    <div className="w-full flex flex-col gap-2 bg-white rounded p-4 text-gray-500">
      <textarea
        value={content}
        onChange={e => setContent(e.target.value)}
        className="w-full h-20 border-gray-100 border-2 rounded-md resize-none p-2"
        placeholder="Add a comment..."
      />

      <div className="flex justify-between">
        <button
          onClick={submitComment}
          className="py-2 px-4 bg-blue-500 text-white rounded-md font-bold hover:bg-blue-50 ml-auto"
        >
          UPDATE
        </button>
      </div>
    </div>
  )
}
