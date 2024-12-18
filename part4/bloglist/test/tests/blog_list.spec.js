const { test, describe, expect, beforeEach } = require('@playwright/test')
import { loginWith, logoutWith, createBlog } from './helper.js'

describe('Blog list', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('http://localhost:3003/api/testing/reset')
    await request.post('http://localhost:3003/api/users', {
      data: {
        name: 'Furkan Alkaya',
        username: 'falkaya',
        password: 'password',
      },
    })
    // another user for testing authorization
    await request.post('http://localhost:3003/api/users', {
      data: {
        name: 'Muzaffer Alkaya',
        username: 'malkaya',
        password: 'password',
      },
    })

    await page.goto('http://localhost:5173')
  })

  test('front page can be opened', async ({ page }) => {
    const locator = page.getByText('Log in to application')
    await expect(locator).toBeVisible()
    await expect(page.getByRole('button', { name: 'login ' })).toBeVisible()
  })

  test('user can login', async ({ page }) => {
    await loginWith(page, 'falkaya', 'password')
    await expect(
      page.getByRole('button', { name: 'user settings' })
    ).toBeVisible()
  })

  test('user cannot login with wrong credentials', async ({ page }) => {
    await loginWith(page, 'falkaya', 'wrong')
    await expect(page.getByText('Invalid username or password')).toBeVisible()
  })

  describe('when logged in', () => {
    beforeEach(async ({ page }) => {
      loginWith(page, 'falkaya', 'password')
    })
    test('a blog can be created', async ({ page }) => {
      await createBlog(
        page,
        'title by playwright',
        'author by playwright',
        'url by playwright'
      )
      await expect(page.getByText('view')).toBeVisible()
    })
    describe('when a blog has been created', () => {
      beforeEach(async ({ page }) => {
        await createBlog(
          page,
          'title by playwright',
          'author by playwright',
          'url by playwright'
        )
      })
      test('a blog can be deleted', async ({ page }) => {
        await page.getByRole('button', { name: 'view' }).click()

        // listener for the dialog must be set up before the action that triggers it !!!s
        page.on('dialog', async (dialog) => {
          await dialog.accept()
        })
        await page.getByRole('button', { name: 'remove' }).click()

        await page.waitForTimeout(1000)
        await expect(page.getByText('title by playwright')).not.toBeVisible()
      })
      test('a blog can be liked', async ({ page }) => {
        await page.getByRole('button', { name: 'view' }).click()
        await page.getByRole('button', { name: 'like' }).click()
        await page.waitForTimeout(1000)
        await expect(page.getByText('likes 1')).toBeVisible()
      })
      test('only the creator can access the delete button', async ({
        page,
      }) => {
        await logoutWith(page)
        await loginWith(page, 'malkaya', 'password')
        await page.getByRole('button', { name: 'view' }).click()
        await expect(
          page.getByRole('button', { name: 'remove' })
        ).not.toBeVisible()
      })
    })
  })
})
