export const errorHandler = (statusCode, message)=>{  //here the statusCode and the message are manual
const error = new Error(); //create an error using javascript error constructor
error.statusCode = statusCode;//which we are getting manually from the input of the function
error.message = message; 
return error;
};