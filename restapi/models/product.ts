const {Schema, model} = require('mongoose')

interface Product {
    name:string;
    section:string;
    price:number;    
}

const productSchema = new Schema({
    name: {type:String, required: true},
    section: {type:String, required: true},
    price: {type:Number, required: true}
});

const ProductModel = model('Product', productSchema);

module.exports = ProductModel;