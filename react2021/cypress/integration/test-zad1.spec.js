const loginToApp = () => {
    cy.get('#fname').click().type('Test');
    cy.get('#lname').click().type('Testowy')
    cy.get('#loginButton').click();
}

describe('Shopping List E2E tests', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000')
    })
    it('Should fill inputs and login to app', () => {
        loginToApp();
    })

    it('After login should visible name and last name click on logout button should redirect to main page', () => {
        loginToApp();
        cy.contains('Test Testowy');
        cy.get('#logoutButton').click();
        cy.url().should('eq', 'http://localhost:3000/');
        cy.get('#loginButton').should('be.disabled');
        cy.get('#fname').should('be.empty')
        cy.get('#lname').should('be.empty')
    })
    it('After login and pressing load products it should waiting for GET request and shown listed products', () => {
        loginToApp();
        cy.contains('Test Testowy');
        cy.get('#loadProducts').click();
        cy.get('#product').click();
        cy.get('#shoppingList').should('be.visible')
        cy.request('http://localhost:3000/products')
            .should((response) => {
                expect(response.status).to.eq(200)
            })
        cy.get('#product').should('be.visible')
    })

})