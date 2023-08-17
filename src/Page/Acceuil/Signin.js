import React, {useEffect, useState} from 'react'
import './Acceuil.css'
import './Acceuil.css'
import {useDispatch, useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {loginUser} from '../Redux/AuthSlice'


function Signin() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [data, setData] = useState({email: '', password: ''})
  
    const user = useSelector((state) => state.auth.user)
   
    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }
    console.log(data)
    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(loginUser(data))

    }
    useEffect(() => {
        if (user) { console.log(user.role,'role')
            if (user.role === 'admin') {
                navigate('/profilAdmin')
            } else {
                if (user.role === 'user') {
                    navigate('/profilUser')
                } 
            }
        }
    }, [user, navigate])
    return (
        <div>
            <div className="form-comp cfb">
                {/* <h1>Sign In!</h1> */}
                <form className="sign-up-form cfb"
                    onSubmit={handleSubmit}>
                    <label>
                        Email:
                        <br/>
                        <input name='email'
                            onChange={handleChange}/>
                    </label>
                    <label>
                        Password:
                        <br/>
                        <input name='password' type='password'
                            onChange={handleChange}/>
                    </label>
                    <br/>
                    <button type='submit'>
                        Sign In!
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Signin
