import express from 'express';
import { createListing, deleteListing } from '../controllers/listing.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router(); //create the router

router.post('/create', verifyToken, createListing); //here we use the createlisting function, the function is created in the controller
//if person is authenticated then create the listing that's why using the verifyToken

router.delete('/delete/:id', verifyToken, deleteListing);
export default router;