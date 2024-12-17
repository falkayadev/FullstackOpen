import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import '@testing-library/jest-dom'
import Blog from './Blog'
import { expect } from 'vitest'

describe('Blog', () => {
  const blog = {
    title: 'title',
    author: 'author',
    url: 'url',
    likes: 0,
  }

  const user = { username: 'testuser', name: 'Test User' }

  const updateBlog = vi.fn()
  const deleteBlog = vi.fn()

  test('renders content without url and likes', () => {
    const { container } = render(
      <Blog
        blog={blog}
        user={user}
        updateBlog={updateBlog}
        deleteBlog={deleteBlog}
      />
    )
    const div = container.querySelector('.blog')
    expect(div).toHaveTextContent('title')
    expect(div).toHaveTextContent('author')
    expect(div).not.toHaveTextContent('url')
    expect(div).not.toHaveTextContent('likes')
  })

  test('re-renders content with url and likes if expanded', async () => {
    render(
      <Blog
        blog={blog}
        user={user}
        deleteBlog={deleteBlog}
        updateBlog={updateBlog}
      />
    )

    expect(screen.queryByText('url')).not.toBeInTheDocument()
    expect(screen.queryByText('likes')).not.toBeInTheDocument()

    const button = screen.getByText('view')
    await userEvent.click(button)

    expect(screen.getByText('url')).toBeInTheDocument()
    expect(screen.getByText('likes')).toBeInTheDocument()
  })

  test('if the like button is clicked twice, the event handler the component received as props is called twice', async () => {
    render(
      <Blog
        blog={blog}
        user={user}
        deleteBlog={deleteBlog}
        updateBlog={updateBlog}
      />
    )

    const viewButton = screen.getByText('view')
    await userEvent.click(viewButton)

    const likeButton = screen.getByText('like')
    await userEvent.click(likeButton)
    await userEvent.click(likeButton)

    expect(updateBlog.mock.calls).toHaveLength(2)
  })
})
