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
      .contains('Unsere Lösungen')
      .click()
    cy.url().should('eq', 'http://localhost:3000/Unsere-L%C3%B6sungen/')
    cy.get(
      '.h-full.ui-flex.ui-items-center.ui-justify-center.ui-px-5.ui-py-4.ui-uppercase.ui-tracking-widest.ui-text-xs'
    )
      .last()
      .trigger('mouseover')
      .get('.ui-block.ui-px-5.ui-py-2')
      .contains('Englisch')
      .click({ force: true })
    cy.url().should('eq', 'http://localhost:3000/Our-Solutions/')
  })
  it('should refer to the correct URL after navigating backwards', () => {
    cy.get(
      '.h-full.ui-flex.ui-items-center.ui-justify-center.ui-px-5.ui-py-4.ui-uppercase.ui-tracking-widest.ui-text-xs'
    )
      .contains('Unsere Lösungen')
      .click()
    cy.get(
      '.h-full.ui-flex.ui-items-center.ui-justify-center.ui-px-5.ui-py-4.ui-uppercase.ui-tracking-widest.ui-text-xs'
    )
      .last()
      .trigger('mouseover')
      .get('.ui-block.ui-px-5.ui-py-2')
      .contains('Englisch')
      .click({ force: true })
    cy.go(-1)
    cy.get(
      'ui-mx-auto.ui-relative.sm:ui-container.ui-px-6.md:ui-px-10.lg:ui-px-12.ui-py-6.md:ui-py-12.lg:ui-py-24'
    )
      .last()
      .should('contain', 'Klimatisierung')
  })
})
