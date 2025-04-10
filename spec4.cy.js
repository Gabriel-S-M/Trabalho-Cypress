describe('Teste na Pagina de Comentarios', () => {
    beforeEach(() => {
        cy.visit("http://127.0.0.1:5500/index.html");
    });

    it("Verificar os elementos visiveis", () => {
        cy.contains('h1', 'Deixe seu comentário');
        cy.get('#submit-button').should('be.visible');
        cy.get('#comment-section').should('be.empty');
    });

    it("Verifica textos nos botões", () => {
        cy.get("#submit-button").should('have.text', "Enviar Comentário");
    });

    it("Verifica atributo dos campos de entrada", () => {
        cy.get('#nome').should('have.attr', "placeholder", "Digite seu nome");
        cy.get('#comentario').should('have.attr', 'placeholder', "Escreva seu comentário aqui...");
    });

    it("Manipula estados assincronis e add comentario", () =>{
        cy.get('#nome').type('João');
        cy.get('#comentario').type("Ótima postagem!");

        cy.get('#submit-button').click();
        cy.get('#loading').should('be.visible');

        cy.wait(2000);

        cy.get('#loading').should('not.visible');
        cy.get('#comment-section').should('have.text', "João: Ótima postagem!");
    });
})