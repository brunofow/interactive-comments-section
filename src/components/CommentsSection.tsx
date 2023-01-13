import { useContext } from 'react'
import { Comment } from './Comment'
import { CommentsContainer } from './CommentsContainer'
import { CommentInput } from './CommentInput'
import { CommentContext } from '../context/CommentContext'

export function CommentsSection() {
  const { comments } = useContext(CommentContext)

  return (
    <div className="w-full md:w-2/3 mx-auto">
      <CommentsContainer>
        {comments.length ? (
          comments.map(comment => {
            return (
              <div key={comment.id}>
                <Comment {...comment} />
                {!!comment.replies?.length && (
                  <CommentsContainer isReplies={true}>
                    {comment.replies.map(replie => {
                      return <Comment key={replie.id} {...replie} />
                    })}
                  </CommentsContainer>
                )}
              </div>
            )
          })
        ) : (
          <h2>Loading...</h2>
        )}

        <CommentInput />
      </CommentsContainer>
    </div>
  )
}
