import { secureStorage } from '@root/utils/storage'
import 'cypress-axe'

Cypress.Commands.add('loginViaUI', (name = crypto.randomUUID()) => {
  cy.session(name, () => {
    cy.visit('/login')

    cy.get('[data-cy="email"]').type(Cypress.env('email'))
    // {enter} causes the form to submit
    cy.get('[data-cy="password"]').type(`${Cypress.env('password')}{enter}`)

    cy.url().should('contain', '/dashboard')
  })
})

Cypress.Commands.add('loginViaAPI', (name = crypto.randomUUID()) => {
  cy.session(name, () => {
    cy.request({
      url: `${Cypress.env('apiURL')}/api/users/login`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: Cypress.env('email'),
        password: Cypress.env('password'),
      }),
    }).then(response => {
      secureStorage.setJWTToken(response.body.token)
    })
  })
})

Cypress.Commands.add('fillInSurvey', (gratitude: string, goal: string, reflections: string) => {
  cy.get("[data-cy='body1']").click()
  cy.get("[data-cy='body1']").within(() => {
    cy.get('input[type=checkbox]').should('be.checked')
  })

  cy.get("[data-cy='body2']").click()
  cy.get("[data-cy='body2']").within(() => {
    cy.get('input[type=checkbox]').should('be.checked')
  })

  cy.get("[data-cy='mind1']").click()
  cy.get("[data-cy='mind1']").within(() => {
    cy.get('input[type=checkbox]').should('be.checked')
  })

  cy.get("[data-cy='spirit1']").type(gratitude)
  cy.get("[data-cy='spirit1']").should('have.value', gratitude)

  cy.get("[data-cy='connection1']").click()
  cy.get("[data-cy='connection1']").within(() => {
    cy.get('input[type=checkbox]').should('be.checked')
  })

  cy.get("[data-cy='goals1']").click()
  cy.get("[data-cy='goals1']").within(() => {
    cy.get('input[type=checkbox]').should('be.checked')
  })

  cy.get("[data-cy='goals2']").type(goal)
  cy.get("[data-cy='goals2']").should('have.value', goal)

  cy.get("[data-cy='reflections1']").type(reflections)
  cy.get("[data-cy='reflections1']").should('have.value', reflections)
})
