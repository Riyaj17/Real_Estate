import express from 'express'; //after install the express then import it
import mongoose from 'mongoose'; //after install mongoose then import it 
import dotenv from 'dotenv';
dotenv.config();

mongoose.connect(process.env.MONGO).then(() =>{
    console.log('Connected to MongoDB!');
})
.catch((err) => {
    console.log(err);
});

//using express we create a application
const app = express();
app.listen(3000, () => {
    console.log('Server is running on port 3000!');
    }
)