import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import './CardUser.css'

import {useDispatch, useSelector} from 'react-redux'
import { getAllUser,deleteUser, getOneUser } from "../Redux/ProfileSlice";

import Card from 'react-bootstrap/Card';
import { deleteSeqByChaineId } from '../Redux/SeqSlice';



function CardUser() {
  const [show,setShow]=useState({})
  const users= useSelector((state) => state.profile.userProfile);
  console.log(users,'ssssssr')
  const userOne= useSelector((state) => state.profile.profileOne);
  const dispatch= useDispatch()


  useEffect(() => {
    dispatch(getAllUser());
  }, [dispatch]);
  const handledelete = async (id) => {
    if (window.confirm(" Êtes vous sûres?")) {
      dispatch(deleteSeqByChaineId(id));
      dispatch(deleteUser(id));
        dispatch(getAllUser());
    }
  };


  return (
   
    <div className='liste'>
    {users.map((user) =>
    
      <Card style={{ width: '18rem' , "color": "#4e5052", "margin" :"10px"}} className="our-team">






<div className="picture">
          <img className="img-fluid"  alt='imgProfile'src="https://img.freepik.com/vecteurs-premium/photo-profil-avatar-homme-illustration-vectorielle_268834-538.jpg"/>
       

          </div>
          <Card.Body>
          
          <p className="title">{user.username}</p>
          <p className="title">{user.email}</p>
          {user.role!=="admin"&&
          <>
         
          <Button variant='outline-primary' onClick={()=>{dispatch(getOneUser(user._id),setShow(prevState => ({
                                ...prevState,
                                [user._id]: true
                              })))}}> delete profile</Button>
                              <br/> <br/>
          {show[user._id]&&<Button variant='outline-primary' onClick={()=>{handledelete(userOne._id)}}>confirm deletion</Button>}
         </>}
          </Card.Body>
       
        </Card>




    )}
  
    </div>
    )
}

export default CardUser