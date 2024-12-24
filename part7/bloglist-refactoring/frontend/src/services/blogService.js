import axios from 'axios'
const baseUrl = '/api/blogs'

// axios interceptors for adding token to requests
axios.interceptors.request.use(
  (config) => {
    const user = localStorage.getItem('user')
    if (user) {
      config.headers.Authorization = `Bearer ${JSON.parse(user).token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async (newBlog) => {
  const response = await axios.post(baseUrl, newBlog)
  return response.data
}

const update = async (id, updatedBlog) => {
  const response = await axios.put(`${baseUrl}/${id}`, updatedBlog)
  return response.data
}

const remove = async (id) => {
  await axios.delete(`${baseUrl}/${id}`)
}

export default { getAll, create, update, remove }
