describe('The Unauthenticated Signup Page', () => {
  beforeEach(() => {
    cy.visit('/signup')
    cy.injectAxe()
  })

  it('should check the accessibility of the signup page', () => {
    cy.get('[data-cy="loading"]').should('not.exist')
    cy.checkA11y('#root')
  })

  it('should display a success message page when the server returns a 201', () => {
    const email = `test-cypress${crypto.randomUUID()}@email.com`
    const password = 'P@ssw0rd!'

    cy.intercept('POST', `/api/users?depth=0`, req => {
      req.reply({
        statusCode: 201,
        body: {
          doc: {
            _id: '60f3d5f2d5c0b4001d6f3c7f',
            firstName: 'Cypress',
            lastName: 'test',
            email,
            token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
            createdAt: '2021-07-18T21:03:06.000Z',
            updatedAt: '2021-07-18T21:03:06.000Z',
            __v: 0,
          },
        },
      })
    })

    cy.intercept('GET', '/api/users/me?depth=0', req => {
      req.reply({
        statusCode: 200,
        body: {
          doc: {
            _id: '60f3d5f2d5c0b4001d6f3c7f',
            firstName: 'Cypress',
            lastName: 'test',
            email,
            token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
            createdAt: '2021-07-18T21:03:06.000Z',
            updatedAt: '2021-07-18T21:03:06.000Z',
            __v: 0,
          },
        },
      })
    })

    cy.get('[data-cy="firstName"]').type('Cypress')
    cy.get('[data-cy="lastName"]').type('test')
    cy.get('[data-cy="email"]').type(email)
    cy.get('[data-cy="password"]').type(password)
    cy.get('[data-cy="confirmPassword"]').type(password + '{enter}')

    cy.url().should('contain', '/signup-success')
  })

  it('should display an error toast when the server returns a 500', () => {
    cy.intercept('POST', '/api/users?depth=0', {
      statusCode: 500,
      body: {
        message: 'Internal Server Error',
      },
    })

    cy.get('[data-cy="firstName"]').type('Cypress')
    cy.get('[data-cy="lastName"]').type('Test')
    cy.get('[data-cy="email"]').type('whatever@what.com')
    // {enter} causes the form to submit
    cy.get('[data-cy="password"]').type('Pa$sword')
    cy.get('[data-cy="confirmPassword"]').type('Pa$sword{enter}')

    cy.get('[id="toast-sign-up-error"]').should('be.visible')
  })

  it('should test the error messages of an empty form', () => {
    cy.get('[data-cy="confirmPassword"]').type('{enter}')

    cy.get('[data-cy="firstName-error"]').should('be.visible')
    cy.get('[data-cy="lastName-error"]').should('be.visible')
    cy.get('[data-cy="email-error"]').should('be.visible')
    cy.get('[data-cy="password-error"]').should('be.visible')
    cy.get('[data-cy="confirmPassword-error"]').should('be.visible')
  })

  it('should verify that confirmPassword will show an error message if it does not match password', () => {
    cy.get('[data-cy="firstName"]').type('Cypress')
    cy.get('[data-cy="lastName"]').type('Test')
    cy.get('[data-cy="email"]').type('email@email.com')
    cy.get('[data-cy="password"]').type('Pa$sword')
    cy.get('[data-cy="confirmPassword"]').type('Pa$sword1{enter}')

    cy.get('[data-cy="confirmPassword-error"]')
      .should('be.visible')
      .and('contain', 'Passwords should match!')
  })

  it('should test that the password-toggle and confirmPassword-toggle work', () => {
    cy.get('[data-cy="password-toggle"]').click()
    cy.get('[data-cy="password"]').should('have.attr', 'type', 'text')
    cy.get('[data-cy="password-toggle"]').click()
    cy.get('[data-cy="password"]').should('have.attr', 'type', 'password')

    cy.get('[data-cy="confirmPassword-toggle"]').click()
    cy.get('[data-cy="confirmPassword"]').should('have.attr', 'type', 'text')
    cy.get('[data-cy="confirmPassword-toggle"]').click()
    cy.get('[data-cy="confirmPassword"]').should('have.attr', 'type', 'password')
  })
})
