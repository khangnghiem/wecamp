


describe('test mock backend', () => {
    beforeEach(() => {
        cy.intercept(
            {
                method: 'GET',
                url: 'http://localhost:8000/products'
            },
            {
                body: 'mocked products'
            }
        ).as('products')

        cy.intercept(
            {
                method: 'GET',
                url: 'http://localhost:8000/healthcheck2'
            },
            {
                body: 'mocked'
            }
        ).as('healthcheck')
    });


    it('mocked API test', () => {
        cy.visit('http://localhost:3000').then(() => {
            fetch('http://localhost:8000/healthcheck2', { method: 'GET' })
        })

        // cy.wait('@healthcheck').its('response.statusCode').should('eq', 200)
        cy.wait('@healthcheck').its('response.body').should('include', 'mocked')
    })

    it('mocked API test 2', () => {
        cy.visit('http://localhost:3000').then(() => {
            fetch('http://localhost:8000/products', { method: 'GET' })
        })

        cy.wait('@products').its('response.statusCode').should('eq', 200)
        cy.wait('@products').its('response.body').should('include', 'mocked products')
    })

})