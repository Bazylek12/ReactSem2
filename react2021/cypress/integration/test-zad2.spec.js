const loginToApp = () => {
    cy.get('#fname').click().type('Test');
    cy.get('#lname').click().type('Testowy')
    cy.get('#loginButton').click();
}

describe('Shopping List E2E tests', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000')
    })
    it('After login shopping List should be rendered on right column after 3 seconds', () => {
        loginToApp();
        cy.contains('Test Testowy');
        cy.get('#loadProducts').click();
        cy.get('#product').click();
        cy.get('#spinner').should('be.visible')
        cy.wait(3000)
        cy.request('http://localhost:3000/shopingList')
            .should((response) => {
                expect(response.status).to.eq(200)
            })
        cy.get('#shoppingList').should('be.visible')
    })

    it('After click product on left column it should wait and add product to shopping list', () => {
        loginToApp();
        cy.get('#loadProducts').click();
        cy.get('#product').click();
        cy.request('http://localhost:3000/shopingList/new')
            .should((response) => {
                expect(response.status).to.eq(200)
            })
        cy.get('#spinner').should('be.visible')
        cy.wait(3000)
        cy.get('#shoppingList').should('be.visible')
    })
    it('After click product on right column it should delete it from shopping list', () => {
        loginToApp();
        cy.get('#loadProducts').click();
        cy.get('#product').click();
        cy.request('http://localhost:3000/shopingList/new')
            .should((response) => {
                expect(response.status).to.eq(200)
            });
        cy.get('#spinner').should('be.visible');
        cy.wait(2000);
        cy.get('#shoppingList').should('be.visible');
        cy.get('#shoppingList').click();
        cy.request('http://localhost:3000/shopingList/1')
            .should((response) => {
                expect(response.status).to.eq(200)
            })
        cy.wait(2000);
        cy.get('#shoppingList').should('not.exist')

    })
})