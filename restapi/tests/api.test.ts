import request, {Response} from 'supertest';
import express, { Application } from 'express';
import * as http from 'http';
import bp from 'body-parser';
import cors from 'cors';
import api from '../api';

let app:Application;
let server:http.Server;

require('dotenv').config();

const mongo = require("mongoose");

beforeAll(async () => {
    app = express();
    const port: number = 5000;
    const options: cors.CorsOptions = {
        origin: ['http://localhost:3000']
    };
    app.use(cors(options));
    app.use(bp.json());
    app.use("/api", api)

    server = app.listen(port, ():void => {
        console.log('Restapi server for testing listening on '+ port);
    }).on("error",(error:Error)=>{
        console.error('Error occured: ' + error.message);
    });

    mongo.connect(process.env.MONGO_DB_URI)
        .then(() => {
            console.log('DB Connected')
        }).catch((err:any) => {
        console.log('DB conecction error: ' + err)
    })
});

afterAll(async () => {
    server.close() //close the server
})

describe('user ', () => {
    /**
     * Test that we can list users without any error.
     */
    it('can be listed',async () => {
        const response:Response = await request(app).get("/api/users/list");
        expect(response.statusCode).toBe(200);
    });

    /**
     * Tests that a user can be created through the productService without throwing any errors.
     */
    it('can be created correctly', async () => {
        let username:string = 'Pablo'
        let email:string = 'gonzalezgpablo@uniovi.es'
        const response:Response = await request(app).post('/api/users/add').send({name: username,email: email}).set('Accept', 'application/json')
        expect(response.statusCode).toBe(200);
    });
});

describe('products', () => {

    it('Can add a new product', async () => {
        let productData:Object = {
            name:'test1',
            price: 1.0,
            short_description: 'Test short_description',
            long_description:'Test long_description',
            brand:'Test brand',
            category:'Ténis',
            sub_category:'Ropa',
            image:'test.png'
        };

        const response:Response = await request(app).post('/api/product/add').send(productData).set('Accept', 'application/json');
        expect(response.statusCode).toBe(200);
    });

    it('Can get shipping cost given a correct direcction', async () => {
        let addressTo:Object = {
            "street1": "Gonzalez besada, 4, 3A",

            "city": "Oviedo",

            "zip": "33007",

            "country": "ESP"
        };

        const response:Response = await request(app).post('/api/product/shippementCost').send(addressTo).set('Accept', 'application/json');
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual(56.53);
    })


});