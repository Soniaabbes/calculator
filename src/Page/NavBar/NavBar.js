import React from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../Redux/AuthSlice';
import { useDispatch, useSelector } from 'react-redux';
function NavBar() {
  const dispatch= useDispatch()
  const navigate= useNavigate()
  const  auth= useSelector((state)=>state.auth.auth)
  const handlelogout=()=>{
    dispatch(logout());
    navigate('/')
  }

  return (
    <div>
            
    
      <Navbar bg="primary" data-bs-theme="dark" style={{"margin":"0px"}}>
        <Container>
          {/* <Navbar.Brand to= "/">Navbar</Navbar.Brand> */}
        <Nav className="me-auto">
            <Link className="nav-link" to="/">Home</Link>
            { !auth?<>
            <Link className="nav-link" to='/signin'>Sign In</Link>
            <Link className="nav-link" to='/signin'>Sign Up</Link>

        </> :
        <>    <Link className="nav-link" to='/signin' onClick={handlelogout}>Sign Out </Link></>}
        </Nav>
        </Container>
      </Navbar>

      
     
    </div>
  )
}

export default NavBar