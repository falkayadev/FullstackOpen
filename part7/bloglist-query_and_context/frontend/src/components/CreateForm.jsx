import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import useNotify from '../hooks/useNotify'
import blogService from '../services/blogService'

const CreateForm = () => {
  const [inputs, setInputs] = useState({
    title: '',
    author: '',
    url: '',
  })

  const { notify } = useNotify()

  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: blogService.create,
    onSuccess: () => {
      notify(
        'success',
        'USER_NAME created a new blog titled NEWBLOG_TITLE',
        5000
      )
      setInputs({ title: '', author: '', url: '' })
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
    },
    onError: () => {
      notify('error', 'Blog creation failed!', 5000)
    },
  })

  const addBlog = (event) => {
    event.preventDefault()
    mutation.mutate({ ...inputs })
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    setInputs((prevInputs) => ({
      ...prevInputs,
      [name]: value,
    }))
  }
  return (
    <form onSubmit={addBlog}>
      <div>
        <label htmlFor="title">title:</label>
        <input
          type="text"
          name="title"
          data-testid="title"
          value={inputs.title}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="author">author:</label>
        <input
          type="text"
          name="author"
          data-testid="author"
          value={inputs.author}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="url">url:</label>
        <input
          type="text"
          name="url"
          data-testid="url"
          value={inputs.url}
          onChange={handleChange}
        />
      </div>
      <button type="submit">create</button>
    </form>
  )
}
export default CreateForm
