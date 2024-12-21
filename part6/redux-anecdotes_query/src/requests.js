import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

export const getAnecdotes = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

export const createAnecdote = async (newData) => {
  const response = await axios.post(baseUrl, newData)
  return response.data
}

export const updateAnecdote = async ({ id, newData }) => {
  const response = await axios.put(`${baseUrl}/${id}`, newData)
  return response.data
}
