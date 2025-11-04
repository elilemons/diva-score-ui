describe('Reset Password Page', () => {
  beforeEach(() => {
    cy.loginViaAPI() // Server must be running for this to work

    cy.visit('/account/reset-password')
    cy.get("[data-cy='loading']").should('not.exist')
    cy.injectAxe()
  })

  // Presentation tests
  it('should test the accessibility of the reset password page', () => {
    cy.checkA11y('#root')
  })

  it('should have the reset password page header', () => {
    cy.contains('Reset Password').should('be.visible')
  })

  it('should display the reset password page inputs and labels', () => {
    cy.contains('New Password').should('be.visible')
    cy.contains('Confirm Password').should('be.visible')

    cy.get('[data-cy="password"]').should('exist')
    cy.get('[data-cy="confirmPassword"]').should('exist')
  })

  it('should have reset password page buttons', () => {
    cy.get('[data-cy="back-to-account-page"]').should('exist')
    cy.get('[data-cy="password-toggle"]').should('exist')
    cy.get('[data-cy="confirmPassword-toggle"]').should('exist')
    cy.get('[data-cy="edit-account-link"]').should('exist')
    cy.get('[data-cy="reset-password-link"]').should('not.exist')
    cy.get('[data-cy="submit"]').should('exist')
  })

  // Logic tests
  it('should show the password when the toggle is clicked then hide them', () => {
    const newPassword = 'newPassword123'

    cy.get('[data-cy="password"]').clear().type(newPassword)
    cy.get('[data-cy="password-toggle"]').click()
    cy.get('[data-cy="password"]').should('have.attr', 'type', 'text')
    cy.get('[data-cy="password-toggle"]').click()
    cy.get('[data-cy="password"]').should('have.attr', 'type', 'password')

    cy.get('[data-cy="confirmPassword"]').clear().type(newPassword)
    cy.get('[data-cy="confirmPassword-toggle"]').click()
    cy.get('[data-cy="confirmPassword"]').should('have.attr', 'type', 'text')
    cy.get('[data-cy="confirmPassword-toggle"]').click()
    cy.get('[data-cy="confirmPassword"]').should('have.attr', 'type', 'password')
  })

  it('should reset password successfully', () => {
    const newPassword = '#newPassword123'

    cy.get('[data-cy="password"]').clear().type(newPassword)
    cy.get('[data-cy="confirmPassword"]').clear().type(newPassword)

    cy.intercept('POST', '/api/users/reset-password', {
      statusCode: 200,
      body: {
        message: 'Password reset successfully',
      },
    }).as('resetPassword')

    cy.get('[data-cy="reset-password-form"]').submit()

    // Wait for the request to complete
    cy.wait('@resetPassword')
  })

  it('should test the reset password form validation', () => {
    const noSymbol = 'newPassword123'
    const tooShort = 't'
    const goodishPassword = 'GoodPassword123!'

    cy.get('[data-cy="password"]').clear().type(noSymbol)
    cy.get('[data-cy="confirmPassword"]').clear().type(noSymbol)
    cy.get('[data-cy="reset-password-form"]').submit()
    cy.get('[data-cy="password-error"]')
      .should('exist')
      .contains('A special character is required.')

    cy.get('[data-cy="password"]').clear().type(tooShort)
    cy.get('[data-cy="confirmPassword"]').clear().type(tooShort)
    cy.get('[data-cy="reset-password-form"]').submit()
    cy.get('[data-cy="password-error"]')
      .should('exist')
      .contains('Password must be 8 or more characters in length.')

    // Test confirm password
    cy.get('[data-cy="password"]')
      .clear()
      .type(goodishPassword + '123')
    cy.get('[data-cy="confirmPassword"]').clear().type(goodishPassword)

    cy.get('[data-cy="reset-password-form"]').submit()

    cy.get('[data-cy="confirmPassword-error"]').should('exist').contains('Passwords should match!')
  })
})
