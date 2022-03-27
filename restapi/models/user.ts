interface User {
    name:string;
    surname:string;
    userName:string;
    password:string;   
}

const userSchema = new Schema({
    name: {type:String, required: [true, 'Name is mandatoy']},
    surname: {type:String, required: [true, 'Surname is mandatoy']},
    password: {type:String, required: [true, 'Password is mandatoy']},
});

const UserModel = model('User', userSchema);

module.exports = UserModel;