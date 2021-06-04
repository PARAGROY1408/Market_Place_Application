import React from 'react'

/* here in thish component we are using state but we are importing it bcz we  have used this component
inside the Register.js and we are receeving all the state like name,email,password as a props from the 
Registe.js component.....now we can either accept the prop and do prop.name
or we could directly destructure we  are using the same name their also*/
const RegisterForm = ({ handleSubmit, name, setName, email, setEmail, password, setPassword }) => {
    return (
        <>
            <form onSubmit={handleSubmit} className="mt-3">
                <div className="form-group mb-3">
                    <label className="form-label">Your Name</label>
                    <input type="text" className="form-control" value={name} placeholder="Enter your name" onChange={(event) => {
                        setName(event.target.value)
                    }}></input>

                </div>
                <div className="form-group mb-3">
                    <label className="form-label">Your Email</label>
                    <input type="email" className="form-control" value={email} placeholder="Enter your email" onChange={(event) => {
                        setEmail(event.target.value) // here we are updating our state....
                    }}></input>

                </div>
                <div className="form-group mb-3">
                    <label className="form-label">Your Password</label>
                    <input type="password" className="form-control" value={password} placeholder="Enter your password" onChange={(event) => {
                        setPassword(event.target.value)
                    }}></input>

                </div>
                <button disabled={!(name && email && password)}className="btn btn-primary">Submit</button>
            </form>
        </>
    )

}

export default RegisterForm