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
  const userActions = userEvent.setup()

  const updateBlog = vi.fn()
  const deleteBlog = vi.fn()

  beforeEach(() => {
    render(
      <Blog
        blog={blog}
        user={user}
        updateBlog={updateBlog}
        deleteBlog={deleteBlog}
      />
    )
  })

  test('renders content without url and likes', () => {
    const div = screen.getByText('title').closest('.blog')
    expect(div).toHaveTextContent('title')
    expect(div).toHaveTextContent('author')
    expect(div).not.toHaveTextContent('url')
    expect(div).not.toHaveTextContent('likes')
  })

  test('re-renders content with url and likes if expanded', async () => {
    expect(screen.queryByText('url')).not.toBeInTheDocument()
    expect(screen.queryByText('likes')).not.toBeInTheDocument()

    const button = screen.getByText('view')
    await userActions.click(button)

    expect(screen.getByText('url')).toBeInTheDocument()
    expect(screen.getByText('likes')).toBeInTheDocument()
  })

  test('if the like button is clicked twice, the event handler the component received as props is called twice', async () => {
    const viewButton = screen.getByText('view')
    await userActions.click(viewButton)

    const likeButton = screen.getByText('like')
    await userActions.click(likeButton)
    await userActions.click(likeButton)

    expect(updateBlog.mock.calls).toHaveLength(2)
  })
})
