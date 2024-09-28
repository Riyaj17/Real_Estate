import Listing from '../models/listing.model.js';

export const createListing = async (req, res, next) => { //this function is synchronous because wait for the response from the mongoDB
  try {
    const listing = await Listing.create(req.body); // the information get from the browser and the listing is created into the models folder
    return res.status(201).json(listing);
  } catch (error) {
    next(error);
  }
};