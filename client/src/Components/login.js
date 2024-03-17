import React, { useState, useContext} from 'react'
import {store} from '../App.js'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'

const Login = () => {
    const [token,setToken]=useContext(store)
    const navigate=useNavigate()
    const [data, setData] = useState({
        email: '',
        password: '',
    })

    const changeHandler = (e) => {
        setData({...data,[e.target.name]: e.target.value})
    }

    const submitHandler = (e) => {
        e.preventDefault()
        axios.post('http://localhost:5000/login',data)
        .then(response => setToken(response.data.token))
    }

    if(token){
        // return <redirect to='/profile'/>
        navigate('/profile')
    }

    return (
        <div className='sign'>
            <center>
            <div className="form-content">
            <form onSubmit={submitHandler}>
                <h3>Login</h3>
                <label>Email:</label><br/>
                <input type="text" name="email" onChange={changeHandler}/><br/>
                <label>Password:</label><br/>
                <input type="password" name="password" onChange={changeHandler}/><br/>
                <input type="submit" value="Login"/>
            </form>
            <p>
                Doesn't have an account? <br/> <Link to='/register' className='redirect'>Register</Link>
            </p>
            </div>
            
            </center>
        </div>
    )
}

export default Login
