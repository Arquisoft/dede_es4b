interface Order {
    user:string;
    products:Array<Product>;
    order_date:Date;
}

const orderSchema = new Schema({
    user: {type:String, required: [true, 'User is mandatoy']},
    products: {type:Array, required: true},
    order_date:{type:Date, required:true}
});

const OrderModel = model('Order', userSchema);

module.exports = OrderModel;