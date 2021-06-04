import React from 'react'
const LoginForm = ({handleSubmit,email,setEmail,password,setPassword}) => {
    return (
        <form onSubmit={handleSubmit} className="mt-3">
            <div className="form-group mb-3">
                <label className="form-label">Your Email</label>
                <input type="email" className="form-control" value={email} placeholder="Enter your email"onChange={(event) => {
                    setEmail(event.target.value)
                }}></input>
            </div>
            <div className="form-group mb-3">
                <label className="form-label">Your Password</label>
                <input type="password" className="form-control" value={password} placeholder="Enter your password" onChange={(event) => {
                    setPassword(event.target.value)
                }}></input>
            </div>
            <button disabled={!(email && password)}className="btn btn-primary">Submit</button>
        </form>
    )
}
export default LoginForm