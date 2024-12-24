import Blog from './Blog'
import { useSelector } from 'react-redux'

const BlogList = ({ user, updateBlog, deleteBlog }) => {
  const blogs = useSelector((state) => state.blogs)
  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes)
  return (
    <ul>
      {sortedBlogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          user={user}
          updateBlog={updateBlog}
          deleteBlog={deleteBlog}
        />
      ))}
    </ul>
  )
}

export default BlogList
