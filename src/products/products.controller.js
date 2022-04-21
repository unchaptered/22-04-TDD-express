import productModel from './product.schema';
import ResponseFactory from '../classes/factory/response.factory';


export const getAllProducts = async (req, res) => {

    try {
        const products = await productModel.find({});
        if (products.length === 0) {
            const error = new Error('There are no products any more');

            const response = ResponseFactory.getErrorResponseObject(JSON.stringify(error));
            return res.status(201).json(response);
        }

        const response = ResponseFactory.getResponseObject('success', products);
        return res.status(201).json(response);

    } catch (error) {

        const response = ResponseFactory.getErrorResponseObject(JSON.stringify(error));
        return res.status(500).json(response);

    }
    
}


export const postProduct = async (req, res) => {
    
    try {
        
        const { product:productJSON } = req?.body;
        const product = await productModel.create({ ...productJSON });
        
        const response = ResponseFactory.getResponseObject('success', product);
        return res.status(201).json(response);

    } catch (error) {

        const response =  ResponseFactory.getErrorResponseObject(JSON.stringify(error));
        return res.status(400).json(response);

    }
};

export const getProductById = (req, res) => {
    
    try {
        const _id = req.params._id;
        const product = productModel.findById(_id);
        if (product === null) {
            const error = new Error('There are no product by _id');

            const response = ResponseFactory.getErrorResponseObject(JSON.stringify(error));
            return res.status(201).json(response);
        }

        const response = ResponseFactory.getResponseObject('success', product);
        return res.status(201).json(response);

    } catch (error) {

        const response =  ResponseFactory.getErrorResponseObject(JSON.stringify(error));
        return res.status(500).json(response);

    }

}

export const patchProductById = async (req, res) => {

    try {
        const _id = req.params._id;
        const { product:productForPatch } = req?.body;

        const product = await productModel.findByIdAndUpdate(_id, { ...productForPatch });
        if (product === null) {
            const error = new Error('There are no product by _id');

            const response = ResponseFactory.getErrorResponseObject(JSON.stringify(error));
            return res.status(201).json(response);
        }

        const response = ResponseFactory.getResponseObject('success', { _id, product });
        return res.status(201).json(response);
    } catch (error) {

        const response =  ResponseFactory.getErrorResponseObject(JSON.stringify(error));
        return res.status(500).json(response);

    }

}

export const deleteProductById = async (req, res) => {

    try {
        const _id = req.params._id;

        const product = await productModel.findByIdAndDelete(_id);
        if (product === null) {
            const error = new Error('There are no product by _id');

            const response = ResponseFactory.getErrorResponseObject(JSON.stringify(error));
            return res.status(201).json(response);
        }

        const response = ResponseFactory.getResponseObject('success', { _id, product });
        return res.status(201).json(response);
    } catch (error) {

        const response =  ResponseFactory.getErrorResponseObject(JSON.stringify(error));
        return res.status(500).json(response);

    }
    
}