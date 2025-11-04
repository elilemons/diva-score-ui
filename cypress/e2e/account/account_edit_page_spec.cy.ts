describe('Edit Account Page', () => {
  beforeEach(() => {
    cy.loginViaAPI() // Server must be running for this to work

    cy.visit('/account/edit')
    cy.get("[data-cy='loading']").should('not.exist')
    cy.injectAxe()
  })

  // Presentation tests
  it('should test the accessibility of the edit account page', () => {
    cy.checkA11y('#root')
  })

  it('should have the edit account page header', () => {
    cy.contains('Edit Account').should('be.visible')
  })

  it('should display the edit page inputs and labels', () => {
    cy.contains('First Name').should('be.visible')
    cy.contains('Last Name').should('be.visible')
    cy.contains('Email').should('be.visible')

    cy.get('[data-cy="firstName"]').should('exist')
    cy.get('[data-cy="lastName"]').should('exist')
    cy.get('[data-cy="email"]').should('exist')
  })

  it('should have edit account page buttons', () => {
    cy.get('[data-cy="back-to-account-page"]').should('exist')
    cy.get('[data-cy="edit-account-link"]').should('not.exist')
    cy.get('[data-cy="reset-password-link"]').should('exist')
    cy.get('[data-cy="submit"]').should('exist')
  })

  // Logic tests
  it('should update first name, last name, and email', () => {
    // Update to new values
    const newFirstName = 'UpdatedFirst'
    const newLastName = 'UpdatedLast'
    const newEmail = 'updated@example.com'

    cy.get('[data-cy="firstName"]').clear().type(newFirstName)
    cy.get('[data-cy="lastName"]').clear().type(newLastName)
    cy.get('[data-cy="email"]').clear().type(newEmail)

    cy.intercept('PATCH', '/api/users/*', {
      statusCode: 200,
      body: {
        email: newEmail,
        firstName: newFirstName,
        lastName: newLastName,
      },
    }).as('updateUser')

    cy.get('[data-cy="edit-account-form"]').submit()

    // Wait for the request to complete
    cy.wait('@updateUser')
  })

  it('should test validation', () => {
    // Test empty first name
    cy.get('[data-cy="firstName"]').clear()
    cy.get('[data-cy="edit-account-form"]').submit()
    cy.get('[data-cy="firstName-error"]').should('exist')

    // Test empty last name
    cy.get('[data-cy="lastName"]').clear()
    cy.get('[data-cy="edit-account-form"]').submit()
    cy.get('[data-cy="lastName-error"]').should('not.exist')

    // Test empty email
    cy.get('[data-cy="email"]').clear()
    cy.get('[data-cy="edit-account-form"]').submit()
    cy.get('[data-cy="email-error"]').should('exist')

    // Test refilling makes required error disappear
    cy.get('[data-cy="firstName"]').clear().type('TestFirst')
    cy.get('[data-cy="firstName-error"]').should('not.exist')

    // Test email format error
    cy.get('[data-cy="email"]').clear().type('test')
    cy.get('[data-cy="email-error"]').should('exist')
    cy.get('[data-cy="email-error"]').contains('Please enter a valid email address.')

    // Test that email error clears
    cy.get('[data-cy="email"]').clear().type('test@example.com')
    cy.get('[data-cy="email-error"]').should('not.exist')
  })
})
