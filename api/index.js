import express from 'express'; //after install the express then import it
import mongoose from 'mongoose'; //after install mongoose then import it 
import dotenv from 'dotenv';
import userRouter from './routes/user.route.js'; // export default router but here the name is userRouter but here use the same address , that's why no problem occurs
import authRouter from './routes/auth.route.js';
import listingRouter from './routes/listing.route.js';
import cookieParser from 'cookie-parser';
import path from 'path';
dotenv.config();

mongoose.connect(process.env.MONGO).then(() =>{
    console.log('Connected to MongoDB!');
})
.catch((err) => {
    console.log(err);
});
const __dirname = path.resolve(); //this method help to run this application any system

//using express we create a application
const app = express();

app.use(express.json());  //this is allow json as the input of the server

app.use(cookieParser());  //get the information from the cookie

app.listen(3000, () => {
    console.log('Server is running on port 3000!');
});

//create a api route 
app.use("/api/user", userRouter); // userRouter has a default export address , and here use the name userRouter

app.use('/api/auth', authRouter); //this is for the authentication purpose

app.use('/api/listing', listingRouter); //the routing is for the listing page 

//access path for run this application
app.use(express.static(path.join(__dirname, '/client/dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
})

// creating middleware
app.use((err , req, res, next) => {
    const statusCode = err.statusCode || 500; //500 is internal server error
    const message = err.message || 'Internal Server Error';
    return res.status(statusCode).json({
        success: false,
        statusCode, //after es6 if key and variable is same name then wirte one 
        message,
    });
});
