//const express=require('express'); we have installed esm npm package so we will not do it like this
import express from 'express'
import fs from 'fs' 
import cors from 'cors'
import mongoose from 'mongoose'
const morgan=require('morgan')
require('dotenv').config()
const app=express();
const {MONGO_URI}=require("./config/keys")

// connecting to the mondodb atlas..
mongoose.connect(MONGO_URI,{
    useUnifiedTopology:true,
    useNewUrlParser:true
});
mongoose.connection.on('connected',()=>{
    console.log("connected to the mongodb yeah....")
})
mongoose.connection.on('error',(err)=>{
    console.log(`the error  is ${err.message}`)
})

// middleware
app.use(cors())
app.use(morgan("dev"))
app.use(express.json())
/**we are using this as the middleware bcz the data what is coming from the cleint side is in the 
 * json format so inoder to receive that data we need to use this we can also use bodyparser for this
 * purpose
 */


//app.use('/',router) aisa bhi kr sakte hain..
//app.use('/api',router) // yahan pr he prefix api kr diya hai tu routes mei se api ko remove kr do
/**-> the basic concept is that we need to require all the files from the route folder and then we
 * need to pass that as the middleware...their could be multiple files we dont want to write that manually
 * -> to avoid that we are using file system model
 * -> by the help of this rereaddirSync we are autoloading all the files that are prsent inside the routes
 * folder.
 */
fs.readdirSync('./routes').map((curr_file)=>{
    return app.use('/api',require(`./routes/${curr_file}`)) //our end ponit is /5000/api..
})
const port=process.env.PORT || 8000
// this part is only used for the deploying to heroku we are moving to the production side..
if(process.env.NODE_ENV=="production")
{
    // if our project is deployed then we have to do something....
    app.use(express.static('client/build')) // firstly we have to serve the static file prsent inside the build folder
    const path=require('path') // we have to require the model...
    app.get("*",(req,res)=>{
        // if the user will make any request...
        res.sendFile(path.resolve(__dirname,'client','build','index.html'))
    })
}
app.listen(port,()=>{
    console.log(`the server is running at the port number ${port}`);
})

