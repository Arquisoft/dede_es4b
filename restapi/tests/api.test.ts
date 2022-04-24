import request, {Response} from 'supertest';
import express, { Application } from 'express';
import * as http from 'http';
import bp from 'body-parser';
import cors from 'cors';
import productRouter from "../routers/ProductRouter";
import loginRouter from "../routers/LoginRouter";
import userRouter from "../routers/UserRouter";

let app:Application;
let server:http.Server;

const mongo = require("mongoose");


beforeAll(async () => {
    app = express();
    const port: number = 5000;
    const options: cors.CorsOptions = {
        origin: ['http://localhost:3000']
    };
    app.use(cors(options));
    app.use(bp.json());
    //app.use("/api", api)

    mongo.connect('mongodb+srv://dede_es4b:dede_es4b_pass.DFSS@cluster0.v4ply.mongodb.net/shop?retryWrites=true&w=majority')
        .then(() => {
            console.log('DB Connected')
        }).catch((err:any) => {
        console.log('DB conecction error: ' + err)
    })

    app.use("/product", productRouter)
    app.use("/login", loginRouter)
    app.use("/user", userRouter)

    server = app.listen(port, ():void => {
        console.log('Restapi server for testing listening on '+ port);
    }).on("error",(error:Error)=>{
        console.error('Error occured: ' + error.message);
    });
});

afterAll(async () => {
    server.close() //close the server
    mongo.connection.close();
})

describe('products', () => {
    let idAddedProduct:any;

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

        const response:Response = await request(app).post('/product/add').send(productData).set('Accept', 'application/json');
        idAddedProduct = response.body._id;
        expect(response.statusCode).toBe(200);
    });

    it('Can find a product by its id', async () => {

        const response:Response = await request(app).get('/product/find/' + idAddedProduct).set('Accept', 'application/json');

        expect(response.statusCode).toBe(200);

    });

    it('Can find a all products', async () => {

        const response:Response = await request(app).get('/product/list').set('Accept', 'application/json');

        expect(response.statusCode).toBe(200);

    });

    it('Can update an existing  product', async ()=>{
        let productData:Object = {
            "name":'test2UPDATE',
            "sub_category":'Ropa'
        };

        const response:Response = await request(app).put('/product/update/' + idAddedProduct).send(productData).set('Accept', 'application/json');
        expect(response.statusCode).toBe(200);
        expect(response.body.msg).toEqual("Producto actualizado");
    })

    it('Can delete an existing  product', async ()=>{
        const response:Response = await request(app).delete('/product/delete/' + idAddedProduct).set('Accept', 'application/json');
        expect(response.statusCode).toBe(200);
    })

    it('Can recived a existing page by number', async ()=>{
        const response:Response = await request(app).get('/product/list/1').set('Accept', 'application/json');
        expect(response.statusCode).toBe(200);
    })

    it('Can not recived a not existing page by number', async ()=>{
        const response:Response = await request(app).get('/product/list/-1').set('Accept', 'application/json');
        expect(response.statusCode).toBe(401);
    })

    it('Can get shipping cost given a correct direcction', async () => {
        let addressTo:Object = {
            "street1": "Gonzalez besada, 4, 3A",

            "city": "Oviedo",

            "zip": "33007",

            "country": "ESP"
        };

        const response:Response = await request(app).post('/product/shippementCost').send(addressTo).set('Accept', 'application/json');
        expect(response.statusCode).toBe(200);
        expect(response.body.coste).toEqual("56.53");
    })

});

describe('login', () => {

    it('An existent user login', async () => {

        let loginData:Object = {
            userName : "ana@email.com",
            password : "123456"
        };

        const response:Response = await request(app).post('/login').send(loginData).set('Accept', 'application/json');

        expect(response.statusCode).toBe(200);

        expect(response.body.userName).toEqual("ana@email.com");
        expect(response.body.token).toBeDefined();


    });

    it('An inexistent user login', async () => {

        let loginData:Object = {
            userName : "a",
            password : "123456"
        };

        const response:Response = await request(app).post('/login').send(loginData).set('Accept', 'application/json');

        expect(response.statusCode).toBe(401);
    });

    it('An existent user login with an incorrect password', async () => {

        let loginData:Object = {
            userName : "ana@email.com",
            password : "1"
        };

        const response:Response = await request(app).post('/login').send(loginData).set('Accept', 'application/json');

        expect(response.statusCode).toBe(401);
    });

});

describe('user', () => {
    let idAddedUser:any;

    it('Register a new user', async () => {
        let userData:Object = {
            name:"prueba",
            surname:"prueba",
            userName:"prueba",
            password: "prueba"
        };

        const response:Response = await request(app).post('/user/register').send(userData).set('Accept', 'application/json');
        idAddedUser = response.body._id;
        expect(response.statusCode).toBe(200);
    });

    it('Can find a user by its id', async () => {

        const response:Response = await request(app).get('/user/find/' + idAddedUser).set('Accept', 'application/json');

        expect(response.statusCode).toBe(200);

    });

    it('Get all user list', async () => {

        const response:Response = await request(app).get('/user/list');

        expect(response.statusCode).toBe(200);

    });

    it('Can update an existing user', async ()=>{
        let userData:Object = {
            name:'pruebaUpdate',
            surname:"pruebaUpdate"
        };

        const response:Response = await request(app).put('/user/update/' + idAddedUser).send(userData).set('Accept', 'application/json');
        expect(response.statusCode).toBe(200);
        expect(response.body.msg).toEqual("Usuario actualizado");
    })

    it('Can delete an existing user', async ()=>{
        const response:Response = await request(app).delete('/user/delete/' + idAddedUser).set('Accept', 'application/json');
        expect(response.statusCode).toBe(200);
    })

});