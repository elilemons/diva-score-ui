import { APP_ROUTES } from '@root/appRoutes'

describe('The Dashboard Page', () => {
  beforeEach(() => {
    cy.loginViaUI()
    cy.visit('/dashboard')
  })

  it('should go to survey page', () => {
    cy.get("[data-cy='beginDailySurvey']").click()
    cy.url().should('include', APP_ROUTES.authenticated.survey)
  })
})
