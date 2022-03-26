const {Schema, model} = require('mongoose')

interface Product {
    name:string;
    price:number;
    short_description:string;
    long_description:string;
    brand:string;
    category:string;
    sub_category:string;
    image:string; 

    type:string;
    color:string;
    size:number;   
}

const productSchema = new Schema({
    name: {type:String, required: true},
    price: {type:Number, required: true},
    short_description: {type:String, required: true},
    long_description: {type:String, required: true},
    brand: {type:String, required: true},
    category: {type:String, required: true},
    sub_category: {type:String, required: true},
    image: {type:String, required: true},
    type: {type:String, required: false},
    color: {type:String, required: false},
    size: {type:Number, required: false},
});

const ProductModel = model('Product', productSchema);

module.exports = ProductModel;