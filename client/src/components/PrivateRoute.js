import React from 'react'
import {Route,Redirect} from 'react-router-dom'
import {useSelector} from 'react-redux'
const PrivateRoute=({...rest})=>{
    const {auth}=useSelector((state)=>{
        return{
            ...state //we will destructure auth from state..
        }
    })
    return(
        <>
        {
            auth && auth.token? <Route {...rest}></Route>:<Redirect to="/login"></Redirect>
        }
        </>
    )
}
export default PrivateRoute