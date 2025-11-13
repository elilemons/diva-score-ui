describe('Account Page', () => {
  beforeEach(() => {
    cy.loginViaAPI() // Server must be running for this to work

    cy.visit('/account')
    cy.get("[data-cy='loading']").should('not.exist')

    cy.injectAxe()
  })

  it('should test the accessibility of the account page', () => {
    cy.checkA11y('#root')
  })

  it('should display the account page title', () => {
    cy.contains('Account Page').should('be.visible')
  })

  it('should display user profile information', () => {
    cy.contains('First Name').should('be.visible')
    cy.contains('Last Name').should('be.visible')
    cy.contains('Email').should('be.visible')

    // Check that user data is displayed (using env variables for consistency)
    cy.get("[data-cy='first-name']").should('be.visible')
    cy.get("[data-cy='last-name']").should('be.visible')
    cy.get("[data-cy='email']").should('be.visible')
  })

  it('should navigate to Edit Account page', () => {
    cy.get('[data-cy="edit-account-link"]').should('be.visible').click()
    cy.url().should('include', '/account/edit')
    cy.contains('Edit Account').should('be.visible')

    // Go back to account page
    cy.visit('/account')
  })

  it('should navigate to Reset Password page', () => {
    cy.get('[data-cy="reset-password-link"]').should('be.visible').click()
    cy.url().should('include', '/account/reset-password')

    // Go back to account page
    cy.visit('/account')
  })

  it('should have working Terms of Service link', () => {
    cy.get('[data-cy="terms-of-service-link"]')
      .should('be.visible')
      .should('have.attr', 'href')
      .and('include', 'terms-of-service')
      .then(href => {
        cy.request(href as unknown as string)
          .its('status')
          .should('eq', 200)
      })
  })

  it('should have working Privacy Policy link', () => {
    cy.get('[data-cy="privacy-policy-link"]')
      .should('be.visible')
      .should('have.attr', 'href')
      .and('include', 'privacy-policy')
      .then(href => {
        cy.request(href as unknown as string)
          .its('status')
          .should('eq', 200)
      })
  })

  it('should not have a back to account page button', () => {
    cy.get('[data-cy="back-to-account-page"]').should('not.exist')
  })

  it('should logout successfully', () => {
    // Intercept the network request for the 'logout' endpoint
    cy.intercept('POST', '/api/users/logout').as('logout')
    cy.get('[data-cy="logout-link"]').click()

    // JWT token should be removed
    cy.window().then(win => {
      expect(win.localStorage.getItem(Cypress.env('jwtTokenName'))).to.be.empty
    })

    // Should redirect to login page
    cy.url().should('include', '/login')
  })
})
