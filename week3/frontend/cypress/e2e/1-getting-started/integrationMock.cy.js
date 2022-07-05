


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
                url: 'http://localhost:8000/healthcheck'
            },
            {
                body: 'mocked'
            }
        ).as('healthcheck')
    });


    it('integration test', () => {
        cy.visit('http://localhost:3000').then(() => {
            fetch('http://localhost:8000/healthcheck', { method: 'GET' })
                .then((r) => r.json())
                .then((body) => {
                    cy.log(body)
                })

        })

        cy.wait('@healthcheck').its('response.statusCode').should('eq', 200)
        // cy.wait('@healthcheck').its('response.body').should('include', 'mocked')
        cy.wait('@healthcheck').its('response.body').should('include', 'mocked')
    })
    it('integration test 2', () => {
        cy.visit('http://localhost:3000').then(() => {
            fetch('http://localhost:8000/products', { method: 'GET' })
                .then((r) => r.json())
                .then((body) => {
                    cy.log(body)
                })

        })

        cy.wait('@products').its('response.statusCode').should('eq', 200)
        cy.wait('@products').its('response.body').should('include', 'mocked products')
    })

})
