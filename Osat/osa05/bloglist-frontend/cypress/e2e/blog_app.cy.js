/* eslint-disable no-undef */
const blog1 = {
  title: 'Blog about cypress',
  author: 'Cypress enthusiast',
  url: 'www.usingcypress.com'
}

const blog2 = {
  title: 'least likes',
  author: 'Matt',
  url: 'www.asd.com'
}

const blog3 = {
  title: 'most likes',
  author: 'John',
  url: 'www.qwe.com'
}

describe('Blog app', function () {
  beforeEach(function () {

    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Matti Luukkainen',
      username: 'mluukkai',
      password: 'salainen'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.contains('Login')
    cy.contains('username')
    cy.contains('password')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('salainen')
      cy.contains('login').click()
      cy.contains('logout').click()
    })

    it('fails with wrong credentials', function () {
      cy.get('#username').type('thisIsNotACorrectUsername')
      cy.get('#password').type('thisIsNotACorrectPassword')
      cy.contains('login').click()
      cy.contains('wrong credentials')
    })
  })
  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'mluukkai', password: 'salainen' })

    })

    it('A blog can be created', function () {
      const blog = blog1
      cy.contains('new blog').click()
      cy.get('#title').type(blog.title)
      cy.get('#author').type(blog.author)
      cy.get('#url').type(blog.url)
      cy.get('#create-button').click()
      cy.contains('new blog')
    })

    it('A blog can be liked', function () {
      const blog = blog1
      cy.createBlog({
        blog
      })

      cy.contains(`${blog.title}`).contains('View').click()
      cy.contains('like').click()
      cy.contains('likes: 1')
    })

    it('A blog can be removed', function () {
      const blog = blog1
      cy.createBlog({
        blog
      })
      cy.contains('View').click()
      cy.contains('remove').click()
      cy.contains(`${blog.title}`).should('not.exist')
    })

    it('blogs are sorted by likes', function () {
      let blog = blog1
      cy.createBlog({
        blog
      })

      blog = blog2
      cy.createBlog({
        blog
      })

      blog = blog3
      cy.createBlog({
        blog
      })
      cy.contains('most').contains('View').click()
      cy.contains('like').click().click().click()
      cy.contains('Hide').click()


      cy.contains('cypress').contains('View').click()
      cy.wait(500)
      cy.contains('likes: 0').contains('like').click().click()
      cy.visit('http://localhost:3000')

      cy.get('.blog').eq(0).should('contain', 'most')
      cy.get('.blog').eq(1).should('contain', 'cypress')
      cy.get('.blog').eq(2).should('contain', 'least')
    })
  })
})