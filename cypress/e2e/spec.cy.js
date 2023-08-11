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
		cy.get('tr[data-index="0"] > td').eq(1).should('contain.text', '100,00')
		cy.get('tr[data-index="0"] > td').eq(2).should('have.text', '10/08/2023')
	})
})