import React, { useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'

const Register = () => {
    const [data, setData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    })
    const navigate = useNavigate()

    const changeHandler = (e) => {
        setData({...data,[e.target.name]: e.target.value})
    }

    const submitHandler = (e) => {
        e.preventDefault()
        axios.post('http://localhost:5000/register',data)
        .then(response => alert(response.data))
        navigate('/login')
    }

    return (
        <div className='sign'>
            <center>
                <div className="form-content">
                <form onSubmit={submitHandler}>
                <h3>Register</h3>
                <label>Username:</label><br/>
                <input type="text" name="username" onChange={changeHandler}/><br/>
                <label>Email:</label><br/>
                <input type="text" name="email" onChange={changeHandler}/><br/>
                <label>Password:</label><br/>
                <input type="password" name="password" onChange={changeHandler}/><br/>
                <label>Confirm Password:</label><br/>
                <input type="password" name="confirmPassword" onChange={changeHandler}/><br/>
                <input type="submit" value="Register"/>
            </form>
            <p>
                Already have an account?<br/> <Link to='/login' className='redirect'>Login Here</Link>
            </p>
                </div>

            </center>
        </div>
    )
}

export default Register
