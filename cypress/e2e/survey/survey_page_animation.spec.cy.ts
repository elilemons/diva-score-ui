import { APP_ROUTES } from '@root/appRoutes'

describe('The Survey Page Animation', () => {
  beforeEach(() => {
    cy.loginViaAPI() // Server must be running for this to work
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

  it('should display an animation with the users score after submission', () => {
    cy.get("[data-cy='clear']").click()

    cy.fillInSurvey('whatever', 'whatever', 'whatever')

    cy.intercept('/api/surveys/*').as('patchSurvey')

    cy.get("[data-cy='submit']").click()

    cy.get("[data-cy='score-animation']").should('be.visible')
  })

  it('should close the animation and route to the dashboard when you click the X button', () => {
    cy.get("[data-cy='clear']").click()

    cy.fillInSurvey('whatever', 'whatever', 'whatever')

    cy.intercept('/api/surveys/*').as('patchSurvey')

    cy.get("[data-cy='submit']").click()

    cy.get("[data-cy='score-animation']").should('be.visible')

    cy.wait('@patchSurvey')

    cy.get("[data-cy='close-score-animation']").should('be.visible').click()

    cy.get("[data-cy='score-animation']").should('not.exist')

    cy.get("[data-cy='diva-score']").should('be.visible')

    cy.url().should('include', APP_ROUTES.authenticated.dashboard)
  })

  it('should close the animation and route to the dashboard when you click the go back link', () => {
    cy.get("[data-cy='clear']").click()

    cy.fillInSurvey('whatever', 'whatever', 'whatever')

    cy.intercept('/api/surveys/*').as('patchSurvey')

    cy.get("[data-cy='submit']").click()

    cy.get("[data-cy='score-animation']").should('be.visible')

    cy.wait('@patchSurvey')

    cy.get("[data-cy='survey-animation-dashboard-link']").should('be.visible').click()

    cy.get("[data-cy='score-animation']").should('not.exist')

    cy.get("[data-cy='diva-score']").should('be.visible')

    cy.url().should('include', APP_ROUTES.authenticated.dashboard)
  })

  it('should display a score after submission', () => {
    cy.get("[data-cy='clear']").click()

    cy.fillInSurvey('whatever', 'whatever', 'whatever')

    cy.intercept('/api/surveys/*').as('patchSurvey')

    cy.get("[data-cy='submit']").click()

    cy.wait('@patchSurvey')
    cy.get("[data-cy='close-score-animation']").should('be.visible').click()

    cy.get("[data-cy='diva-score']").should('be.visible')

    cy.reload()

    cy.get("[data-cy='diva-score']").should('be.visible')
  })

  it('should not display an animation after an empty submission (score is 0)', () => {
    cy.get("[data-cy='clear']").click()

    cy.get("[data-cy='submit']").click()

    cy.get("[data-cy='score-animation']").should('not.exist')
  })

  it('should not display a score after an empty submission (score is 0)', () => {
    cy.get("[data-cy='clear']").click()

    cy.get("[data-cy='submit']").click()

    cy.get("[data-cy='score-animation']").should('not.exist')

  })
})
