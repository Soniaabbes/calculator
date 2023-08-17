import './App.css';
import NavBar from './Page/NavBar/NavBar';
import 'bootstrap/dist/css/bootstrap.min.css';
import Text from './Page/text/Text';
import Text2 from './Page/text/Text2';
import Calculator from './Page/text/Calculator';
import Acceuil from './Page/Acceuil/Acceuil'
import { currentUser } from './Page/Redux/AuthSlice';

import {BrowserRouter, Route, Routes} from 'react-router-dom';
import ListSeq from './Page/ListSeq/ListSeq';
import ProfileUse from './Page/ProfileUser/ProfileUse';
import PrivateRoutes from './Page/PrivateRoutes'
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import {ToastContainer} from 'react-toastify';
import AdminPage from './Page/AdminPage/AdminPage';
import ListSeqAdmin from './Page/ListSeq/ListSeq Admin';
import CardUser from './Page/CardUser/CardUser';

function HomePage() {
    return (
        <div>
            <Text/> 
            <Text2/>
            <Calculator/>
        </div>
    );
}
function App() {
    const dispatch = useDispatch()
    useEffect(() => {
        if (localStorage.getItem("token")) {
            dispatch(currentUser());
        }
    }, [dispatch])
    return (
        <BrowserRouter>
        <div className="App">
<NavBar/>
<div className='app'>
    

<Routes>
<Route path='/' element={<HomePage/>} />
    <Route path='/signin' element={<Acceuil/>}/>
    <Route path= "/listSeq" element = { <PrivateRoutes> <ListSeq/></PrivateRoutes>}/>
  
    
    <Route path='/profilUser'
                        element={
                            <PrivateRoutes><ProfileUse/></PrivateRoutes>
                        }/>
     <Route path='/profilAdmin'
                        element={
                            <PrivateRoutes><AdminPage/></PrivateRoutes>
                        }/>
                           <Route path='/seqAdmin'
                        element={
                            <PrivateRoutes><ListSeqAdmin/></PrivateRoutes>
                        }/>
                           <Route path='/cardUser'
                        element={
                            <PrivateRoutes><CardUser/></PrivateRoutes>
                        }/>
</Routes>

{/* <ToastContainer position="top-right"
                    autoClose={1500}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"/> */}
                    </div>
        </div>
        </BrowserRouter>
    );
}

export default App;
