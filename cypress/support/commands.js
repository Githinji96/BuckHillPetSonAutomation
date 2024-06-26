// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//user interface login commands
Cypress.Commands.add('visitUrl', () => {
    cy.visit('https://pet-shop.buckhill.com.hr/')

});
   //custom command for admin login
 Cypress.Commands.add('adminLogin',()=>{
    cy.visit('https://pet-shop.buckhill.com.hr/login')
    cy.get('#input-0').type('admin@buckhill.co.uk')
    cy.get('#input-2').type('admin')
    cy.get('.v-btn').click()
        
 })
