import { APP_ROUTES } from '@root/appRoutes'

describe('The Unauthenticated Home Page', () => {
  beforeEach(() => {
    cy.visit('/')
    cy.injectAxe()
  })

  it('should test the accessibility of the home page', () => {
    cy.checkA11y('#root')
  })

  afterEach(() => {
    cy.visit('/')
  })

  it('successfully loads', () => {
    cy.get('[data-cy="signup"]').click()
  })

  it('should go to signup page', () => {
    cy.get('[data-cy="signup"]').click()

    cy.url().should('include', APP_ROUTES.unauthenticated.signup)
  })

  it('should go to login page', () => {
    cy.get('[data-cy="login"]').click()

    cy.url().should('include', APP_ROUTES.unauthenticated.login)
  })
})
