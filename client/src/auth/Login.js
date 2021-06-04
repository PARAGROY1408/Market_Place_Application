import React,{useState} from 'react'
import LoginForm from '../components/LoginForm'
import axios from 'axios';
import {toast} from 'react-toastify'
import {useHistory} from 'react-router-dom'
import {useDispatch} from 'react-redux'
const Login=()=>{
    const [email,setEmail]=useState();
    const [password,setPassword]=useState();
    const dispatch=useDispatch()
    const history=useHistory()
    const handleSubmit=async (event)=>{
        event.preventDefault(); /* this will prvent the page loading when we submit the form..
        // here in this fucntion we will define axios ans sent the data to the backend...
        // we have the data entered by the user in our state...
        console.log(email);
        console.log(password);*/
        try{
            const res=await axios.post(`${process.env.REACT_APP_API}/login`,{
                email:email,
                password:password // this is the user data that we are sending from the front end to the backend..
            })
            if(res.data)
            {
                // we will be saving the data(user and token) inside our redux and also inside our local storage..
                /** inside the res we have data that is res.data and it has two things one is token and the other
                 * is user so res.data.token is the token...
                 * res.data.user is the user..
                 */
                //console.log(res);
                // save the data inside the local storage, in the local storage data is saved in the form of string
                window.localStorage.setItem("auth",JSON.stringify(res.data));
                // save the user and token in our redux state..
                /**to access the state we have useSelector and to update the state we have useDispatch */
                dispatch({
                    type:"LOGGED_IN_USER",
                    payload:res.data
                })
                // now we will redired the user to the dashboard page..
                history.push('/dashboard')
                
            }
        }
        catch(err){
            //console.log(`the error is ${err}`)
            if(err.response.status===400)
            {
                toast.error(err.response.data)
            }
        }

    }
    return(
        <>
        <div className="container-fluid  bg-secondary p-5 text-center">
            <h1>Login Page</h1>
        </div>
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                <LoginForm 
                handleSubmit={handleSubmit} // we have passed the value as a prop...
                email={email}
                setEmail={setEmail}
                password={password}
                setPassword={setPassword}></LoginForm>
                </div>
            </div>
        </div>
        </>
    )
}
export default Login