import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test('renders title and author', () => {
  const blog = {
    title: 'Author authoring a blog',
    author: 'Author Authorius',
    url: "www.AuthorsBlog.com"
  }

  render(<Blog blog={blog} />)
  const element = screen.getByText('Author authoring a blog Author Authorius')
  expect(element).toBeDefined()
})

test('does not render url', () => {
  const blog = {
    title: 'Author authoring a blog',
    author: 'Author Authorius',
    url: "www.AuthorsBlog.com"
  }

  render(<Blog blog={blog} />)
  const element = screen.queryByText('url', { exact: false })
  expect(element).toBeNull()
})

