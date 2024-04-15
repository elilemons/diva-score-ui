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

  it('successfully loads when unauthenticated', () => {
    cy.get('[data-cy="bottom-nav"]').should('not.exist')
    cy.get('[data-cy="signup"]').should('be.visible')
  })

  it('should go to signup page', () => {
    cy.get('[data-cy="signup"]').click()

    cy.url().should('include', APP_ROUTES.unauthenticated.signup)
  })

  it('should go to login page', () => {
    cy.get('[data-cy="login"]').click()
    cy.url().should('include', APP_ROUTES.unauthenticated.login)
  })

  it('should show bottom nav if authenticated', () => {
    cy.loginViaAPI() // Server must be running for this to work
    cy.visit('/')
    cy.get('[data-cy="bottom-nav"]').should('be.visible')
    cy.get('[data-cy="bottom-nav-label-calendar"]').should('exist')
    cy.get('[data-cy="bottom-nav-label-dashboard"]').should('exist')
    cy.get('[data-cy="bottom-nav-label-account"]').should('exist')
  })
})
