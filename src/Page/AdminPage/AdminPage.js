import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import React, {useState} from 'react'
import {Link, useNavigate} from 'react-router-dom';
import {registreSeq} from '../Redux/SeqSlice';
import {useDispatch, useSelector} from 'react-redux';
import {logout} from '../Redux/AuthSlice';
import {deleteUser} from '../Redux/ProfileSlice';

function AdminPage() {
    const dispatch = useDispatch()
    const [data, setData] = useState({baseNucleo: "", pourcentageGc: ""})

    const [gcResult, setGcResult] = useState("");


    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        });
    };
    console.log(data, "sonia")

    const handleSubmit = (e) => {
        e.preventDefault()

        dispatch(registreSeq(data));


    }

    const isValid = /^[ATCGU]*$/.test(data.baseNucleo);

    if (! isValid) {
        alert("Please verify your sequence. Only 'A', 'T', 'C', 'G' characters are allowed for DNA sequences and 'A', 'U', 'C', 'G' for RNA sequences.");

    }
    if (data.baseNucleo.includes('T') && data.baseNucleo.includes('U')) {
        alert("Invalid sequence. 'T' and 'U' should not be in the same sequence.");

    }
    const calculateGc = (e) => {
        e.preventDefault();
        const seq = data.baseNucleo.toString().toUpperCase();
        let gcCount = 0;
        let allBases = seq.length;
        for (let i = 0; i < allBases; i++) {
            if (seq[i] === 'G' || seq[i] === 'C') {
                gcCount++

            }
        }
        const gcPercentage = (gcCount / allBases) * 100;
        setGcResult(gcPercentage.toFixed(2));
        setData(prevData => ({
            ...prevData,
            pourcentageGc: gcPercentage.toFixed(2)
        }));
    };
    const clearInput = (e) => {
        e.preventDefault();
        setData({baseNucleo: "", pourcentageGc: ""});
        setGcResult("");
    };
    const user = useSelector((state) => state.auth.user)
    const navigate = useNavigate()
    const handledelete = async (id) => {
        if (window.confirm(" Êtes vous sûres?")) {
            dispatch(deleteUser(id));
            dispatch(logout());
            navigate('/');
        }
    };


    // const user= useSelector((state)=>state.auth.user)


    return (

        <div className='subEdit'>


            <div>

                <Link to='/listSeq'>
                    <Button variant="outline-primary">
                        my sequences
                    </Button>
                </Link>
                <Button variant="outline-primary"
                    onClick={
                        () => {
                            handledelete(user._id)
                        }
                }>
                    delete my account
                </Button>
                <Link to='/seqAdmin'>
                    <Button variant="outline-primary">

                        all sequences
                    </Button>
                </Link>
                <Link to="/cardUser">
                <Button variant="outline-primary">
                    all users
                </Button>
                </Link>
            </div>
            <div>

                <p className='question1'>GC Content Calculator:
                </p><br/>


                <Form className='form'
                    onSubmit={calculateGc}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>
                            Please Enter your DNA or RNA Sequence</Form.Label>
                        <Form.Control as="textarea" className='form'
                            rows={3}
                            name="baseNucleo"
                            value={
                                data.baseNucleo
                            }
                            onChange={handleChange}/>
                        <br/>
                        <br/>
                        <div style={
                            {
                                "display": "flex",
                                "justifyContent": "space-between",
                                "marginLeft": "500px",
                                "marginRight": "500px"
                            }
                        }>
                            <Button variant="outline-primary" type="submit">Submit</Button>
                            <Button variant="outline-primary" type="submit"
                                onClick={handleSubmit}>Save</Button>

                            <Button variant="outline-primary"
                                onClick={
                                    e => clearInput(e)
                            }>Clear</Button>
                        </div>

                        <p>GC Content:
                            <span className='gc' name='pourcentageGc'
                                value={gcResult}
                                onChange={handleChange}>
                                {gcResult}%
                            </span>
                        </p>
                        <br/>

                    </Form.Group>
                </Form>


            </div>


        </div>


    )
}

export default AdminPage
