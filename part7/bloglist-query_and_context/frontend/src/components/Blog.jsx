import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import blogService from '../services/blogService'

const Blog = ({ blog, user }) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const [hasRight, setHasRight] = useState(false)

  const queryClient = useQueryClient()

  const likeMutation = useMutation({
    mutationFn: ({ id, updatedBlog }) => blogService.update(id, updatedBlog),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
    },
  })
  const like = () => {
    const updatedBlog = {
      author: blog.author,
      url: blog.url,
      title: blog.title,
      likes: blog.likes + 1,
    }
    likeMutation.mutate({ id: blog.id, updatedBlog })
  }

  const removeMutation = useMutation({
    mutationFn: blogService.remove,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
    },
  })

  const remove = (id) => {
    const confirmation = window.confirm('Delete blog?')
    if (confirmation) {
      removeMutation.mutate(id)
    }
  }

  useEffect(() => {
    if (user?.username === blog?.user?.username) {
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
          {hasRight && <button onClick={() => remove(blog.id)}>remove</button>}
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
