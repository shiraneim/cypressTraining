/// <reference types="cypress" />

describe('Dev Finance', () => {
	it('Deve cadastrar uma transação com valor positivo e validar informações da transação', () => {
		cy.visit('https://devfinance-agilizei.netlify.app/#')

		cy.get('a[class="button new"]').click()

		cy.get('div[class="modal"]').should('be.visible')
		cy.get('input[id="description"]').type('Transação com valor positivo')
		cy.get('input[id="amount"]').type("100.00")
		cy.get('input[id="date"]').type('2023-08-10')
		cy.get('div[class="input-group actions"] > button').click()

		cy.get('tr[data-index="0"] > td').eq(0).should('have.text', 'Transação com valor positivo')
		cy.get('tr[data-index="0"] > td').eq(1).should('have.text', 'R$\u00a0100,00')
		cy.get('tr[data-index="0"] > td').eq(2).should('have.text', '10/08/2023')
	})

	it('Deve cadastrar uma transação com valor negativo e validar informações da transação', () => {
		cy.visit('https://devfinance-agilizei.netlify.app/#')

		cy.get('a[class="button new"]').click()

		cy.get('div[class="modal"]').should('be.visible')
		cy.get('input[id="description"]').type('Transação com valor negativo')
		cy.get('input[id="amount"]').type("-100.00")
		cy.get('input[id="date"]').type('2023-08-10')
		cy.get('div[class="input-group actions"] > button').click()

		cy.get('tr[data-index="0"] > td').eq(0).should('have.text', 'Transação com valor negativo')
		cy.get('tr[data-index="0"] > td').eq(1).should('have.text', '-R$\u00a0100,00')
		cy.get('tr[data-index="0"] > td').eq(2).should('have.text', '10/08/2023')
	})

	it('Deve cadastrar uma transação com valor positivo (Salario mês 5000,00) e uma com valor negativo (Parcela carro 1500,00) e validar valor total', () => {
		cy.visit('https://devfinance-agilizei.netlify.app/#')

		cy.get('a[class="button new"]').click()

		cy.get('div[class="modal"]').should('be.visible')
		cy.get('input[id="description"]').type('Salário')
		cy.get('input[id="amount"]').type("5000.00")
		cy.get('input[id="date"]').type('2023-08-10')
		cy.get('div[class="input-group actions"] > button').click()

		cy.get('tr[data-index="0"] > td').eq(0).should('have.text', 'Salário')
		cy.get('tr[data-index="0"] > td').eq(1).should('contain.text', 'R$\u00a05.000,00')
		cy.get('tr[data-index="0"] > td').eq(2).should('have.text', '10/08/2023')

		cy.get('a[class="button new"]').click()

		cy.get('div[class="modal"]').should('be.visible')
		cy.get('input[id="description"]').type('Parcela carro')
		cy.get('input[id="amount"]').type("-1500.00")
		cy.get('input[id="date"]').type('2023-08-11')
		cy.get('div[class="input-group actions"] > button').click()

		cy.get('tr[data-index="1"] > td').eq(0).should('have.text', 'Parcela carro')
		cy.get('tr[data-index="1"] > td').eq(1).should('contain.text', 'R$\u00a01.500,00')
		cy.get('tr[data-index="1"] > td').eq(2).should('have.text', '11/08/2023')

		cy.get('p[id="incomeDisplay"]').should('have.text', 'R$\u00a05.000,00')
		cy.get('p[id="expenseDisplay"]').should('have.text', '-R$\u00a01.500,00')
		cy.get('p[id="totalDisplay"]').should('have.text', 'R$\u00a03.500,00')
	})

	it('Deve inserir 2 transações (Salario mês e VR) após, excluir a transação VR', () => {
		cy.visit('https://devfinance-agilizei.netlify.app/#')

		cy.get('a[class="button new"]').click()

		cy.get('div[class="modal"]').should('be.visible')
		cy.get('input[id="description"]').type('Salário')
		cy.get('input[id="amount"]').type("5000.00")
		cy.get('input[id="date"]').type('2023-08-10')
		cy.get('div[class="input-group actions"] > button').click()

		cy.get('tr[data-index="0"] > td').eq(0).should('have.text', 'Salário')
		cy.get('tr[data-index="0"] > td').eq(1).should('contain.text', 'R$\u00a05.000,00')
		cy.get('tr[data-index="0"] > td').eq(2).should('have.text', '10/08/2023')

		cy.get('a[class="button new"]').click()

		cy.get('div[class="modal"]').should('be.visible')
		cy.get('input[id="description"]').type('Vale Refeição')
		cy.get('input[id="amount"]').type("1000.00")
		cy.get('input[id="date"]').type('2023-08-11')
		cy.get('div[class="input-group actions"] > button').click()

		cy.get('tr[data-index="1"] > td').eq(0).should('have.text', 'Vale Refeição')
		cy.get('tr[data-index="1"] > td').eq(1).should('contain.text', 'R$\u00a01.000,00')
		cy.get('tr[data-index="1"] > td').eq(2).should('have.text', '11/08/2023')

		cy.get('tr[data-index="1"] > td > img').click().should('not.exist')
	})
})