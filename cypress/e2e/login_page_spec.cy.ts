describe('The Login Page', () => {
  it('sets auth cookie when logging in via form submission', () => {
    cy.visit('/login')

    cy.get('[data-cy="email"]').type(Cypress.env('email'))

    // {enter} causes the form to submit
    cy.get('[data-cy="password"]').type(`${Cypress.env('password')}{enter}`)

    cy.url().should('contain', '/dashboard')

    cy.getAllLocalStorage().then(result => {
      expect(result[Cypress.env('baseURL')][Cypress.env('jwtTokenName')]).to.exist
    })
    // // UI should reflect this user being logged in
    cy.get('[data-cy="welcome-message"]').should('contain', 'Welcome to your Dashboard Cypress')
  })

  it('shows a toast error when authentication fails', () => {
    cy.visit('/login')

    cy.get('[data-cy="email"]').type(Cypress.env('email'))

    // {enter} causes the form to submit
    cy.get('[data-cy="password"]').type(`BadPassw0rd!{enter}`)

    // Check that the toast error is displayed
    cy.get('[id="toast-login-failure"]').should('be.visible')
  })

  it('should show an error message when no email is entered', () => {
    cy.visit('/login')

    // {enter} causes the form to submit
    cy.get('[data-cy="password"]').type(Cypress.env('password') + '{enter}')

    cy.url().should('contain', '/login')

    cy.get('[data-cy="email-error"]').should('contain', 'This field is required.')
  })

  it('should show an error message when an invalid email is entered', () => {
    cy.visit('/login')

    // {enter} causes the form to submit
    cy.get('[data-cy="email"]').type('test' + '{enter}')
    cy.get('[data-cy="password"]').type(Cypress.env('password') + '{enter}')

    cy.url().should('contain', '/login')

    cy.get('[data-cy="email-error"]').should('contain', 'Please enter a valid email address.')
  })

  it('should show error message when a password with less than 8 chars is entered', () => {
    cy.visit('/login')

    cy.get('[data-cy="email"]').type(Cypress.env('email'))

    // {enter} causes the form to submit
    cy.get('[data-cy="password"]').type(`test{enter}`)

    cy.url().should('contain', '/login')

    cy.get('[data-cy="password-error"]').should(
      'contain',
      'Password must be 8 or more characters in length.',
    )
  })

  it('should show error message when a password without an uppercase letter is entered', () => {
    cy.visit('/login')

    cy.get('[data-cy="email"]').type(Cypress.env('email'))

    // {enter} causes the form to submit
    cy.get('[data-cy="password"]').type(`12345678{enter}`)

    cy.url().should('contain', '/login')

    cy.get('[data-cy="password-error"]').should('contain', 'An uppercase letter is required.')
  })

  it('should show error message when a password without a special character is entered', () => {
    cy.visit('/login')

    cy.get('[data-cy="email"]').type(Cypress.env('email'))

    // {enter} causes the form to submit
    cy.get('[data-cy="password"]').type(`12345678F{enter}`)

    cy.url().should('contain', '/login')

    cy.get('[data-cy="password-error"]').should('contain', 'A special character is required.')
  })

  it('should toggle password visibility when password-toggle is clicked', () => {
    cy.visit('/login')

    cy.get('[data-cy="email"]').type(Cypress.env('email'))

    cy.get('[data-cy="password"]').type(Cypress.env('password'))

    cy.get('[data-cy="password-toggle"]').click()

    cy.get('[data-cy="password"]').should('have.attr', 'type', 'text')

    cy.get('[data-cy="password-toggle"]').click()

    cy.get('[data-cy="password"]').should('have.attr', 'type', 'password')
  })
})
