/// <reference types="cypress" />

const { baseURL } = require("tinymce")


describe(' My first test', () =>{
    it('find element by locators', () =>{
        cy.visit('/')
        cy.contains('Forms').click();
        cy.contains('Form Layouts').click();



        // by tag name:
        cy.get('input');
        // by ID
        cy.get('#inputEmail')
        //by class value
        cy.get('.input-full-width')
         // by attribute name
         cy.get('[fullwidth]')

         //by attribute and value
         cy.get('[placeHolder= "Email"]')

         // by entire class value
         cy.get('[class="input-full-width size-medium shape-rectangle"]')

         // by two attributes
         cy.get('[placeHolder= "Email"][fullwidth]')
        // by tag, attribute id and class
        cy.get('input[fullwidth]#inputEmail.input-full-width')

        // by data-cy
        cy.get('[data-cy="email]')


    }),
    it('finding web element ', () => {
        cy.visit('/')
        cy.contains('Forms').click();
        cy.contains('Form Layouts').click();

        //get() - find web elements by locator golobally
        // find() - find child elements by locator
        //contains() - find html text and by text  and locator
        cy.contains('[status="warning"]','Sign in');
        cy.contains('nb-card','Horizontal form').find('button')
        cy.contains('nb-card','Horizontal form').contains('Sign in')
        // cypress chains
        cy.get('#inputEmail3')
            .parents('form')
            .find('button')
            .should('contain','Sign in')
            .parents('form')
            .find('nb-checkbox')
            .click();

    })
    it('saving subject of the command', ()=>{
        cy.visit('/')
        cy.contains('Forms').click();
        cy.contains('Form Layouts').click();
        cy.contains('nb-card','Horizontal form').find('[for="inputEmail3"]').should('contain','Email')
        cy.contains('nb-card','Horizontal form').find('[for="inputPassword3"]').should('contain','Password')

        // 1. cypress as
        // chúng ta cần khai báo những cái chung để dùng lại:
        cy.contains('nb-card','Horizontal form').as('horizontalForm')
        cy.get('@horizontalForm').find('[for="inputEmail3"]').should('contain','Email')
        cy.get('@horizontalForm').find('[for="inputPassword3"]').should('contain','Password')

        // 2. cypress then() method
        cy.contains('nb-card','Horizontal form').then(horizontalForm  =>{
            cy.wrap(horizontalForm).find('[for="inputEmail3"]').should('contain','Email')
            cy.wrap(horizontalForm).find('[for="inputPassword3"]').should('contain','Password')



        })


    })
    it('extract text value', ()=>{
        cy.visit('/')
        cy.contains('Forms').click();
        cy.contains('Form Layouts').click();

//1

cy.get('[for="exampleInputEmaill"]').should('contain', 'Email address') 

//2

cy.get('[for="exampleInputEmaill"]').then(label => {

const labelText= label.text()

expect(labelText).to.equal('Email address') 
cy.wrap(labelText).should('contain', 'Email address')

})

//3 
cy.get('[for="exampleInputEmaill"]').invoke('text').then(text=> { expect(text).to.equal('Email address')

}) 
cy.get('[for="exampleInputEmail1"]').invoke('text').as('labelText').should('contain', 'Email address')

//4
 cy.get('[for="exampleInputEmail1"]').invoke('attr', 'class').then(classValue => {

expect(classValue).to.equal('label')

})

//5 invoke property

cy.get('#exampleInputEmail1').type('test@test.com')

cy.get('#exampleInputEmaill').invoke('prop', 'value').should('contain', 'test@test.com').then( property=>{

expect(property).to.equal('test@test.com')
})

    })
    it('test',()=>{
        cy.visit('/')
        cy.contains('Forms').click();
        cy.contains('Form Layouts').click();
        cy.get('#exampleInputEmail1').invoke('attr','placeholder').then(placeholder =>{
    expect(placeholder).to.equal('Email')
        })
        cy.get('[for="exampleInputEmail1"]').invoke('text').should('contain','Email address')
        
    })

    it('checkbox and radio', ()=>{
        cy.visit('/')
        cy.contains('Forms').click();
        cy.contains('Form Layouts').click();

        cy.contains('nb-card','Using the Grid').find('[type="radio"]').then(radioBtn =>{
            cy.wrap(radioBtn).eq(0).check({force: true}).should('be.checked')
            cy.wrap(radioBtn).eq(2).check({force: true}).should('be.checked')
            cy.wrap(radioBtn).eq(0).should('not.be.checked')

        })

        

    })
    it('checkbox', ()=>{
        cy.visit('/')
        cy.contains('Modal & Overlays').click();
        cy.contains('Toastr').click();

        cy.get('[type="checkbox"]').check({force: true})
        // cy.get('[type="checkbox"]').eq(0).click({force: true})
        // cy.get('[type="checkbox"]').eq(0).click({force: true})

    })
    it('Datepicker', ()=>{

        function navigateToMontFuture(day){
                let date= new Date()
                date.setDate(date.getDate() + day)
                let dateFuture= date.getDate()
                let monthFuture = date.toLocaleDateString('en-US',{month : "short"})
                let yearFuture = date.getFullYear()
                let dateToAssertion= `${monthFuture} ${dateFuture}, ${yearFuture}`

                cy.get('nb-calendar-navigation').invoke('attr','ng-reflect-date').then( currentDate =>{
                    if(!currentDate.includes(monthFuture) || !currentDate.includes(yearFuture) ){
                        cy.get('[data-name="chevron-right"]').click()
                        navigateToMontFuture(day)
                    }else{
                        cy.get('.day-cell').not('.bounding-month').contains(dateFuture).click({force: true})

                    }

                })
                return dateToAssertion;

        }


        cy.visit('/')
        cy.contains('Forms').click();
        cy.contains('Datepicker').click();
        
        cy.contains('nb-card','Common Datepicker').find('input').then(datePicker =>{

            cy.wrap(datePicker).click();
            const dateToAssertion=  navigateToMontFuture(90)
            cy.wrap(datePicker).invoke('val').should('contain',dateToAssertion)
        })


    })

    it('dropdown list', () =>{
        cy.visit('/')

        // cy.get('.select-button').click()
        // cy.get('nb-option').contains('Dark').click()
        // cy.get('.select-button').should('contain', 'Dark')

        cy.get('.select-button').then(droplist =>{
            cy.wrap(droplist).click()
            cy.get('nb-option').each((listItem, index)=>{
                let itemValue= listItem.text().trim()

                if(index<3){
                    cy.wrap(listItem).click();
                    cy.wrap(droplist).should('contain', itemValue)
                }
                
                cy.wrap(droplist).click()



            })

        })






    })
    it('tooltip',() =>{
        cy.visit('/')
        cy.contains('Modal & Overlays').click();
        cy.contains('Tooltip').click();

        //
        cy.contains('nb-card', 'Colored Tooltips').then( tooltip =>{
            cy.wrap(tooltip).contains('button','Default').click()
            cy.get('nb-tooltip').contains('This is a tooltip')
        })

    })
    it.only('alert message',() =>{
        cy.visit('/')
        cy.contains('Tables & Data').click();
        cy.contains('Smart Table').click();

        //
        cy.get('tbody tr').first().find('.nb-trash').click()
        cy.on('window:confirm', alert =>{
            expect(alert).to.equal('Are you sure you want to delete?')
        })

    })


})