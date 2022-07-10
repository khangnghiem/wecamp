/// <reference types="cypress" />

// Welcome to Cypress!
//
// This spec file contains a variety of sample tests
// for a todo list app that are designed to demonstrate
// the power of writing tests in Cypress.
//
// To learn more about how Cypress works and
// what makes it such an awesome testing tool,
// please read our getting started guide:
// https://on.cypress.io/introduction-to-cypress



describe('example test with Cypress', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
  })

  it('displays MERN Shop', () => {
    cy.get('[data-testid=header]').should('contain', 'MERN Shop')
    cy.get('.header').should('contain', 'MERN Shop')
  })

  it('integration test', () => {
    cy.request('http://localhost:8000/healthcheck').then((response) => {
      expect(response.body.status).to.eq(200)
      expect(response.body.message).to.exist
    })
  })
})
