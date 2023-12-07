describe('The Login Page', () => {
  it('sets auth cookie when logging in via form submission', () => {
    cy.visit('/login')

    cy.get('[data-cy="email"]').type(Cypress.env('email'))

    // {enter} causes the form to submit
    cy.get('[data-cy="password"]').type(`${Cypress.env('password')}{enter}`)

    cy.url().should('contain', '/dashboard')

    cy.getAllLocalStorage().then(result => {
      // TODO Remove this test code
      console.log('ELITEST local storage', { result })
      // ^ TODO Remove this test code
      expect(result[Cypress.env('baseURL')][Cypress.env('jwtTokenName')]).to.exist
    })
    // // UI should reflect this user being logged in
    cy.get('[data-cy="welcome-message"]').should('contain', 'Welcome to your Dashboard Cypress')
  })
})
