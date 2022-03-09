interface User {
    name:string;
    surname:string;
    userName:string;
    password:string;   
}

const userSchema = new Schema({
    name: {type:String, required: true},
    surname: {type:String, required: true},
    password: {type:String, required: true},
});

const UserModel = model('User', userSchema);

module.exports = UserModel;