import {Schema, model, models} from 'mongoose';

const UserSchema = new Schema({
    email:{
        type: String,
        unique: [true, 'Email already exists!'],
        required: [true, 'Email is required!'],
    },
    username:{
        type: String,
        required: [true, 'username is required!'],
        match: [/^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/, 
        "Username invalid, it should contain 8-20 alphanumeric letters and be unique!"],
    },
    image:{
        type: String,
    }

});

// only create a model "User" if no one exists
// the models object is provided by the mongoose library and stores all registered models
// this is imortant because of the fact, that next api routes are serverless

const User = models.User || model("User", UserSchema);

export default User;