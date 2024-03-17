import React, { useContext, useState, useEffect } from 'react'
import { store } from '../App'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import profilepic from './profile.png'

const MyProfile = () => {
    const navigate = useNavigate()
    const [token, setToken] = useContext(store)
    const [data, setData] = useState(null)

    useEffect(() => {
        axios.get('http://localhost:5000/myprofile', {
            headers: {
                'x-token': token
            }
        })
            .then(res => setData(res.data))
            .catch(err => console.log(err))
    })
    if (!token) {
        navigate('/login')
    }


    return (
        <div className='profile'>
            {
                data &&
                <center>
                    <div className='profile-data'>
                    <img src={profilepic} alt={data.username}/>
                    <h1>{data.username}</h1><br/>
                    <button className='logout-btn'
                    onClick={()=> setToken(null) }>Logout</button>
                    </div>
                    
                </center>
            }

        </div>
    )
}

export default MyProfile
