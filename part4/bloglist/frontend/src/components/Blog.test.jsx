import { render, screen } from '@testing-library/react'
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

  test('renders content without url and likes', () => {
    const { container } = render(<Blog blog={blog} />)
    const div = container.querySelector('.blog')
    expect(div).toHaveTextContent('title')
    expect(div).toHaveTextContent('author')
    expect(div).not.toHaveTextContent('url')
    expect(div).not.toHaveTextContent('likes')
  })
})
