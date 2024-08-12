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

};

export const google = async (req, res, next) => {  //export google
    try { //inside the try we check the user present or not, if exist then sign in otherwise we need to create the user
     
        const user = await User.findOne({ email: req.body.email }) //the email is coming from request.userbody.email
      if (user) {
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET); //id of the user getting from the user
        const { password: pass, ...rest } = user._doc; //separate password and the rest inside user doc
        res
          .cookie('access_token', token, { httpOnly: true }) //save the cookie name as access token,,make it more secure using httponly
          .status(200)
          .json(rest); //send back the user data
  
      } else {
        const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8); //generate a password
        const hashedPassword = bcryptjs.hashSync(generatedPassword, 10); //hashed the password
        const newUser = new User({ username: req.body.name.split(" ").join("").toLowerCase() + Math.random().toString(36).slice(-4) , email: req.body.email, password: hashedPassword, profile: req.body.photo });
        // for image using the profile and add this in user model.js
        await newUser.save(); //save this new user
        
        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
        const { password: pass, ...rest } = newUser._doc;
        res.cookie('access_token', token, { httpOnly: true }).status(200).json(rest);
  
      }
    } catch (error) {
      next(error)
    }
  }