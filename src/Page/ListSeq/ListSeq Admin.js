import React, { useEffect, useState } from 'react'
import Card from 'react-bootstrap/Card';
import { deleteSeq, getOneSeq, getallSeq } from '../Redux/SeqSlice';
import { useDispatch, useSelector } from 'react-redux';
import Button from 'react-bootstrap/Button';

function ListSeqAdmin() {
  const user = useSelector((state) => state.auth.user)
    const userSeq = useSelector((state) => state.chaine.userSeq.chaine)
    const SeqOne = useSelector((state) => state.chaine.seqOne)
    console.log(SeqOne,"sony")
 
    
  const dispatch= useDispatch()
  useEffect(() => {
    dispatch(getallSeq());


}, [dispatch, user?._id])
const handledelete = async (id) => {
    if (window.confirm(" ARE you sure ?")) {
        dispatch(deleteSeq(id));
       
        dispatch(getallSeq(user?._id));
    }
};
const [show,setShow]=useState({})
  return (
    <div >
      <div style={{'display':"flex" , 'flexDirection':"column"}}>
      {userSeq?.map((sequence)=>
         <Card style={{"margin":"50px"}}>
      <Card.Body> <span className='gc'>{sequence?.baseNucleo}</span>
      
      <br/><br/>  
      <p>GC Content: <span  className='gc'>  {sequence?.pourcentageGc} </span></p>
      <Button variant='outline-primary' onClick={()=>{dispatch(getOneSeq(sequence?._id),setShow(prevState => ({
                                ...prevState,
                                [user?._id]: true
                              })))}}> Delete</Button>
                              <br/> <br/>
                              {show[user?._id]&&  <Button variant="outline-primary" onClick={()=>{handledelete(SeqOne?._id)}}> Confirm deletion</Button>
}
      </Card.Body>
    </Card>)}

    </div>
    </div>
  )
}

export default ListSeqAdmin