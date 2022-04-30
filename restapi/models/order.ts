interface Order {
    user:string;
    products:Array<Product>;
    order_date:Date;
    status:String;
    shipping_address:String;
}

const orderSchema = new Schema({
    user: {type:String, required: [true, 'User is mandatoy']},
    products: {type:Array, required: true},
    order_date:{type:Date, required:true},
    status: {type:String, required: true},
    shipping_address: {type:String, required: true},
});

const OrderModel = model('Order', orderSchema);

module.exports = OrderModel;