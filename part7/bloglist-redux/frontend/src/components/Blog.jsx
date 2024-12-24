import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { deleteBlog, updateBlog } from '../reducers/blogReducer'
import { useDispatch } from 'react-redux'
import blogService from '../services/blogService'
import useNotify from '../hooks/useNotify'

const Blog = ({ blog, user }) => {
  const dispatch = useDispatch()
  const [isExpanded, setIsExpanded] = useState(false)
  const [hasRight, setHasRight] = useState(false)
  const { notify } = useNotify()

  const like = async () => {
    const votedBlog = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
    }
    try {
      const updatedBlog = await blogService.update(blog.id, votedBlog)
      dispatch(updateBlog(updatedBlog))
    } catch (error) {
      notify('error', 'Blog update failed!', 5000)
    }
  }

  const remove = async () => {
    const confirmation = window.confirm('Delete blog?')
    if (confirmation) {
      try {
        await blogService.remove(blog.id)
        dispatch(deleteBlog(blog.id))
      } catch (error) {
        notify('error', 'Blog deletion failed!', 5000)
      }
    }
  }

  useEffect(() => {
    if (user?.username === blog?.user?.username) {
      console.log(user.username, blog.user.username)
      setHasRight(true)
    } else {
      setHasRight(false)
    }
  }, [user, blog])

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }
  const blogRow = { display: 'flex', gap: '10px' }
  return (
    <li style={blogStyle} className="blog">
      <div style={blogRow}>
        <p>
          <span data-testid="title-content">{blog.title}</span> by{' '}
          <span>{blog.author}</span>
        </p>
        <button
          onClick={() => {
            setIsExpanded(!isExpanded)
          }}
        >
          {isExpanded ? 'hide' : 'view'}
        </button>
      </div>
      {isExpanded && (
        <div>
          <p>{blog.url}</p>
          <div style={blogRow}>
            <p>
              <span>likes</span> <span>{blog.likes}</span>
            </p>
            <button onClick={like}>like</button>
          </div>
          {hasRight && <button onClick={remove}>remove</button>}
        </div>
      )}
    </li>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
}

export default Blog
