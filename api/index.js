import express from 'express'; //after install the express then import it

//using express we create a application
const app = express();
app.listen(3000, () => {
    console.log('Server is running on port 3000!');
    }
);