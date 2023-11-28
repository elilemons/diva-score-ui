describe('The Unauthenticated Signup Page', () => {
  beforeEach(() => {
    cy.visit('/signup')
  })

  it('should be able to sign up', () => {
    const email = `test-cypress${crypto.randomUUID()}@email.com`
    const password = Cypress.env('password')

    cy.get('[data-cy="firstName"]').type('Cypress')
    cy.get('[data-cy="lastName"]').type('Test')
    cy.get('[data-cy="email"]').type(email)

    // {enter} causes the form to submit
    cy.get('[data-cy="password"]').type(`${password}`)
    cy.get('[data-cy="confirmPassword"]').type(`${password}{enter}`)

    cy.url().should('include', '/signup-success')

    cy.get('[data-cy="backToLogin"]').click()

    cy.url().should('include', '/login')
  })
})
