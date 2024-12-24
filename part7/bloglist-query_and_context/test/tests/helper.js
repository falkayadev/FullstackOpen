const loginWith = async (page, username, password) => {
  await page.getByRole('button', { name: 'login' }).click()
  await page.getByTestId('username').fill(username)
  await page.getByTestId('password').fill(password)
  await page.getByRole('button', { name: 'login' }).click()
}

const logoutWith = async (page) => {
  await page.getByRole('button', { name: 'user settings' }).click()
  await page.getByRole('button', { name: 'logout' }).click()
}

const createBlog = async (page, title, author, url) => {
  await page.getByRole('button', { name: 'create a new blog' }).click()
  await page.getByTestId('title').fill(title)
  await page.getByTestId('author').fill(author)
  await page.getByTestId('url').fill(url)
  await page.getByRole('button', { name: 'create' }).click()
}
export { loginWith, logoutWith, createBlog }
