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
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
import { faker } from '@faker-js/faker';

Cypress.Commands.add('login', (usuario, senha) => {
    cy.get('#username').type(usuario)
    cy.get('#password').type(senha, {log: false})
    cy.get('.woocommerce-form > .button').click()
});

Cypress.Commands.add('addProdutos', (produto, tamanho, cor, quantidade) => {
    cy.get('.products > .row')
        .contains(produto).click()

    cy.get('.button-variable-item-' + tamanho).click()
    cy.get('.button-variable-item-' + cor).click()
    cy.get('.input-text').clear().type(quantidade)
    cy.get('.single_add_to_cart_button').click()
    // cy.get('.woocommerce-message').should('contain', quantidade, 'x', produto, 'foram adicionados ao seu carrinho.') não funciona para somente 1 unidade
    cy.get('.woocommerce-message').should('contain', produto, 'foram adicionados ao seu carrinho.') // aceito para toda quantidade adquerida do item
    cy.get('#primary-menu > .menu-item-629 > a').click()
});

Cypress.Commands.add('preencherCheckout', () => {
    cy.get('#billing_first_name').clear().type(faker.name.firstName())
    cy.get('#billing_last_name').clear().type(faker.name.lastName())
    cy.get('#billing_company').clear().type(faker.company.bs())
    cy.get('#select2-billing_country-container').type('Brasil').click() // Pais
    cy.get('#billing_address_1').clear().type(faker.address.city())
    cy.get('#billing_address_2').clear().type('000')
    cy.get('#billing_city').clear().type(faker.address.cityName())
    cy.get('#select2-billing_state-container').type('São Paulo').click() // Estado
    cy.get('#billing_postcode').clear().type('66065112')
    cy.get('#billing_phone').clear().type(faker.phone.number('+48 91 ### ## ##'))
    cy.get('#billing_email').clear().type(faker.internet.email())
    cy.get('#payment_method_cod').check()
    cy.get('#terms').check()
    cy.get('#place_order').click()
})
     
