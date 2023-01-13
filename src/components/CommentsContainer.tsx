import { ReactNode } from 'react'

interface CommentsContainerProps {
  isReplies?: boolean
  children: ReactNode
}

export function CommentsContainer({
  isReplies,
  children
}: CommentsContainerProps) {
  return (
    <div
      className={`flex flex-col gap-4 relative ${
        isReplies ? 'pl-4 mt-4' : 'p-2'
      }`}
    >
      {isReplies && (
        <span className="w-[2px] bg-gray-100 absolute left-0 top-0 bottom-0"></span>
      )}
      {children}
    </div>
  )
}
