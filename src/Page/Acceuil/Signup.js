import React, { useEffect, useState } from 'react'
import './Acceuil.css'
import { useDispatch, useSelector } from 'react-redux'
import { registreUser } from "../Redux/AuthSlice"
import { useNavigate } from 'react-router-dom'
function Signup() {
    const dispatch=useDispatch()
    const navigate= useNavigate()
    const [data, setData]=useState({username:'', email:'',password:'' })
    const user= useSelector((state)=>state.auth.user)
    const handleChange=(e)=>{
        setData({...data, [e.target.name]:e.target.value})
    }
    const handleSubmit=(e)=>{
        e.preventDefault()
        dispatch(registreUser(data))
       
    }

useEffect(()=>{if (user){navigate('/profilUser')}},[user,navigate])
return (
        <div>
            <div className="form-comp cfb">
                <h1>Create an Account!</h1>
                <form className="sign-up-form cfb" onSubmit={handleSubmit}>
                    <label>
                        Name:
                        <br/>
                        <input name='username' onChange={handleChange}/>
                    </label>
                    <label>
                        Email:
                        <br/>
                        <input name='email' onChange={handleChange}/>
                    </label>
                    <label>
                        Password:
                        <br/>
                        <input name='password'  type ='password'onChange={handleChange}/>
                    </label>
                  
                    <br/>
                    <button type='submit'>
                        Sign Up!
                    </button>

                </form>
            </div>
        </div>
    )
}

export default Signup
