describe('Teste - revisão', () => {

  beforeEach(() => {
    cy.visit('http://localhost:8000');
  });

  it('Login com Espera Explícita', () => {
    cy.get('#username').type('admin');
    cy.get('#password').type('admin123');
    cy.get('#loginBtn').click();

    cy.url().should('include', 'dashboard.html');

    cy.contains('Bem-vindo, admin!').should('be.visible');
  });

  it('Verificação de Cookie', () => {
    cy.get('#username').type('admin');
    cy.get('#password').type('admin123');
    cy.get('#loginBtn').click();

    cy.url().should('include', 'dashboard.html');

    cy.getCookie('session_id').should('exist').and((cookie) => {
      expect(cookie.value).to.not.be.empty;
      expect(cookie.path).to.equal('/');
    });
  });

  it('Verificação de LocalStorage e Persistência de Tema', () => {
    cy.get('#username').type('admin');
    cy.get('#password').type('admin123');
    cy.get('#loginBtn').click();

    cy.url().should('include', 'dashboard.html');

    cy.get('#toggleTheme').click();

    cy.window().then((win) => {
      expect(win.localStorage.getItem('theme')).to.eq('dark');
    });

    cy.reload();

    cy.get('body').should('have.class', 'dark');
  });

  it('Navegação Interna com Espera Implícita', () => {
    cy.get('#username').type('admin');
    cy.get('#password').type('admin123');
    cy.get('#loginBtn').click();

    cy.url().should('include', 'dashboard.html');

    cy.get('#perfilBtn').click();
    cy.contains('Nome: admin').should('be.visible');

    cy.get('#configBtn').click();
    cy.contains('Preferências do usuário').should('be.visible');
  });

  it('Logout', () => {
    cy.get('#username').type('admin');
    cy.get('#password').type('admin123');
    cy.get('#loginBtn').click();

    cy.url().should('include', 'dashboard.html');

    cy.get('#logoutBtn').click();

    cy.getCookie('session_id').should('not.exist');

    cy.url().should('include', 'index.html');
  });
});
