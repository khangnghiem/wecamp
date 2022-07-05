// const app = require("./server"); // Link to your server file
// const supertest = require("supertest");
// const request = supertest(app);

import app from "./server";
import supertest from "supertest";

describe('integration test', () => {
    let request;
    beforeAll(() => {
        request = supertest(app)
    })
    it('/healthcheck', async () => {
        let response = await request.get('/healthcheck')
        console.log(response.body);

        expect(response.status).toBe(200);
        expect(response.body.message).toBeDefined();
    })

    afterAll(() => {
        app.close()
    })
})