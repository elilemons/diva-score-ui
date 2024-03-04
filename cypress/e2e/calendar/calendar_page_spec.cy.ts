describe('The Calendar Page', () => {
  beforeEach(() => {
    cy.loginViaAPI() // Server must be running for this to work
    cy.visit('/calendar')

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

  it('should find a loading state', () => {
    cy.intercept('GET', '/api/surveys/get-users-surveys', req =>
      req.on('response', res => res.setDelay(300)),
    ).as('getUsersSurveys')

    cy.reload()

    cy.get('[data-cy="survey-listing-skeleton"]').should('be.visible')

    // Wait for the 'get-todays-survey' request to finish
    cy.wait('@getUsersSurveys')

    cy.get('[data-cy="survey-listing-skeleton"]').should('not.exist')
  })

  it('should find these elements', () => {
    cy.get("[data-cy='todays-score-value-spinner']").should('not.exist')
    cy.get("[data-cy='total-score-value-spinner']").should('not.exist')

    cy.get('[data-cy="todays-score-label"]').should('be.visible')
    cy.get('[data-cy="todays-score-value"]').should('be.visible')

    cy.get('[data-cy="total-score-label"]').should('be.visible')
    cy.get('[data-cy="total-score-value"]').should('be.visible')

    cy.get('[data-cy="survey-listing"]').should('be.visible')

    cy.get('[data-cy="survey-icon"]').should('be.visible')
    cy.get('[data-cy="survey-date"]').should('be.visible')
    cy.get('[data-cy="survey-time"]').should('be.visible')
    cy.get('[data-cy="survey-points"]').should('be.visible')
  })

  it('should navigate to the survey page', () => {
    cy.get("[data-cy='survey-listing']").first().click()
    cy.url().should('include', '/survey/')
  })
})
