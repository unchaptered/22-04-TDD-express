import BadResponseForm from "../response/response.bad";
import GoodResponseForm from "../response/response.good";

export default class ResponseFactory {

    constructor () {
        throw new Error('Bad Request Error : ResponseFactory is facotry class');
    }

    static checkMessageFormat(message) {
        if (message === undefined || message === '') throw new Error('message is necessary');
    }

    static checkResultFormat(result) {
        if (result === undefined) throw new Error('result is necessary');
    }

    static getResponseObject(message, result) {
        ResponseFactory.checkMessageFormat(message);
        ResponseFactory.checkResultFormat(result);
        
        return new GoodResponseForm(message, result);
    }

    static getErrorResponseObject(message) {
        ResponseFactory.checkMessageFormat(message);

        return new BadResponseForm(message, {});
    }
}