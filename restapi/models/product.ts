const {Schema, model} = require('mongoose')

interface Product {
    name:string;
    section:string;
    description:string;
    price:number;
    image:string;    
}

const productSchema = new Schema({
    name: {type:String, required: [true, 'Name is mandatoy']},
    section: {type:String, required: [true, 'Section is mandatoy']},
    description: {type:String, required: true},
    price: {type:Number, required: true},
    image: {type:String, required: true}
});

const ProductModel = model('Product', productSchema);

module.exports = ProductModel;