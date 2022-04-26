import mongoose from 'mongoose';

interface Order {
    user:string;
    products:Array<Product>;
    order_date:Date;
    status:String;
}

const orderSchema = new mongoose.Schema({
    user: {type:String, required: [true, 'User is mandatoy']},
    products: {type:Array, required: true},
    order_date:{type:Date, required:true},
    status: {type:String, required: true},
});

const OrderModel = mongoose.model('Order', orderSchema);

module.exports = OrderModel;