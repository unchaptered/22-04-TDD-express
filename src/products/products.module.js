import { Router } from 'express';
import { getAllProducts, postProduct, getProductById, patchProductById, deleteProductById } from './products.controller';
import { productValidationPipe } from '../pipe/validation.pipe';

const productRouter = Router();

productRouter
    .route('/')
    .get(getAllProducts)
    .post(productValidationPipe, postProduct)

productRouter.route('/:_id')
    .get(getProductById)
    .patch(patchProductById)
    .delete(deleteProductById);


export default productRouter;