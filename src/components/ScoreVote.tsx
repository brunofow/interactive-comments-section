import PlusIcon from '../assets/svg/PlusIcon'
import MinusIcon from '../assets/svg/MinusIcon'
import { useContext, useEffect, useState } from 'react'
import { UserContext } from '../context/UserContext'

interface ScoreVoteProps {
  commentId: number
  score: number
  vertical?: boolean
}

export function ScoreVote({ commentId, score, vertical }: ScoreVoteProps) {
  const { votedComments, addVote, changeVote } = useContext(UserContext)
  const [scoreNumber, setScoreNumber] = useState<number>(score)
  const [plusIconClass, setPlusIconClass] = useState<string>('')
  const [minusIconClass, setMinusIconClass] = useState<string>('')

  function handleVote(type: 'upvote' | 'downvote') {
    const votedComment = votedComments.find(voted => {
      return voted.id === commentId
    })
    if (votedComment && votedComment.type === type) return
    if (votedComment && votedComment.type !== type) {
      changeVote(votedComment)

      type === 'upvote'
        ? setScoreNumber(scoreNumber + 2)
        : setScoreNumber(scoreNumber - 2)

      addVote(commentId, type, true)

      return
    }

    type === 'upvote'
      ? setScoreNumber(scoreNumber + 1)
      : setScoreNumber(scoreNumber - 1)

    addVote(commentId, type)
  }

  useEffect(() => {
    const votedComment = votedComments.find(voted => voted.id === commentId)

    if (votedComment) {
      resetColors()
      votedComment.type === 'upvote'
        ? setPlusIconClass('fill-blue-500')
        : setMinusIconClass('fill-blue-500')
    }
  }, [votedComments])

  function resetColors() {
    setPlusIconClass('')
    setMinusIconClass('')
  }

  return (
    <div
      className={`flex ${
        vertical && 'flex-col'
      } select-none items-center gap-4 bg-gray-100 px-2 py-1 rounded-md fill-blue-50`}
    >
      <button
        onClick={() => handleVote('upvote')}
        className="h-full w-full p-1"
      >
        <PlusIcon className={plusIconClass} />
      </button>
      <span>{scoreNumber}</span>
      <button
        onClick={() => handleVote('downvote')}
        className="h-full w-full p-1"
      >
        <MinusIcon className={minusIconClass} />
      </button>
    </div>
  )
}
