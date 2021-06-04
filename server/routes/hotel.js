import express from 'express'
const formidableMiddleware = require('express-formidable');
const router=express.Router();

import {requireSignIn,hotelOwner} from '../middlewares/index'
import {create,hotels,image,sellerHotels,remove,read,update,search} from '../controllers/hotel'
router.post("/create-hotel",requireSignIn,formidableMiddleware(),create);


/**it will be a get request we want to show all the hotels presnet inside our database to the home page */
router.get("/hotels",hotels)

// this route will send the image of the hotel to the frontend..
router.get("/hotel/image/:hotelId",image)

// this route will be sending all the hotel posted by  the logged in seller..
router.get("/seller-hotels",requireSignIn,sellerHotels)

//this route will delete the hotel ....based on the id of the hotel that is coming from the frontend
router.delete("/delete-hotel/:hotelId",requireSignIn,hotelOwner,remove)


//this route will send the details of a single hotel...we will receive the id of that hotel from the frontend
router.get("/hotel/:hotelId",read)

// to handle the request to update  the hotel...
router.put("/update-hotel/:hotelId",requireSignIn,hotelOwner,formidableMiddleware(),update);

router.post("/search-hotel",search)
module.exports=router