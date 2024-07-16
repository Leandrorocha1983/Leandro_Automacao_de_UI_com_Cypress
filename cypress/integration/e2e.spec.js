/// <reference types="cypress" />

context('Exercicio - Testes End-to-end - Fluxo de pedido', () => {
    /*  Como cliente 
        Quero acessar a Loja EBAC 
        Para fazer um pedido de 4 produtos 
        Fazendo a escolha dos produtos
        Adicionando ao carrinho
        Preenchendo todas opções no checkout
        E validando minha compra ao final */

    //beforeEach(() => {
    //    cy.visit('minha-conta')
    //});


    it('Deve fazer um pedido na loja Ebac Shop de ponta a ponta', () => {
        cy.visit('minha-conta')
        cy.fixture('perfil').then((dados) => {
            cy.login(dados.usuario, dados.senha)
        })
        cy.get('.page-title').should('contain', 'Minha conta')

        // Para fazer o pedido acessar a pagina comprar
    
        cy.get('#primary-menu > .menu-item-629 > a').click()

        // Para adicionar 4 produtos ao carrinho

        var quantidadeProduto = 2
        cy.addProdutos('Atlas Fitness Tank', 'S', 'Blue', quantidadeProduto)
        
        /// acessar outra pagina 
        cy.get(':nth-child(2) > .page-numbers').click()

        var quantidadeProduto = 3
        cy.addProdutos('Augusta Pullover Jacket', 'S', 'Red', quantidadeProduto)

        /// acessar outra pagina 
        cy.get(':nth-child(3) > .page-numbers').click()

        var quantidadeProduto = 1
        cy.addProdutos('Circe Hooded Ice Fleece', 'L', 'Gray', quantidadeProduto)

        // acessar outra pagina 
        cy.get(':nth-child(3) > .page-numbers').click()

        var quantidadeProduto = 1
        cy.addProdutos('Daphne Full-Zip Hoodie', 'M', 'Purple', quantidadeProduto)

        // acessando carrinho de compras
        cy.get('.dropdown-toggle > .text-skin > .icon-basket').click()
        cy.get('#cart > .dropdown-menu > .widget_shopping_cart_content > .mini_cart_content > .mini_cart_inner > .mcart-border > .buttons > .checkout').click()

        cy.visit('checkout')
        cy.preencherCheckout()
        cy.get('.woocommerce-notice').should('contain', 'Obrigado. Seu pedido foi recebido.')
    });

   

   
})
