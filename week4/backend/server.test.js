// const app = require("./server"); // Link to your server file
// const supertest = require("supertest");
// const request = supertest(app);

import app from "./server";
import supertest from "supertest";

describe('integration tests for new endpoints', () => {
    afterEach(() => {
        app.close()
    })
    test('should delete an item', async () => {
        let item = { title: "Khang delete" }
        // add item
        await supertest(app).post('/addproduct').send(item)
        // delete item
        let response = await supertest(app).post('/deleteproduct')
            .send(item)

        expect(response.status).toBe(200)
        
    })

    test('should give error message if item cannot be deleted', async () => {
        
    })
})

test('should get all products', async () => {
    let response = await supertest(app).get('/allproducts')
        .send({ title: "Test Product", price: "10000000" })

    expect(response.status).toBe(201);
    expect(response.body.message).toBeDefined();
})
describe('integration tests for new endpoints', () => {
    let request;
    beforeEach(() => {
        request = supertest(app)
    })

    afterEach(() => {
        app.close()
    })
    it('should successfully add product', async () => {
        let response = await supertest(app).post('/addproduct')
            .send({ title: "Test Product", price: "10000000" })

        expect(response.status).toBe(201);
        expect(response.body.message).toBeDefined();

        // delete
    })
    it('should fail to add product with a negative price', async () => {
        // add invalid product
    })
    test('should fail to add product with a STRING price', async () => {
        // add invalid product
    })
    test('should fail to add product with no title', async () => {
        // add invalid product
    })

    test('should fail to add product with no price', async () => {
        // add invalid product
    })
})

describe('integration test', () => {

    it('/healthcheck', async () => {
        // Arrange
        let request = supertest(app)

        // Act
        let response = await request.get('/healthcheck')

        // Assert
        expect(response.status).toBe(200);
        expect(response.body.message).toBeDefined();
    })
    it.todo('should respond to /badrequest with bad request');

    it('should successfully create a product', async () => {
        let response = await supertest(app).post('/product')
            .send({ title: "First Product", price: "10000000" })

        expect(response.status).toBe(201);
        expect(response.body.message).toBeDefined();
    })
    it('should fail to create a product with a negative price', async () => {
        let response = await supertest(app).post('/product')
            .send({
                title: "Final",
                price: "-10"
            })

        expect(response.status).toBe(422);
        expect(response.body.message).toBe("Invalid input, please enter a valid title and price.");
    })

    it.todo('should fail if ...');
    it.todo('should fail if ...');
    it.todo('should fail if ...');

    afterEach(() => {
        app.close()
    })
})

describe('get products', () => {
    let request;
    beforeEach(() => {
        request = supertest(app)
    })

    it('should get 0 items when initialized', async () => {
        let response = await request.get('/products')

        expect(response.status).toBe(200)
        expect(response.body.products.length).toBe(0)
    })
    it.todo('should get 1 item after adding 1 item')
    it.todo('should get 2 item after adding 2 item')
    it.todo('should get 10 item after adding 10 item')
    it.todo('should get ... item after adding ... item')
    it.todo('should get ... item after adding ... item')

    afterEach(() => {
        app.close()
    })
})