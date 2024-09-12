export class FormSceen{


inputForm(name, email) {
    cy.contains('nb-card','Inline form').find('[placeholder="Jane Doe"]').type(name)
    cy.contains('nb-card','Inline form').find('[placeholder="Email"]').type(email)
    cy.contains('nb-card','Inline form').find('[type="checkbox"]').check({force: true})
    cy.contains('nb-card','Inline form').find('form').submit()

}   

}
export const formPage= new FormSceen()