function groupMenuItem(menuItemName){
    cy.get(`[title="${menuItemName}"]`).siblings().invoke('attr','class').then(check =>{
        if(check.includes('collapsed')){
            cy.contains(menuItemName).click();

        }
    })
}

export class PageModel{

    formlayoutPage(){
        groupMenuItem("Forms");
        cy.contains('Form Layouts').click();
        
    }
    datePicker(){
        groupMenuItem("Forms");
        cy.contains('Datepicker').click();
    
    }
    toastItem(){
        groupMenuItem("Modal & Overlays");
        cy.contains('Toastr').click();

    }
    toolTip(){
        groupMenuItem("Modal & Overlays");
        cy.contains('Tooltip').click();
    }
    alert(){
        groupMenuItem("Tables & Data");
        cy.contains('Smart Table').click();
    }

    

}

export const pageModel= new PageModel();