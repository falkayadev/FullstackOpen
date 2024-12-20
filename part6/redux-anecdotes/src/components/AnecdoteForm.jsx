import { useDispatch } from 'react-redux'
import { append } from '../reducers/anecdoteReducer'
import useNotification from '../hooks/useNotification'
import anecdoteService from '../services/anecdotes'
const AnecdoteForm = () => {
  const dispatch = useDispatch()
  const notify = useNotification()
  const handleSubmit = async (event) => {
    event.preventDefault()
    const content = event.target.content.value
    event.target.content.value = ''
    anecdoteService
      .createNew(content)
      .then((data) => {
        dispatch(append(data))
        notify(`you created '${content}'`, dispatch)
      })
      .catch(() => notify(`Anecdote creation error!`, dispatch))
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
