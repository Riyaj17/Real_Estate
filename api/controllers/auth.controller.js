import User from '..//models/user.model.js';
import bcryptjs from 'bcryptjs';

export const signup = async (req, res) => {
    const { username, email, password } = req.body; 
    //after getting the password form the body , we gonna hashed the password
    const hashedPassword = bcryptjs.hashSync(password, 10);


    //these are going to save inside the database 
    const newUser = new User({ username, email, password: hashedPassword });
    try{
    await newUser.save();
    res.status(201).json("User created successfully!");

    } catch (error) {
        res.status(500).json(error.message);
    }

};