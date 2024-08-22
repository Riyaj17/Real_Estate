import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {

    const token = req.cookies.access_token;
    //once get the token now verify it

    if (!token) return next(errorHandler(401, 'Unauthorized'));  //if no token show error

    //if there is a token , then check the token is correct or not
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return next(errorHandler(403, 'Forbidden'));
    
        req.user = user; //here we save the id of the user , to use this id verify the user
        
        next();
      });
};