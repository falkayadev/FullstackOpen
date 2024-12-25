import axios from 'axios'
const baseUrl = '/api/users'

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

export default { getAll }
