import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import FilterForm from './components/FilterForm'
import { useQuery } from '@tanstack/react-query'
import { getAnecdotes } from './requests.js'

const App = () => {
  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    retry: false,
  })

  if (result.isLoading) return <div>loading data...</div>
  if (result.isError) return <div>anecdote service not available</div>
  return (
    <div>
      <h2>Anecdotes</h2>
      <FilterForm />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}

export default App
