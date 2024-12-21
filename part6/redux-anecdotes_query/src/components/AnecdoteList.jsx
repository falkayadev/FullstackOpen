import { useQuery } from '@tanstack/react-query'
import { getAnecdotes } from '../requests.js'

const AnecdoteList = () => {
  const { data: anecdotes } = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
  })

  return (
    <>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button>vote</button>
          </div>
        </div>
      ))}
    </>
  )
}

export default AnecdoteList
