import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    name: { type:String, required:true },
    description: { type:String, required:true },

    price: { type:Number }
});

const productModel = mongoose.model('Product', productSchema);

export default productModel;
