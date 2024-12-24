import { screen, render } from '@testing-library/react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import CreateForm from './CreateForm'

test('event handler receives right details when submit', async () => {
  const createBlog = vi.fn()
  const user = userEvent.setup()
  render(<CreateForm createBlog={createBlog} />)
  const inputs = screen.getAllByRole('textbox')
  const sendButton = screen.getByText('create')

  await user.type(inputs[0], 'title')
  await user.type(inputs[1], 'author')
  await user.type(inputs[2], 'url')
  await user.click(sendButton)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0]).toEqual({
    title: 'title',
    author: 'author',
    url: 'url',
  })
})
