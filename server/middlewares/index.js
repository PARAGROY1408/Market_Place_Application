/**1->we will define a requireSignIn function that will verify the token with the help of the express-jwt 
 * package(secret and the expiry are the basisi to verify the token)
 * 2->the express jwt package uses the algorithm HS256 to verify the token
 * 3->once the token is verified by default the data inside the token is fetched and it is stotred inside
 * the req.user 
 * 4-> requireSignIn is basically a middleware and it will be passed to all the protected route
 */
import {JWT_SECRET} from '../config/keys'
import Hotel from '../models/hotel'
import jwt from 'express-jwt'
export const requireSignIn=jwt({
    secret:JWT_SECRET,
    algorithms:["HS256"]
 })


/**1->next is basically a callback function that need to present inside the middleware..that is when
 * the middleware executes his job...next() function need to be executed so that the code will move
 * forward and the code inside the controller function will be run 
 * 2->we got the id of the hotel that the user wants to delte with this hotelid we will get the id
 * of the hotel who posted this hotel...now we need to match this id with the id of the currently
 * logged in user
 * 3->we can access the information of the currently loggedin user bcz first we apply the requireSignIn
 * middleware*/
 export const hotelOwner=async (req,res,next)=>{
    let hotel=await Hotel.findById(req.params.hotelId).exec()
    const owner=hotel.postedBy._id.toString()===req.user._id.toString()
    if(!owner)
    {
        return res.status(403).send("Unathorised...")
    }
    next();
    
 }