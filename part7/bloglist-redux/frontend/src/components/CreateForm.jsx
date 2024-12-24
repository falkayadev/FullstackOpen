import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import blogService from '../services/blogService'
import useNotify from '../hooks/useNotify'

const CreateForm = ({ user }) => {
  const dispatch = useDispatch()
  const { notify } = useNotify()
  const [inputs, setInputs] = useState({
    title: '',
    author: '',
    url: '',
  })
  const addBlog = async (e) => {
    e.preventDefault()
    const noteObject = {
      title: inputs.title,
      author: inputs.author,
      url: inputs.url,
    }
    try {
      const newBlog = await blogService.create(noteObject)
      notify(
        'success',
        `${user.name} created a new blog titled ${newBlog.title}`,
        5000
      )
      dispatch(createBlog(newBlog))
      setInputs({ title: '', author: '', url: '' })
    } catch (error) {
      notify('error', 'Blog creation failed!', 5000)
    }
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
