describe('template spec', () => {

  it('teste de pesquisas - com sucesso', () => {
    
    let mes = new Date().getMonth().toString()
    let seg = new Date().getSeconds().toString()

    let year = mes + seg

    cy.visit('https://www.wikipedia.org')
    cy.get('#searchInput').type(year)
    cy.get('.pure-button').click()

    cy.get('.mw-page-title-main').should('contain.text', year)

  })

  it('teste de troca de Idioma - com sucesso', () => {

    cy.visit('https://www.wikipedia.org')
    cy.get('#js-link-box-de').click()
    cy.get('#Willkommen_bei_Wikipedia').should('contain.text', 'Willkommen bei  Wikipedia')
  
  })

  it('teste de editar um arquivo - com falha', () => {

    cy.visit('https://www.wikipedia.org')
    cy.get('#searchInput').type('Percy Jackson & the Olympians')
    cy.get('.pure-button').click()
    cy.get('#ca-edit > a').click()
     //cy.get('.mbox-text > span').should('have.text', 'Bem-vindo/a! Por decisão da comunidade, é necessário estar regist(r)ado/a para editar ou criar artigos na Wikipédia lusófona.')
    login()
    cy.get('.mw-htmlform > :nth-child(1) > .cdx-message__icon').should('exist')
    
  })

  it('teste de login - com falha', () => {

    cy.visit('https://www.wikipedia.org')
    cy.get('#js-link-box-pt > strong').click()
    cy.get('#pt-login-2 > a > span').click()
    login()
    cy.get('.mw-htmlform > :nth-child(1) > .cdx-message__icon').should('exist')
  })
  
}) 

function login(){
  cy.get('#wpName1').type('Perseus Rick Jackson')
  cy.get('#wpPassword1').type('!@#$abcd1234')
  cy.get('#wpLoginAttempt').click()
}