import {
  createContext,
  useState,
  useEffect,
  ReactNode,
  useContext
} from 'react'
import data from '../../data.json'
import type { User } from '../types/User'
import { CommentContext } from './CommentContext'

interface UserContextProps {
  currentUser: User
  votedComments: VotedComment[]
  addVote: (
    id: number,
    type: 'upvote' | 'downvote',
    hasChangedVote?: boolean
  ) => void
  changeVote: (voted: VotedComment) => void
}

interface VotedComment {
  id: number
  type: 'upvote' | 'downvote'
}

export const UserContext = createContext({} as UserContextProps)

export function UserProvider({ children }: { children: ReactNode }) {
  const { voteComment } = useContext(CommentContext)
  const [currentUser, setCurrentUser] = useState<User>({} as User)
  const [votedComments, setVotedComments] = useState<VotedComment[]>(
    [] as VotedComment[]
  )

  useEffect(() => {
    const savedUser = localStorage.getItem('user')
    if (savedUser && JSON.parse(savedUser).length) {
      setCurrentUser(JSON.parse(savedUser))
    } else {
      setCurrentUser(data.currentUser)
    }

    const savedVotes = localStorage.getItem('votedComments')
    if (savedVotes && JSON.parse(savedVotes).length) {
      setVotedComments(JSON.parse(savedVotes))
    }
  }, [])

  useEffect(() => {
    if (votedComments.length) {
      localStorage.setItem('votedComments', JSON.stringify(votedComments))
    }
  }, [votedComments])

  function addVote(
    id: number,
    type: 'upvote' | 'downvote',
    hasChangedVote?: boolean
  ) {
    setVotedComments([
      ...votedComments,
      {
        id,
        type
      }
    ])

    voteComment(id, type, hasChangedVote)
  }

  function changeVote(voted: VotedComment) {
    const removeIndex = votedComments.indexOf(voted)
    let votedArr = votedComments.splice(removeIndex, 1)

    setVotedComments([...votedArr])
  }

  return (
    <UserContext.Provider
      value={{
        currentUser,
        votedComments,
        addVote,
        changeVote
      }}
    >
      {children}
    </UserContext.Provider>
  )
}
