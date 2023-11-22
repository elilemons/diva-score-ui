describe('The Login Page', () => {
  it('sets auth cookie when logging in via form submission', () => {
    // destructuring assignment of the this.currentUser object
    const email = Cypress.env('email')
    const password = Cypress.env('password')

    cy.visit('/login')

    cy.get('[data-cy="email"]').type(email)

    // {enter} causes the form to submit
    cy.get('[data-cy="password"]').type(`${password}{enter}`)

    // we should be redirected to /dashboard
    cy.url().should('include', '/dashboard')

    // UI should reflect this user being logged in
    cy.get('[data-cy="welcome-message"]').should('contain', 'Welcome')

    // our auth cookie should be present
    cy.getAllLocalStorage().then(result => {
      expect(result[Cypress.env('baseURL')][Cypress.env('jwtTokenName')]).to.exist
    })
  })
})
