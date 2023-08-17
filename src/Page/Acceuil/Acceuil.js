import React from 'react'
import { useState } from 'react'
import Signin from './Signin'
import Signup from './Signup'
import './Acceuil.css'

function Acceuil() {
    const [welcome, setWelcome] = useState(false)

  const setBannerClass = () => {
    const classArr = ["banner-side cfb"]
    if (welcome) classArr.push('send-right')
    return classArr.join(' ')
  }

  const setFormClass = () => {
    const classArr = ["form-side cfb"] 
    if (welcome) classArr.push('send-left')
    return classArr.join(' ')
  }
  return (
    <div className='Acceuil logIn'>
         <div className="Container cfb">

<div className={setBannerClass()}> 

 

  <button onClick={()=> setWelcome(!welcome)}>
    {welcome ?
      "Sign In"
        : "Create Account"}
  </button>
</div>

<div className={setFormClass()}> 
    {welcome ? 
      <Signup/> 
        : <Signin/>
    }
    
</div>
</div>
    </div>
  )
}

export default Acceuil