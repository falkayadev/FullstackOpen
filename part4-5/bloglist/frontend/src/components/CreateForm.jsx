import { useState } from 'react'

const CreateForm = ({ createBlog }) => {
  const [inputs, setInputs] = useState({
    title: '',
    author: '',
    url: '',
  })
  const addBlog = async (event) => {
    event.preventDefault()
    createBlog(inputs)
    setInputs({
      title: '',
      author: '',
      url: '',
    })
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
