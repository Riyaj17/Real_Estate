import express from 'express';
import { createListing, deleteListing, updateListing, getListing, getListings } from '../controllers/listing.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router(); //create the router

router.post('/create', verifyToken, createListing); //here we use the createlisting function, the function is created in the controller
//if person is authenticated then create the listing that's why using the verifyToken

router.delete('/delete/:id', verifyToken, deleteListing);
router.post('/update/:id', verifyToken, updateListing);
router.get('/get/:id', getListing);
router.get('/get', getListings); //this is for search api route page

export default router;