import * as faker from 'faker';
import ResponseFactory from '../../../../src/classes/factory/response.factory';

/**
 * Constructor test : 생성자 호출 불가능한 구조
 * Valid Usecase : 개발자의 올바른 사용에 대한 테스트
 * In-valid Usecase : 개발자의 잘못된 사용에 대한 테스트
 */
describe('Response Factory Test', () => {

    it('Constructor Test', () => {

        try {
            new ResponseFactory();
        } catch (error) {
            expect(error).toBe(error);
        }
        
    });
    
    let isSuccess = null;
    let result = null;
    let message = null;

    let responseObject = null;

    beforeEach(() => {
        responseObject = null;
        result = {
            option: faker.animal.cat(),
            text: faker.animal.bear()
        }
        message = faker.lorem.text();
    })

    describe('Valid Usecase', () => {
        
        it('Good Response', () => {
            responseObject = ResponseFactory.getResponseObject(message, result);
            expect(responseObject.isSuccess).toBeTruthy();
            expect(responseObject.message).toBe(message);
            expect(responseObject.result).toEqual(result);
        });

        it('Bad Response', () => {
            responseObject = ResponseFactory.getErrorResponseObject(message);
            expect(responseObject.isSuccess).toBeFalsy();
            expect(responseObject.message).toBe(message);
            expect(responseObject.result).toEqual({});
        });
        
    });

    describe('In-valid Usecase', () => {

        it('Good Response', () => {
            expect(
                () => ResponseFactory.getResponseObject(message)
            ).toThrow();
        });

        it('Good Response', () => {
            expect(
                () => ResponseFactory.getResponseObject('', result)
            ).toThrow();
        });

        it('Bad Response', () => {
            expect(
                () => ResponseFactory.getErrorResponseObject('')
            ).toThrow();
        });
    })

});