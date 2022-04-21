import * as faker from 'faker';
import ResponseForm from '../../../../src/classes/response/response';
import GoodResponseForm from '../../../../src/classes/response/response.good';
import BadResponseForm from '../../../../src/classes/response/response.bad';

/**
 * Parent Test : 부모 테스트
 * Good Response Test : 자식 테스트
 * Bad Response Test : 자식 테스트
 */
describe('Response Classes Test', () => {

    let result = null;
    let message = null;

    beforeEach(() => {
        result = {
            option: faker.animal.cat(),
            text: faker.animal.bear()
        }
        message = faker.lorem.text();
    });

    it('Parent Test', () => {
        const responseForm = new ResponseForm(message, result);

        expect(responseForm.isSuccess).toBeUndefined();
        expect(responseForm.message).toBe(message);
        expect(responseForm.result).toEqual(result);
    });

    it('Good Response Test', () => {
        const goodResponseForm = new GoodResponseForm(message, result);

        expect(goodResponseForm.isSuccess).toBeTruthy();
        expect(goodResponseForm.message).toBe(message);
        expect(goodResponseForm.result).toEqual(result);
    });

    it('Bad Response Test', () => {
        const badResponseForm = new BadResponseForm(message, result);

        expect(badResponseForm.isSuccess).toBeFalsy();
        expect(badResponseForm.message).toBe(message);
        expect(badResponseForm.result).toEqual(result);
    });
});