const loginToApp = () => {
    cy.get('#fname').click().type('Test');
    cy.get('#lname').click().type('Testowy')
    cy.get('#loginButton').click();
}

describe('Shopping List E2E tests', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000')
    })
    it('Input correct filter after input "cz" should shown "pieczarki" and "czajnik"', () => {
        loginToApp();
        cy.contains('Test Testowy');
        cy.get('#loadProducts').click();
        cy.get('#filter').click().type('cz');
        cy.contains('pieczarki');
        cy.contains('czajnik');
    })
    it('After checking the checkbox products list should contains only food', () => {
        loginToApp();
        cy.contains('Test Testowy');
        cy.get('#loadProducts').click();
        cy.get('[type="checkbox"]').check()
        cy.window().its('store').invoke('getState')
    })
})
