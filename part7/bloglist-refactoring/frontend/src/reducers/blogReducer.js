const reducer = (state = [], action) => {
  switch (action.type) {
    case 'CREATE':
      return [...state, action.payload]
    case 'UPDATE':
      return state.map((blog) =>
        blog.id === action.payload.id ? action.payload : blog
      )
    case 'DELETE':
      return state.filter((blog) => blog.id !== action.payload.id)
    case 'SET':
      return action.payload
    default:
      return state
  }
}

export const createBlog = (blog) => {
  return {
    type: 'CREATE',
    payload: blog,
  }
}

export const updateBlog = (updatedBlog) => {
  return {
    type: 'UPDATE',
    payload: updatedBlog,
  }
}

export const deleteBlog = (id) => {
  return {
    type: 'DELETE',
    payload: { id },
  }
}

export const setBlogs = (blogs) => {
  return {
    type: 'SET',
    payload: blogs,
  }
}

export default reducer
