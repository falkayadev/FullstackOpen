import { useQueryClient } from '@tanstack/react-query'

const AnecdoteList = () => {
  const queryClient = useQueryClient()
  const anecdotes = queryClient.getQueryData(['anecdotes'])

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
