import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query'
import { getAnecdotes, updateAnecdote } from '../requests.js'
import { useContext } from 'react'
import NotificationContext from '../contexts/NotificationContext.jsx'

const AnecdoteList = () => {
  const { data: anecdotes } = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
  })
  const queryClient = useQueryClient()
  const voteMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: (updatedAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(
        ['anecdotes'],
        anecdotes.map((a) =>
          a.id !== updatedAnecdote.id ? a : updatedAnecdote
        )
      )
    },
  })
  const [, setNotification] = useContext(NotificationContext)

  const sortedAnecdotes = () => {
    return anecdotes.sort((a, b) => b.votes - a.votes)
  }

  const handleVote = (id) => {
    const anecdote = anecdotes.find((a) => a.id === id)
    const updatedAnecdote = { ...anecdote, votes: anecdote.votes + 1 }
    voteMutation.mutate(
      { id: id, newData: updatedAnecdote },
      {
        onSuccess: () => {
          setNotification(`You voted for "${updatedAnecdote.content}"`)
        },
        onError: (err) => {
          setNotification(err.response.data.error)
        },
      }
    )
  }

  return (
    <>
      {sortedAnecdotes().map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
    </>
  )
}

export default AnecdoteList
