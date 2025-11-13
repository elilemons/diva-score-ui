import { APP_ROUTES } from '@root/appRoutes'

describe('The Unauthenticated Landing Page', () => {
  beforeEach(() => {
    cy.visit('/')

    cy.injectAxe()
  })

  it('should test the accessibility of the landing page', () => {
    cy.checkA11y('#root')
  })

  it('should go to signup page', () => {
    cy.get('[data-cy="landing-page-signup"]').click()

    cy.url().should('include', APP_ROUTES.unauthenticated.signup)
  })
  it('should go to signup page', () => {
    cy.get('[data-cy="landing-page-signup-2"]').click()

    cy.url().should('include', APP_ROUTES.unauthenticated.signup)
  })

  it('should not show the bottom nav and offer a login link if not authenticated', () => {
    cy.get('[data-cy="bottom-nav"]').should('not.exist')
    cy.get('[data-cy="landing-page-bottom-login"]').should('have.text', 'Log in')
  })

  it('should show bottom nav and change some text if authenticated', () => {
    cy.loginViaAPI() // Server must be running for this to work
    cy.visit('/')
    cy.get('[data-cy="landing-page-bottom-login"]').should('have.text', 'Visit Dashboard')
    cy.get('[data-cy="bottom-nav"]').should('be.visible')
    cy.get('[data-cy="bottom-nav-label-calendar"]').should('exist')
    cy.get('[data-cy="bottom-nav-label-dashboard"]').should('exist')
    cy.get('[data-cy="bottom-nav-label-account"]').should('exist')
  })
})
