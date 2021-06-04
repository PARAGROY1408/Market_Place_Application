// hwere in this file we are defining the call back function that is their in our restapi..
import User from '../models/user'
import jwt from 'jsonwebtoken'
import {JWT_SECRET} from '../config/keys'
/*export const showMessage = (req, res) => { // api prefix ko sever.js mei add kr diya hai means request is coming on "..'/api/:message'"
    res.status(200).send(`the message after the url is ${req.params.message}`)
}*/

// whenever async is used it means taht funtion will gonna to return a promise..
export const register = async (req, res) => {
    try {
        console.log(req.body) // this is the user data that is coming from the front end..
        const { name, email, password } = req.body;
        // befor saving the data to our database we need to do a bit of validation... 
        if (!name) {
            return res.status(400).send("Please enter the name")
        }
        if (!password || password.length < 6) {
            return res.status(400).send("Please enter the password of atleast 6 characters")
        }
        /** ->now we need to validate the email we need to check whether that email is already their
         * or not...if the user already exist with the email then we cant save the user in our database
         * -> for that we will be making a query to our database with the help of findOne method
         */
        let userExist = await User.findOne({ email: email }).exec();
        if (userExist) {
            return res.status(400).send("user already exist")
        }
        // we have created the new user (user) and also inittialse with the data...
        const user = new User(req.body)
        await user.save();
        console.log("user is saved into the database succuessfully...")
        console.log(user);
        return res.status(200).send("user saved successfully");
    }
    catch (err) {
        console.log("theis is some issue while saving the user to the database")
        return res.status(400).send("Please try again")
    }
}

export const login = async (req, res) => {
    //console.log(req.body) // this is the data coming from the front end to the backend..
    const { email, password } = req.body;
    try {
        // first we need to check whether a user exist with that email...
        let userExist = await User.findOne({ email: email }).exec();
        if (!userExist) {
            return res.status(400).send("User does not exist")
        }
        // now we know taht, taht user is their in our database now we need to compare the password
        // this fn we have defined in the user module..we will be sending the plain password
        userExist.comparePassword(password, (err, match) => {
            if (err || !match) {
                console.log("compare password error in the login route", err);
                return res.status(400).send("Enter the correct password")
            }
            console.log("password is matched generate a jason web token and then send it to the client side")
            const token = jwt.sign({ _id: userExist._id },JWT_SECRET, {
                expiresIn: "7d"
            })
            // now we got the token..
            // inside the token we also have the user id..
            res.json({
                token: token,
                user: {
                    name: userExist.name,
                    email: userExist.email,
                    _id: userExist._id,
                    createdAt: userExist.createdAt,
                    updatedAt: userExist.updatedAt
                }// we have sent the information of the logged in user to the client side
            })

        })
    }
    catch (err) {
        console.log('error at the backend in the login route', err);
        return res.status(400).send("Login Failed")
    }
}
