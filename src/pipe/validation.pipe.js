import ResponseFactory from '../classes/factory/response.factory';

export const productValidationPipe = (req, res, next) => {

    const product = req.body.product;

    const tar = '';
    let message = tar;
    if (product?.name === undefined) message += '_name is undefined';
    if (product?.description === undefined) message += '_description is undefined';
    if (product?.price < 0) message += '_price must be possitive number';
    
    if (message !== tar)  {
        const result = ResponseFactory.getErrorResponseObject(message);
        return res.status(400).json(result);
    } else {
        next();
    }
}