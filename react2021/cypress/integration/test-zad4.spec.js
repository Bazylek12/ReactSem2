const loginToApp = () => {
    cy.get('#fname').click().type('Test');
    cy.get('#lname').click().type('Testowy')
    cy.get('#loginButton').click();
}

describe('Shopping List E2E tests', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000')
    })
    it(`After right click on product in left column it should navigate to product details 
            press the back arrow should navigate to previous page`, () => {
        loginToApp();
        cy.contains('Test Testowy');
        cy.get('#loadProducts').click();
        cy.get('#product').rightclick();
        cy.get('#productSpinner').should('be.visible');
        cy.wait(2000);
        cy.url().should('include', '/details');
        cy.get('#productName').should('be.visible');
        cy.get('#category').should('be.visible');
        cy.get('#isFood').should('be.visible');
        cy.get('#goBack').click()
        cy.url().should('eq', 'http://localhost:3000/products/dashboard');
        cy.request('http://localhost:3000/shopingList')
            .should((response) => {
                expect(response.status).to.eq(200)
            })
        cy.get('#product').should('be.visible');
        cy.get('#shoppingList').should('be.visible');
    })
})
