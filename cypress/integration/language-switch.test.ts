describe('Language-Switch', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/Startseite')
  })
  it('should refer to the english URL of the current page', () => {
    cy.get(
      '.h-full.ui-flex.ui-items-center.ui-justify-center.ui-px-5.ui-py-4.ui-uppercase.ui-tracking-widest.ui-text-xs'
    )
      .last()
      .trigger('mouseover')
      .get('.ui-block.ui-px-5.ui-py-2')
      .contains('Englisch')
      .click({ force: true })
    cy.url().should('eq', 'http://localhost:3000/Home/')
  })
  it('should refer to the right URL after Navigating to another URL', () => {
    cy.get(
      '.h-full.ui-flex.ui-items-center.ui-justify-center.ui-px-5.ui-py-4.ui-uppercase.ui-tracking-widest.ui-text-xs'
    )
      .contains('Fachhändler')
      .click()
    cy.url().should('eq', 'http://localhost:3000/Fachhaendler/')
    cy.get(
      '.h-full.ui-flex.ui-items-center.ui-justify-center.ui-px-5.ui-py-4.ui-uppercase.ui-tracking-widest.ui-text-xs'
    )
      .last()
      .trigger('mouseover')
      .get('.ui-block.ui-px-5.ui-py-2')
      .contains('Englisch')
      .click({ force: true })
    cy.url().should('eq', 'http://localhost:3000/Specialized-Dealers/')
  })
  it('should refer to the correct URL after navigating backwards', () => {
    cy.get(
      '.h-full.ui-flex.ui-items-center.ui-justify-center.ui-px-5.ui-py-4.ui-uppercase.ui-tracking-widest.ui-text-xs'
    )
      .contains('Fachhändler')
      .click()
    cy.get(
      '.h-full.ui-flex.ui-items-center.ui-justify-center.ui-px-5.ui-py-4.ui-uppercase.ui-tracking-widest.ui-text-xs'
    )
      .last()
      .trigger('mouseover')
      .get('.ui-block.ui-px-5.ui-py-2')
      .contains('Englisch')
      .click({ force: true })
    cy.go('back')
    cy.url().should('eq', 'http://localhost:3000/Fachhaendler/')
  })
})
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
