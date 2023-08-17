import React, { useState } from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
function Calculator() {
const [data,setData]= useState("")  
const [gcResult, setGcResult] = useState("");
const handleChange = (e) => {
  setData(e.target.value);
};
const isValid = /^[ATCGU]*$/.test(data);

  if (!isValid) {
    alert("Please verify your sequence. Only 'A', 'T', 'C', 'G' characters are allowed for DNA sequences and 'A', 'U', 'C', 'G' for RNA sequences.");
    
  }
  if (data.includes('T') && data.includes('U')) {
    alert("Invalid sequence. 'T' and 'U' should not be in the same sequence.");
    
  }
const calculateGc=(e)=>{
  e.preventDefault();
const  seq= data.toString().toUpperCase();
let  gcCount=0;
let allBases= seq.length;
for(let  i=0;i<allBases; i++){
  if (seq[i]==='G'|| seq[i]==='C'){
    gcCount++

  }
}
const gcPercentage = (gcCount / allBases) * 100;
    setGcResult(gcPercentage.toFixed(2));
  };
  const clearInput = (e) => {
    e.preventDefault();
    setData("");
    setGcResult("");
  };

  return (
    <div> 
      
      <p className='question1'>GC Content Calculator: </p><br/> 


<Form className='form' onSubmit={calculateGc} >
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label> Please Enter your DNA or RNA Sequence</Form.Label>
          <Form.Control as="textarea" className='form' rows={3} name="baseNucleo" value= {data} onChange={handleChange} />
          <br/>
          <br/>
          <div style={{"display":"flex", "justifyContent":"space-between", "marginLeft":"500px", "marginRight":"500px"}}>
            <Button variant= "outline-primary" type="submit">Submit</Button>
            <Button variant= "outline-primary" onClick={e => clearInput(e)}>Clear</Button>
          </div>
         
      <p>GC Content: <span  className='gc'>{gcResult}%  </span></p>
          <br/>
          <Form.Text className="text-muted">
            If you wish to save your sequence, please create an account.
          </Form.Text>
        </Form.Group>
      </Form>


    </div>
  )
}

export default Calculator