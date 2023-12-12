Cypress.Commands.add('loginViaUI', (name = crypto.randomUUID()) => {
  cy.session(name, () => {
    cy.visit('/login')

    cy.get('[data-cy="email"]').type(Cypress.env('email'))
    // {enter} causes the form to submit
    cy.get('[data-cy="password"]').type(`${Cypress.env('password')}{enter}`)

    cy.url().should('contain', '/dashboard')
  })
})

// TODO While this works, it doesn't allow me to visit any pages after
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
      window.localStorage.setItem(Cypress.env('jwtTokenName'), response.body.token)
    })
  })
})
