describe('The Calendar Page', () => {
  beforeEach(() => {
    cy.loginViaAPI() // Server must be running for this to work
    cy.visit('/calendar')

    // Make sure the page isn't loading
    cy.get("[data-cy='loading']").should('not.exist')

    cy.injectAxe()
  })

  it('should test the accessibility of the survey page', () => {
    cy.checkA11y('#root')
  })

  it('should find these elements', () => {
    cy.get('[data-cy="todays-score-label"]').should('be.visible')
    cy.get('[data-cy="todays-score-value"]').should('be.visible')

    cy.get('[data-cy="total-score-label"]').should('be.visible')
    cy.get('[data-cy="total-score-label"]').should('be.visible')
  })
})
