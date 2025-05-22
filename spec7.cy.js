describe('Carrinho de Compras', () => {
  context('Adicionar produto e verificar persistência', () => {
    beforeEach(() => {
      cy.visit("http://localhost:8000");
    });

    it('Adiciona produto ao carrinho e verifica cookie, localStorage e persistência após reload', () => {
      cy.get('#btn-add').click();

      cy.getCookie('carrinho_token')
        .should('exist')
        .and('have.property', 'value', 'carrinho456');

      cy.window().then((win) => {
        const itens = JSON.parse(win.localStorage.getItem('itens_carrinho'));
        expect(itens).to.deep.equal(['Livro de Cypress']);
      });

      cy.reload();

      cy.get('#mensagem').should('contain', 'Carrinho com 1 item');
    });
  });

  context('Reconhece carrinho ativo com dados pré-definidos', () => {
    beforeEach(() => {
      cy.visit("http://localhost:8000", {
        onBeforeLoad(win) {
          win.localStorage.setItem('itens_carrinho', JSON.stringify(['Livro de Cypress']));
          win.document.cookie = 'carrinho_token=carrinho456';
        }
      });
    });

    it('Detecta itens no carrinho ao carregar a página com dados existentes', () => {
      cy.getCookie('carrinho_token')
        .should('exist')
        .and('have.property', 'value', 'carrinho456');

      cy.get('#mensagem').should('contain', 'Carrinho com 1 item');
    });
  });
});
