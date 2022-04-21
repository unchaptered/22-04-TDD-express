import httpMocks from 'node-mocks-http';
import { productValidationPipe } from '../../../src/pipe/validation.pipe';
import ResponseFactory from '../../../src/classes/factory/response.factory';

import product from '../../data/product.json';
import productNoName from '../../data/error/product.no.name.json';
import productMoDescription from '../../data/error/product.no.description.json';
import productInvalidPrice from '../../data/error/product.invalid.price.json';

describe('Product Validation Pipe Test', () => {

    let req = null;
    let res = null;
    let next = null;

    beforeAll(() => {
        ResponseFactory.getErrorResponseObject = jest.fn();
    });

    beforeEach(() => {
        req = httpMocks.createRequest();
        res = httpMocks.createResponse();
        next = jest.fn();
    });

    it('_.product is ok!', () => {
        req.body = product;
        productValidationPipe(req, res, next);
        expect(next).toBeCalled();
        expect(ResponseFactory.getErrorResponseObject).not.toBeCalled();
    });
    
    it('_.product.name is empty', () => {
        req.body = productNoName;
        productValidationPipe(req, res, next);
        expect(next).not.toBeCalled();
        expect(ResponseFactory.getErrorResponseObject).toBeCalled();
        expect(res.statusCode).toBe(400);
        expect(res._isEndCalled()).toBeTruthy();
    });

    it('_.product.description is empty', () => {
        req.body = productMoDescription;
        productValidationPipe(req, res, next);
        expect(next).not.toBeCalled();
        expect(ResponseFactory.getErrorResponseObject).toBeCalled();
        expect(res.statusCode).toBe(400);
        expect(res._isEndCalled()).toBeTruthy();
    });
    
    it('_.product.price is negative price', () => {
        req.body = productInvalidPrice;
        productValidationPipe(req, res, next);
        expect(next).not.toBeCalled();
        expect(ResponseFactory.getErrorResponseObject).toBeCalled();
        expect(res.statusCode).toBe(400);
        expect(res._isEndCalled).toBeTruthy();
    });

    it('_.product is empty', () => {
        productValidationPipe(req, res, next);
        expect(next).not.toBeCalled();
        expect(ResponseFactory.getErrorResponseObject).toBeCalled();
        expect(res.statusCode).toBe(400);
        expect(res._isEndCalled()).toBeTruthy();
    });

});