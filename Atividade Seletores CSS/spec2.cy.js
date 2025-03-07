describe('template spec', () => {
  it('passes', () => {
    cy.visit('http://127.0.0.1:5500/index.html');

    cy.get('#register-form').should('be.visible');

    cy.get('.input-field').should('have.length', '3');

    cy.get('#register-button').should('have.text','Cadastrar');

    cy.get('.login-link');

    cy.get('input[type="text"]').type('Joào');
    cy.get('input[type="email"]').type('joao@gemil.com');
    cy.get('input[type="password"]').type('123456');

    cy.get('#register-button').click();
  })
})