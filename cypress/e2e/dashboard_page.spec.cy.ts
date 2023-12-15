import { APP_ROUTES } from '@root/appRoutes'

describe('The Dashboard Page', () => {
  beforeEach(() => {
    cy.loginViaUI() // Server must be running for this to work
    cy.visit('/dashboard')
    cy.injectAxe()
  })

  it('should test the accessibility of the survey page', () => {
    cy.checkA11y('#root')
  })

  it('should go to survey page', () => {
    cy.get("[data-cy='beginDailySurvey']").click()
    cy.url().should('include', APP_ROUTES.authenticated.survey)
  })
})
