import mongoose from "mongoose";

// creating rules
const userSchema = new mongoose.Schema({
    username:{
        type: String,
        require: true,
        unique: true,
    },
    username:{
        email: String,
        require: true,
        unique: true,
    },
    password:{
        type: String,
        require: true,
    }
}, {timestamps: true});


//creating model
const User = mongoose.model('User',userSchema); 

export default User;

