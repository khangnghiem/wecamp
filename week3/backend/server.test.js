// const app = require("./server"); // Link to your server file
// const supertest = require("supertest");
// const request = supertest(app);

import app from "./server";
import supertest from "supertest";

describe('integration test', () => {
    it('/healthcheck', async () => {
        let response = await supertest(app).get('/healthcheck')

        expect(response.status).toBe(200);
        // expect(response.body.message).toBe("pass!");
    })
})