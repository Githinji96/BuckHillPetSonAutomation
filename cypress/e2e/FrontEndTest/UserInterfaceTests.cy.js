

describe('Ecommerce website', () => {
  beforeEach(() => {
    // Call the custom login command
    cy.visitUrl(); 
  });
  //display items and prices
  it('display of items on home page', () => {
  cy.get(':nth-child(3) > .section-title').click();
  cy.get(':nth-child(2) > .accordion__body > ul > :nth-child(2)').click()
    cy.get('.shop__products-wrapper > ')
        .each((product, index) => {
          // Access and print details of each product
          cy.wrap(product)
            .find('.product-card__title')
            .invoke('text')
            .then((title) => {
              cy.log(`Item ${index + 1}: ${title}`);
            });
    
          cy.wrap(product)
            .find('.product-card__price') 
            .invoke('text')
            .then((price) => {
              cy.log(`Price: ${price}`);
            });
  
        });
    });
    
    it('Filter products based on brands' ,()=>{
       //click the product category
      cy.get(':nth-child(3) > .section-title').click({force:true})
      cy.get(':nth-child(2) > .accordion__body > ul > :nth-child(4)').click()
      cy.get('.product-card__title').each(($product) => {
      const productName = $product.text();
      cy.log(productName);
              
      });
    })

       //Filter the products based on the category
     it.only('Filter products based on Category',()=>{
     cy.get(':nth-child(3) > .section-title').click({force: true})
         cy.wait(1000)
         cy.get(':nth-child(3) > .accordion__body > ul > :nth-child(2)').click()

        cy.get('.product-card__title').each(($product, index) => {
         cy.wrap($product).invoke('text').then((productName) => {
           cy.log(`Product ${index + 1}: ${productName}`);//print all products
           expect(productName).to.not.be.empty; // Assertion to check product name is not empty
  
          
        });
      })
    })

     it('Search products',()=>{
      cy.get('#input-4').type(' Fresh Step Scented{enter}')
      cy.get('.v-list-item').click()
      cy.get('#__nuxt > div > div > nav > main > div > div > div > div > div.v-col.v-col-5 > div > p.product__title')
      .should('have.text','Fresh Step Scented Litter with The Power of Febreze, Clumping Cat Litter')

     })
    //The script randomly add to cart an item
    it('add a single product to cart randomly',()=>{
     // cy.get(':nth-child(3) > .section-title').click();
   //   cy.get(':nth-child(2) > .accordion__body > ul > :nth-child(2)').click()
           cy.get('.product-card__title').then(($el) => {

                let i = Math.floor(Math.random() * ($el.toArray()).length)               
                cy.get($el.toArray()[i]).click()
                cy.get('.product__actions-wrapper > .v-btn').click()

                //click cart
                cy.get('.v-toolbar__content > .v-container > :nth-child(3) > :nth-child(1)').
                should('have.text', ' Cart (1) ').click()

                //verify the cart page
                cy.url().should('eq','https://pet-shop.buckhill.com.hr/cart')

                //proceed to checkout
               cy.get('.v-btn--elevated').should('have.text', ' Proceed to checkout ').click()

               //Verify the checkout page
               cy.url().should('eq','https://pet-shop.buckhill.com.hr/checkout')
                // Assert checkout page
               cy.contains('Checkout')
               .should('be.visible')
               .then(() => {
               cy.contains('Shipping address').should('be.visible');
                  });

                  //enter customer infomation
                  //Enter username
                  cy.xpath('//input[@id="input-36"]').type('John')
                  cy.xpath('//input[@id="input-38"]').type('Doe')
                  //enter Address
                  cy.xpath('//input[@id="input-40"]').type('Street 45')
                  cy.xpath('//input[@id="input-42"]').type('North 34')
                  cy.xpath('//input[@id="input-44"]').type('Nakuru')
                  cy.xpath('//input[@id="input-46"]').type('Monrovia')
                  cy.xpath('//input[@id="input-48"]').type('6000')
                  cy.xpath('//input[@id="input-50"]').type('Kenya')
                //   cy.xpath('//button[@class="v-btn v-btn--flat v-theme--PetGreen v-btn--density-default v-btn--size-default v-btn--variant-elevated primary500 text-white ml-5"]').click()

                  //click Next button
                  cy.get('.action-btns > .v-btn').should('have.text',' Next ').click()
                  //select the type of payment as cash on dilevery
                  cy.get(':nth-child(2) > .v-card').click()
                  cy.contains('Cash on delivery').should('be.visible')
                  cy.xpath('//input[@id="input-58"]').type('John')
                  cy.xpath('//input[@id="input-60"]').type('Doe')
                  cy.xpath('//input[@id="input-62"]').type('Street 45')
                  cy.xpath('//input[@id="input-64"]').type('0714597899')
                  cy.xpath('//input[@id="input-66"]').type('Atlanta')
                  cy.xpath('//input[@id="input-68"]').type('york')
                  cy.xpath('//input[@id="input-70"]').type('5000')
                  cy.xpath('//input[@id="input-72"]').type('street 67')
                  //click checkbox
                  cy.xpath('//input[@id="checkbox-74"]').click()
                  cy.get('.primary500').click()

                  // Review your order page
                  cy.url().should('eq','https://pet-shop.buckhill.com.hr/checkout')
                  cy.get('h3.text-h6').should('have.text','Review your order')

                //Place an order
                cy.get('.action-btns > .v-btn').click()
        })
    })
  })
  

