import { APP_ROUTES } from '@root/appRoutes'

describe('The Survey Page', () => {
  beforeEach(() => {
    cy.loginViaUI()
    cy.visit('/dashboard').get("[data-cy='beginDailySurvey']").click()
  })

  it('should be on the survey page', () => {
    cy.url().should('include', APP_ROUTES.authenticated.survey)
  })
})
