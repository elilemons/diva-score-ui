import { APP_ROUTES } from '@root/appRoutes'

describe('The Survey Page', () => {
  beforeEach(() => {
    cy.loginViaUI() // Server must be running for this to work
    cy.visit('/dashboard')

    // Make sure the page isn't loading
    cy.get("[data-cy='loading']").should('not.exist')

    // Intercept the network request for 'get-todays-survey' endpoint
    cy.intercept('GET', '/api/surveys/get-todays-survey').as('getTodaysSurvey')

    // Wait for the 'get-todays-survey' request to finish
    cy.wait('@getTodaysSurvey')

    // Create or continue a survey
    cy.get("[data-cy='beginDailySurvey']").click()

    cy.injectAxe()
  })

  it('should test the accessibility of the survey page', () => {
    cy.checkA11y('#root')
  })

  it('should be on the survey page', () => {
    cy.url().should('include', APP_ROUTES.authenticated.survey)
  })

  it('should display a message when the survey has saved', () => {
    cy.get("[data-cy='survey-update-success']").should('exist')
  })

  it('should display an error when the survey fails to save', () => {
    cy.intercept('PATCH', '/api/surveys/*', {
      status: 501,
      body: {
        message: 'An unknown error occurred when attempting to save this survey',
      },
    })

    cy.get("[data-cy='survey-update-error']").should('exist')
  })
})
