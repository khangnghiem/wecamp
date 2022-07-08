// const app = require("./server"); // Link to your server file
// const supertest = require("supertest");
// const request = supertest(app);

import app from "./server";
import supertest from "supertest";

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

    afterEach(() => {
        app.close()
    })
})