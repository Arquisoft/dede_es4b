import mongoose from 'mongoose';

interface User {
    name:string;
    surname:string;
    userName:string;
    password:string;
    role:string;
}

const userSchema = new mongoose.Schema({
    name: {type:String, required: [true, 'Name is mandatoy']},
    surname: {type:String, required: [true, 'Surname is mandatoy']},
    userName:{type:String, required: [true, 'username is mandatoy']},
    password: {type:String, required: [true, 'Password is mandatoy']},
    role: {type:String, required: true}
});

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;