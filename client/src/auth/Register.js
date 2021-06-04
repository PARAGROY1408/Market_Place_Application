import React, { useState } from 'react'
import {useHistory} from 'react-router-dom'
import axios from 'axios'
import RegisterForm from '../components/RegisterForm' //we have not written the code of form here..in sepaarate component
import { toast } from 'react-toastify'; // show the message that is coming from the backend..
const Register = () => {
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const history=useHistory()

    const handleSubmit = async (event) => { //it passed in the onSubmit throught this it have the event
        event.preventDefault(); // this will prevent the reloading oof the page when we submit the form
        /**now in our state we have grabbed the value taht is entered by the user in the form at the 
         * frontend ...the value are prsent in our states in name password email
        console.log({name})
        console.log({email})
        console.log({password})
        now we will sending the data at the backend with the help of axios.
        we have send the data in the form of an object so inorder to fetch this data inside the api
        at the backend..we will do object detructuring...
        */
       try{
        const res=await axios.post(`${process.env.REACT_APP_API}/register`,{
            name:name,
            email:email,
            password:password
        })
        //console.log(res) this is the response coming from the backend on the successfull insertion of user to the database..
        toast.success("Registered Successfully")
        history.push('/login')
       }
       catch(err){
            //console.log(`the error is-> ${err}`)
            if(err.response.status===400)
                 toast.error(err.response.data);
       }
    }
    return (
        <>
            <div className="container-fluid bg-secondary p-5 text-center">
                <h1>Register Page </h1>
            </div>
            <div className="container">
                <div className="row">
                    <div className="col-md-6 offset-md-3">
                        <RegisterForm 
                            /**as the two components Register.js and RegisterForm.js wants to communicate
                             * with each other so we have used props.
                             */
                            handleSubmit={handleSubmit}
                            name={name} // as these are used in the form so as a prop pass kr diya hai..
                            setName={setName}
                            email={email}
                            setEmail={setEmail}
                            password={password}
                            setPassword={setPassword}>
                        </RegisterForm>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Register