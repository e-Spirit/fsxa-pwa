describe('content-projection', () => {
  it('should display the current product after language switch in correct language', () => {
    cy.visit('http://localhost:3000/Produkte/Thermo-NUK-33.html')
    cy.get(
      '.h-full.ui-flex.ui-items-center.ui-justify-center.ui-px-5.ui-py-4.ui-uppercase.ui-tracking-widest.ui-text-xs'
    )
      .last()
      .trigger('mouseover')
      .get('.ui-block.ui-px-5.ui-py-2')
      .contains('Englisch')
      .click({ force: true })
    cy.url().should('eq', 'http://localhost:3000/Products/Thermo-NUK-33.html')
  })
})
