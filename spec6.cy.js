describe('Testes de Navegação e Autenticação - EduTech', () => {

  it('Deve acessar a Home e navegar para Login', () => {
    cy.visit('/home.html');
    cy.contains('Entrar').click();
    cy.url().should('include', '/login.html');
  });

  it('Deve fazer login com sucesso', () => {
    cy.visit('/login.html');
    cy.get('#email').type('aluno@edutech.com');
    cy.get('#senha').type('curso123');
    cy.get('#login-form').submit();

    cy.url().should('include', '/painel.html');
    cy.contains('Bem-vindo, aluno!').should('be.visible');
  });

  it('Deve exibir erro para login inválido', () => {
    cy.visit('/login.html');
    cy.get('#email').type('aluno@edutech.com');
    cy.get('#senha').type('senhaerrada');

    // Para capturar o alert do navegador
    cy.window().then((win) => {
      cy.stub(win, 'alert').as('alerta');
    });

    cy.get('#login-form').submit();

    cy.get('@alerta').should('have.been.calledWith', 'E-mail ou senha incorretos!');
  });

  it('Deve proteger acesso a página Meus Cursos sem login', () => {
    cy.clearLocalStorage(); // Garante que o usuário está deslogado
    cy.visit('/meus-cursos.html');
    cy.url().should('include', '/login.html');
  });

  it('Deve fazer logout corretamente', () => {
    // Primeiro faz login
    cy.visit('/login.html');
    cy.get('#email').type('aluno@edutech.com');
    cy.get('#senha').type('curso123');
    cy.get('#login-form').submit();

    cy.url().should('include', '/painel.html');

    // Clica no botão de logout
    cy.get('#logout').click();

    // Verifica se voltou para login
    cy.url().should('include', '/login.html');
    cy.window().then((win) => {
      expect(win.localStorage.getItem('autenticado')).to.be.null;
    });
  });

});
