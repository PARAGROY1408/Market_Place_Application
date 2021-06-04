// all the routes related to login and registration will be present here only..
import express from 'express'
import {register,login} from '../controllers/auth'
const router=express.Router()

//router.get("/:message",showMessage) // request is on /api/:message


/**the data entered in the registration form will be received here so this is the end point for that
 * request in the front end..
 */
router.post("/register",register) // request is on api/register..

router.post("/login",login)



//export default router as inside the map method we are requiring so we cant do it like this
// this is equivalent to module.exports=router
module.exports=router