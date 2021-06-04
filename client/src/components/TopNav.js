import React from 'react'
import { Link } from 'react-router-dom' // we have used it here tu apne aap import ho gya hai
import {useSelector,useDispatch} from 'react-redux'
import {useHistory} from 'react-router-dom'
const TopNav=()=>{
    const dispatch=useDispatch();
    const history=useHistory();
    const logout=()=>{
        /**we will be removing the state from both the redux and the localstorage as we are updating the
         * state basically we are setting it to the null so we need useDispatch hook
         */

        // removed the user from the redux...
        dispatch({
            type:"LOGOUT",
            payload:null
        })

        // removed the state (user infomation+token) from the state...
        window.localStorage.removeItem("auth")
        history.push('/login')
    }
    const {auth}=useSelector((state)=>{ // we will be detructuring the auth from the state
        return{
            ...state
        }
    })
    return(
        <div className="nav bg-light d-flex justify-content-between">
            <Link className="nav-link" to="/"> Home</Link>
            {
                auth==null?
                <><Link className="nav-link" to="/login">Login</Link>
                <Link className="nav-link" to="/register">Register</Link></>
                :<>
                <Link className="nav-link" to="/dashboard"> Dashboard</Link>
                <a className="nav-link" onClick={logout} style={{cursor:"pointer"}}>Logout</a>
                </>
            }
            

        </div>
    )
}
export default TopNav