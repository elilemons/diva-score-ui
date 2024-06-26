import { APP_ROUTES } from '@root/appRoutes'

describe('The Survey Page', () => {
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

  it('should test the accessibility of the survey page', () => {
    cy.checkA11y('#root')
  })

  it('should be on the survey page', () => {
    cy.url().should('include', APP_ROUTES.authenticated.survey)
  })

  it('should find a loading state', () => {
    cy.intercept('GET', '/api/surveys/*', req => req.on('response', res => res.setDelay(300))).as(
      'getSurvey',
    )

    cy.reload()

    cy.get('[data-cy="skeleton-loading"]').should('be.visible')

    // Wait for the 'get-todays-survey' request to finish
    cy.wait('@getSurvey')

    cy.get('[data-cy="skeleton-loading"]').should('not.exist')
  })

  it('should display a message when the survey has saved', () => {
    cy.intercept('PATCH', '/api/surveys/*', req =>
      req.reply({
        status: 200,
        body: {
          message: 'The survey saved successfully',
          doc: {
            id: req.body.id,
          },
        },
      }),
    )

    cy.get("[data-cy='submit']").click()

    cy.get("[id='toast-survey-update-success']").should('exist')
  })

  it('should display an error when the survey fails to save', () => {
    cy.intercept('PATCH', '/api/surveys/*', req =>
      req.reply({
        status: 501,
        body: {
          message: 'An unknown error occurred when attempting to save this survey',
        },
      }),
    )

    cy.get("[data-cy='submit']").click()

    cy.get("[id='toast-survey-update-error']").should('exist')
  })

  it('should test the clear button', () => {
    cy.get("[data-cy='clear']").click()

    cy.fillInSurvey('whatever', 'whatever', 'whatever')

    cy.get("[data-cy='clear']").click()

    cy.get("[data-cy='body1']").within(() => {
      cy.get('input[type=checkbox]').should('not.be.checked')
    })
    cy.get("[data-cy='body2']").within(() => {
      cy.get('input[type=checkbox]').should('not.be.checked')
    })
    cy.get("[data-cy='mind1']").within(() => {
      cy.get('input[type=checkbox]').should('not.be.checked')
    })
    cy.get("[data-cy='spirit1']").should('not.have.value')
    cy.get("[data-cy='connection1']").within(() => {
      cy.get('input[type=checkbox]').should('not.be.checked')
    })
    cy.get("[data-cy='goals1']").within(() => {
      cy.get('input[type=checkbox]').should('not.be.checked')
    })
    cy.get("[data-cy='goals2']").should('not.have.value')

    cy.get("[data-cy='reflections1']").should('not.have.value')
  })

  it('should change the corresponding input value and save the new values', () => {
    cy.get("[data-cy='clear']").click()

    const gratitude = 'I am grateful for my cat'
    const goal = 'Brush and floss my teeth today'
    const reflections = 'I had a great day today!'

    cy.fillInSurvey(gratitude, goal, reflections)

    cy.intercept('PATCH', '/api/surveys/*', req => {
      expect(req.body.body1).to.be.true
      expect(req.body.body2).to.be.true
      expect(req.body.mind1).to.be.true
      expect(req.body.spirit1).to.equal(gratitude)
      expect(req.body.connection1).to.be.true
      expect(req.body.goals1).to.be.true
      expect(req.body.goals2).to.equal(goal)
      expect(req.body.reflections1).to.equal(reflections)
    })

    cy.get("[data-cy='submit']").click()

    cy.reload()

    cy.get("[data-cy='body1']").within(() => {
      cy.get('input[type=checkbox]').should('be.checked')
    })
    cy.get("[data-cy='body2']").within(() => {
      cy.get('input[type=checkbox]').should('be.checked')
    })
    cy.get("[data-cy='mind1']").within(() => {
      cy.get('input[type=checkbox]').should('be.checked')
    })
    cy.get("[data-cy='spirit1']").should('have.value', gratitude)
    cy.get("[data-cy='connection1']").within(() => {
      cy.get('input[type=checkbox]').should('be.checked')
    })
    cy.get("[data-cy='goals1']").within(() => {
      cy.get('input[type=checkbox]').should('be.checked')
    })
    cy.get("[data-cy='goals2']").should('have.value', goal)

    cy.get("[data-cy='reflections1']").should('have.value', reflections)
  })
})
