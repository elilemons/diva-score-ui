import { APP_ROUTES } from '@root/appRoutes'

describe('The Dashboard Page', () => {
  beforeEach(() => {
    cy.loginViaUI() // Server must be running for this to work

    // Intercept the network request for 'get-todays-survey' endpoint
    cy.intercept('GET', '/api/surveys/get-todays-survey').as('getTodaysSurvey')

    cy.visit('/dashboard')

    // Wait for the 'get-todays-survey' request to finish
    cy.wait('@getTodaysSurvey')

    cy.get("[data-cy='loading']").should('not.exist')

    cy.injectAxe()
  })

  it('should test the accessibility of the survey page', () => {
    cy.checkA11y('#root')
  })

  it('should go to survey page', () => {
    cy.get("[data-cy='beginDailySurvey']").click()
    cy.url().should('include', APP_ROUTES.authenticated.survey)
  })

  it('should find a skeleton loading indicator', () => {
    cy.intercept('GET', '/api/surveys/get-todays-survey', req =>
      req.on('response', res => res.setDelay(300)),
    ).as('getTodaysSurvey')
    cy.visit('/dashboard')

    // Check for loading indicator
    cy.get("[data-cy='skeleton-loading']").should('be.visible')

    // Wait for the 'get-todays-survey' request to finish
    cy.wait('@getTodaysSurvey')

    cy.get("[data-cy='skeleton-loading']").should('not.be.visible')
  })
})
