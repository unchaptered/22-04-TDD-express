import * as productsController from '../../../src/products/products.controller';
import productModel from '../../../src/products/product.schema';
import httpMocks from 'node-mocks-http';

import product from '../../data/product.json';
import products from '../../data/products.json';

import productNoName from '../../data/error/product.no.name.json';
import productNoDescription from '../../data/error/product.no.description.json';
import productInvalidPrice from '../../data/error/product.invalid.price.json';

import productForPatch from '../../data/patchProduct.json';

describe('Products Controller Test', () => {

    describe('Controller List', () => {

        it('GET /products getAllProducts', () => {
            expect(typeof productsController.getAllProducts).toBe('function');
        });
        it('POST /products postProduct', () => {
            expect(typeof productsController.postProduct).toBe('function');
        });
        it('GET /products/:id getProduct', () => {
            expect(typeof productsController.getProductById).toBe('function');
        })
        it('PATCH /products/:id patchProduct', () => {
            expect(typeof productsController.patchProductById).toBe('function');
        });
        it('DELETE /products/:id deleteProduct', () => {
            expect(typeof productsController.deleteProductById).toBe('function');
        });

    });

    let req = null;
    let res = null;
    let next = null;

    beforeEach(() => {
        req = httpMocks.createRequest();
        res = httpMocks.createResponse();
        next = jest.fn();
        
        productModel.find = jest.fn();
        productModel.create = jest.fn();
        productModel.findById = jest.fn();
        productModel.findByIdAndUpdate = jest.fn();
        productModel.findByIdAndDelete = jest.fn();

    });

    describe('GET getAllProducts', () => {

        // products 가 존재하는 케이스
        it('should receive all products', async () => {
            productModel.find.mockReturnValue(products);
            await productsController.getAllProducts(req, res, next);
            expect(productModel.find).toBeCalled();
            expect(res.statusCode).toBe(201);
            expect(res._getJSONData()).toStrictEqual({
                isSuccess: true,
                message: 'success',
                result: products
            });
        });

        // products 가 존재하지 않는 케이스
        it('should receive no prodcuts', async () => {
            productModel.find.mockReturnValue([]);
            await productsController.getAllProducts(req, res, next);
            expect(productModel.find).toBeCalled();
            expect(res.statusCode).toBe(201);
            expect(res._getJSONData()).toStrictEqual({
                isSuccess: false,
                message: '{}',
                result: {}
            });
        });

        it('should/migth occure unexpectable error', async () => {
            productModel.find.mockReturnValue();
            await productsController.getAllProducts(req, res, next);
            expect(productModel.find).toBeCalled();
            expect(res.statusCode).toBe(500);
            expect(res._getJSONData()).toStrictEqual({
                isSuccess: false,
                message: '{}',
                result: {}
            })
        });
    });

    /** 
     * Pipeline 테스트는 따로 있다.
     * 즉, 여기서 invalid 테스트 하는 것은 에러 확인용이다.
     */
    describe('POST postProduct', () => {

        it('could create one product by valid data', async () => {

            req.body.product = product;
            productModel.create.mockReturnValue(product);
            await productsController.postProduct(req, res, next);
            
            expect(res.statusCode).toBe(201);
            expect(res._isEndCalled()).toBeTruthy();
            expect(res._getJSONData()).toStrictEqual({
                isSuccess: true,
                message: 'success',
                result: product
            });
            // expect(productModel.create).toBeCalledWith(product);

        });

        it('couldn\'t create one product by invalid data, no name', async () => {
            
            req.body.product = productNoName;
            await productsController.postProduct(req, res, next);

            expect(productModel.create).toBeCalled();
            expect(res.statusCode).toBe(400);
            expect(JSON.parse(res._getData())).toEqual({
                isSuccess: false,
                message: '{}',
                result: {}
            });

        });
        it('couldn\'t create one product by invalid data, no description', async () => {
            
            req.body.product = productNoDescription;
            await productsController.postProduct(req, res, next);

            expect(productModel.create).toBeCalled();
            expect(res.statusCode).toBe(400);
            expect(res._getJSONData()).toStrictEqual({
                isSuccess: false,
                message: '{}',
                result: {}
            });

        });
        it('couldn\'t create one product by invalid data, negative price', async () => {
            
            req.body.product = productInvalidPrice;
            await productsController.postProduct(req, res, next);

            expect(productModel.create).toBeCalled();
            expect(res.statusCode).toBe(400);
            expect(res._getJSONData()).toStrictEqual({
                isSuccess: false,
                message: '{}',
                result: {}
            });

        });

    });

    describe('GET getProductById', () => {

        // product 가 존재하는 케이스
        it('should receive one product', async () => {

            const _id = 'temptexts'
            req.params._id = _id;
            productModel.findById.mockReturnValue(product);
            await productsController.getProductById(req, res, next);
            expect(productModel.findById).toBeCalledWith(_id);
            expect(res.statusCode).toBe(201)
            expect(res._getJSONData()).toStrictEqual({
                isSuccess: true,
                message: "success",
                result: product
            });

        });
        
        // product 가 존재하지 않는 케이스
        it('should receive no product', async () => {

            const _id = 'temptexts'
            req.params._id = _id;
            productModel.findById.mockReturnValue(null);
            await productsController.getProductById(req, res, next);
            expect(productModel.findById).toBeCalledWith(_id);
            expect(res.statusCode).toBe(201)
            expect(res._getJSONData()).toStrictEqual({
                isSuccess: false,
                message: '{}',
                result: {}
            });

        })

        it('souhld/might occure unexpectable error', async () => {

            const errorMessage = 'test error';
            const promiseReject = Promise.reject(errorMessage);
            
            productModel.findByIdAndUpdate.mockReturnValue(promiseReject);
            await productsController.getProductById(req, res, next);
            expect(productModel.findById).toBeCalled();
            expect(res.statusCode).toBe(500)
            expect(res._getJSONData()).toStrictEqual({
                isSuccess: false,
                message: '{}',
                result: {}
            });

        });

    });

    describe('PATCH patchProdcutById', () => {

        it('should receive one product after fix', async () => {
            
            const _id = 'temptexts';
            req.params._id = _id;
            req.body = productForPatch;

            productModel.findByIdAndUpdate.mockReturnValue(productForPatch);
            await productsController.patchProductById(req, res, next);
            // expect(productModel.findByIdAndUpdate).toBeCalledWith(_id,  {});
            expect(res.statusCode).toBe(201);
            expect(res._getJSONData()).toStrictEqual({
                isSuccess: true,
                message: "success",
                result: {
                    _id, product:productForPatch
                }
            });
            
        });

        it('should receive no product after fix', async () => {

            const _id = 'temptexts';
            req.params._id = _id;
            req.body = productForPatch;

            productModel.findByIdAndUpdate.mockReturnValue(null);
            await productsController.patchProductById(req, res, next);
            // expect(productModel.findByIdAndUpdate).toBeCalledWith(_id,  {});
            expect(res.statusCode).toBe(201);
            expect(res._getJSONData()).toStrictEqual({
                isSuccess: false,
                message: '{}',
                result: {}
            });
            
        });
    
        it('should/might occure unexpectable error', async () => {
        
            // Promise.reject('test error');
            const errorMessage = 'test error';
            const promiseReject = Promise.reject(errorMessage);

            const _id = 'temptexts';
            req.params._id = _id;
            req.body = productForPatch;

            productModel.findByIdAndUpdate.mockReturnValue(promiseReject);
            await productsController.patchProductById(req, res, next);
            expect(res.statusCode).toBe(500);
            expect(res._getJSONData()).toStrictEqual({
                isSuccess: false,
                message: `\"${errorMessage}\"`,
                result: {}
            });

        });
        
    });

    describe('DELETE deleteProductById', () => {

        let _id = null;

        beforeEach(() => {
            _id = "dasmfklsdamkl";
            req.params._id = _id;
        })
        it('should receive one product after delete', async () => {
            productModel.findByIdAndDelete.mockReturnValue(product);
            await productsController.deleteProductById(req, res, next);
            expect(res.statusCode).toBe(201);
            expect(res._getJSONData()).toStrictEqual({
                isSuccess: true,
                message: 'success',
                result: { _id, product }
            })
        });

        it('shoulde receive no product after delete', async () => {
            productModel.findByIdAndDelete.mockReturnValue(null);
            await productsController.deleteProductById(req, res, next);
            expect(res.statusCode).toBe(201);
            expect(res._getJSONData()).toStrictEqual({
                isSuccess: false,
                message: '{}',
                result: {}
            })
        });

        it('should/might occure unexpectable error', async () => {
            const errorMessage = 'test error';
            const promiseReject = Promise.reject(errorMessage);

            productModel.findByIdAndDelete.mockReturnValue(promiseReject);
            await productsController.deleteProductById(req, res, next);
            expect(res.statusCode).toBe(500);
            expect(res._getJSONData()).toStrictEqual({
                isSuccess: false,
                message: `\"${errorMessage}\"`,
                result: {}
            })
        });
    });

});