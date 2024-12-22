import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createAnecdote } from '../requests.js'
import { useContext } from 'react'
import NotificationContext from '../contexts/NotificationContext.jsx'
const AnecdoteForm = () => {
  const [, setNotification] = useContext(NotificationContext)
  const queryClient = useQueryClient()
  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], anecdotes.concat(newAnecdote))
      setNotification(`a new anecdote "${newAnecdote.content}" created!`)
    },
  })
  const handleSubmit = async (event) => {
    event.preventDefault()
    console.log('submit')
    const content = event.target.content.value
    event.target.content.value = ''
    newAnecdoteMutation.mutate({ content: content, votes: 0 })
  }
  return (
    <>
      <h2>create new</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input name="content" />
        </div>
        <button>create</button>
      </form>
    </>
  )
}

export default AnecdoteForm
