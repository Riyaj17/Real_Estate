import mongoose from "mongoose";

// creating rules
const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true,
    },
    profile:{
        type: String,
        default: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fpixabay.com%2Fvectors%2Fblank-profile-picture-mystery-man-973460%2F&psig=AOvVaw3Y3KGiaTuQ-_5pP0ON1wvC&ust=1723542598308000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCNDqv9OW74cDFQAAAAAdAAAAABAE"
    },

}, {timestamps: true});


//creating model
const User = mongoose.model('User',userSchema); 

export default User;

