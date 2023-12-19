import { APP_ROUTES } from '@root/appRoutes'

describe('The Dashboard Page', () => {
  beforeEach(() => {
    cy.loginViaUI() // Server must be running for this to work
    cy.visit('/dashboard')

    // Make sure the page isn't loading
    cy.get("[data-cy='loading']").should('not.exist')

    // Intercept the network request for 'get-todays-survey' endpoint
    cy.intercept('GET', '/api/surveys/get-todays-survey').as('getTodaysSurvey')

    // Wait for the 'get-todays-survey' request to finish
    cy.wait('@getTodaysSurvey')

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
