import express from 'express';
const router=express.Router();
import {CreateConnectAccount} from '../controllers/stripe'
import {requireSignIn} from '../middlewares/index'


// as this is a protected route so we will need to pass a middleware function that will verify the token
router.post('/create-connect-account',requireSignIn,CreateConnectAccount)

module.exports=router;