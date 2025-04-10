describe("Teste aluguel de carros", () => {
    beforeEach(() =>{
        cy.visit("http://127.0.0.1:5500/index.html");
    });

    it("Verifica elementos visiveis", () => {
        cy.contains('h1', 'Avaliação do Veículo').should('be.visible');
        cy.get('#nome').should('be.visible');
        cy.get('#comentario').should('be.visible');
        cy.get('#submit-button').should('be.visible');
        cy.get('#comentario').should('be.empty');
    });

    it("Validação dee textos e atributos", () => {
        cy.get('#submit-button').should('have.text', 'Enviar Avaliação');
        cy.get('#nome').should('have.attr', "placeholder", "Digite seu nome");
        cy.get('#comentario').should('have.attr', 'placeholder', 'Descreva sua experiência com o veículo...');
    });

    it("Teste de Funcionalidade", () =>  {
        cy.get('#nome').type('Maria');
        cy.get('#comentario').type('O carro era real eu comprovei');
        cy.get('#submit-button').click();
        cy.get('#loading').should('be.visible');
        cy.wait(3000);
        cy.get('#loading').should('not.visible');
        cy.get('#avaliacoes').should('have.text', 'Maria: O carro era real eu comprovei');
    });

    it("Teste de Erro", () => {
        cy.get('#comentario').type('O carro era real eu comprovei');
        cy.get('#submit-button').click();
        cy.on('window:alert', (text)=>{expect(text).to.contains('Preencha este campo')}).should('be.visible');

        cy.get('#nome').type('Maria');
        cy.get('#submit-button').click();
        cy.on('window:alert', (text)=>{expect(text).to.contains('Preencha este campo')}).should('be.visible');
    });
});