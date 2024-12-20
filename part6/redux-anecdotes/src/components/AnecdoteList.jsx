import { useSelector, useDispatch } from 'react-redux'
const AnecdoteList = () => {
  const anecdotes = useSelector((state) => state.anecdotes)
  const filter = useSelector((state) => state.filter)
  const dispatch = useDispatch()

  const getFilteredAnecdotes = () => {
    if (filter === '') return [...anecdotes].sort((a, b) => b.votes - a.votes)
    return anecdotes
      .filter((anecdote) =>
        anecdote.content.toLowerCase().includes(filter.toLowerCase())
      )
      .sort((a, b) => b.votes - a.votes)
  }
  return (
    <>
      {getFilteredAnecdotes().map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button
              onClick={() =>
                dispatch({ type: 'anecdote/vote', payload: anecdote.id })
              }
            >
              vote
            </button>
          </div>
        </div>
      ))}
    </>
  )
}

export default AnecdoteList
