import User from '..//models/user.model.js';
import bcryptjs from 'bcryptjs';
import { errorHandler } from '../utils/error.js';
import jwt from 'jsonwebtoken';

export const signup = async (req, res, next) => {
    const { username, email, password } = req.body; 
    //after getting the password form the body , we gonna hashed the password
    const hashedPassword = bcryptjs.hashSync(password, 10);


    //these are going to save inside the database 
    const newUser = new User({ username, email, password: hashedPassword });
    try{
    await newUser.save();
    res.status(201).json("User created successfully!");

    } catch (error) {
        next(error);
    }

};

//create the function for sing ip
export const signin = async (req, res, next) => {
    //here we get the data from request.body(we get email and password)
    const { email, password} = req.body;
    try{
        //check the email is valid or not
        const validUser = await User.findOne({email});
        //if error present
        if(!validUser) return next(errorHandler(404, 'User not found!')); //error handler basically get from the error.js file


        //check the password
        const validPassword = bcryptjs.compareSync(password, validUser.password);
        //if the password is not currect return an error
        if(!validPassword) return next(errorHandler(401, 'Wrong credentials!'));
        
        //using jwt
        const token = jwt.sign({ id: validUser._id}, process.env.JWT_SECRET);

        //when we sending back the valid user , we remove the password first
        const { password: pass, ...rest} = validUser._doc;

        //after cteating the token we save this token as the cookie
        res
        .cookie('access_token', token, {httpOnly: true}) //httponly true means no other third party application cannot access our cookie
        .status(200)
        .json(rest); //here return rest because we hide the password

    } catch(error){ //here we catch the error using the middleware
        next(error);
    }

}