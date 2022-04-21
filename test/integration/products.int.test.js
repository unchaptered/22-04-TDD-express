import request from 'supertest';
import app from '../../src/app';

import product from '../data/product.json';
import productNoName from '../data/error/product.no.name.json';
import productNoDescription from '../data/error/product.no.description.json';
import productInvalidPrice from '../data/error/product.invalid.price.json';
import { getAllProducts } from '../../src/products/products.controller';

describe('Product Integration Test', () => {

    let getContentType = null;
    let getAccept = null;

    let postProducts = null;
    let getAllProducts = null;

    const BASE_URL = '/products';

    beforeAll(() => {
        getContentType = () => ['Content-Type', 'application/json'];
        getAccept = () => ['Accept', 'application/json'];

        postProducts = async (data) => {
            const response = await request(app)
                                    .post(BASE_URL)
                                    .set(...getContentType())
                                    .set(...getAccept())
                                    .send({ ...data });
            return response;
        };

        getAllProducts = async () => {
            const response = await request(app)
                                    .get(BASE_URL)
                                    .set(...getContentType())
                                    .set(...getAccept())
                                    .send();

            return response;
        };
    });

    describe('POST /products postProduct', () => {

        it('Valid Usecase', async () => {
            const response = await postProducts(product);
            expect(response.statusCode).toBe(201);
        });
        it('Invalid Usecase 1', async () => {
            const response = await postProducts(productNoName);
            expect(response.statusCode).toBe(400);
        });
        it('Invalid Usecase 2', async () => {
            const response = await postProducts(productNoDescription);
            expect(response.statusCode).toBe(400);
        });
        it('Invalid Usecase 3', async () => {
            const response = await postProducts(productInvalidPrice);
            expect(response.statusCode).toBe(400);
        });

    });
    
    describe('GET /products getAllProducts', () => {

        it('Valid Usecase', async () => {
            const response = await getAllProducts();
            expect(response.statusCode).toBe(201);
            expect(typeof response.body.isSuccess).toBe('boolean');
            expect(typeof response.body.message).toBe("string");
            expect(Array.isArray(response.body.result)).toBe(true);
            expect(response.body.result[0].name).toBeDefined();
            expect(response.body.result[0].description).toBeDefined();
        });
    });
});