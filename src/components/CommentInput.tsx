import { useContext, useState } from 'react'
import { UserContext } from '../context/UserContext'
import { CommentContext } from '../context/CommentContext'
import { buildComment, generateId } from '../utils/CommentUtils'

export function CommentInput() {
  const { currentUser } = useContext(UserContext)
  const { comments, addComment } = useContext(CommentContext)
  const [content, setContent] = useState<string>('')

  function submitComment() {
    const comment = buildComment(generateId(comments), content, currentUser)

    addComment(comment)

    setContent('')
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
        <img src={currentUser.image?.png} className="w-10" />

        <button
          onClick={submitComment}
          className="py-2 px-4 bg-blue-500 text-white rounded-md font-bold hover:bg-blue-50 ml-auto"
        >
          SEND
        </button>
      </div>
    </div>
  )
}
