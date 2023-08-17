import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {  toast } from 'react-toastify';

import axios from "axios"

const initialState = {
    user: [],
    auth: false,
    loading: false,
    errors: []
};
// registre user
export const registreUser = createAsyncThunk("auth/registerUser", async (data, {rejectWithValue}) => {
    try {
        const res = await axios.post("api/auth/signup", data)
        return res.data
    } catch (error) {
        return rejectWithValue(error.response.data.errors);

    }
})
// loginuser

export const loginUser = createAsyncThunk("auth/signinUser", async (data, {rejectWithValue}) => {
    try {
        const res = await axios.post('api/auth/signin', data)
        return res.data
    } catch (error) {
        return rejectWithValue(error.response.data.errors)
    }
})
//current
export const currentUser = createAsyncThunk("auth/CurrentUser", async (data, {rejectWithValue}) => {
   
    const Config={
        headers:{
            authorization:localStorage.getItem('token')
        }
    }
    try {
        const res = await axios.get('api/auth/current', Config)
        return res.data
    } catch (error) {
        return rejectWithValue(error.response.data.errors)
    }
})




export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout:(state)=>{
            state.user=null;
            state.auth=false;
            state.loading=false;
            localStorage.removeItem("token");
          
        }
    },
    extraReducers(builder) {
        builder
        .addCase(registreUser.pending, (state, {payload}) => {
            state.loading = true;

        }).addCase(registreUser.fulfilled, (state, {payload}) => {
            state.user = payload.user
            state.auth = true
            state.loading = false
            localStorage.setItem("token", payload.token);
            toast.success (payload.msg)
        }).addCase(registreUser.rejected, (state, {payload}) => {
            state.user = null
            state.auth = false
            state.loading = false
            // payload.forEach((error)=>toast.error(error.msg))
        })
//login user

        .addCase(loginUser.pending, (state, {payload}) => {
            state.loading = true;

        }).addCase(loginUser.fulfilled, (state, {payload}) => {
            state.user = payload.user
            state.auth = true
            state.loading = false
            localStorage.setItem("token", payload.token);
            // toast.success (payload.msg)
        })
        
        .addCase(loginUser.rejected, (state, { payload }) => {
            state.user = null;
            state.auth = false;
            state.loading = false;
            if (payload && payload.forEach) {
              payload.forEach((error) => toast.error(error.msg));
            } else {
              // Gérer le cas où payload est indéfini ou ne contient pas de méthode forEach
              toast.error('Une erreur s\'est produite lors de la connexion.');
            }
          })
        
        // .addCase(loginUser.rejected, (state, {payload}) => {
        //     state.user = null
        //     state.auth = false
        //     state.loading = false
        //   payload.forEach((error)=>toast.error(error.msg))
        //  })

        // current:
        .addCase(currentUser.pending, (state, {payload}) => {
            state.loading = true;

        }).addCase(currentUser.fulfilled, (state, {payload}) => {
            state.user = payload
            state.auth = true
            state.loading = false
            // toast.success (payload.msg)
         
        }).addCase(currentUser.rejected, (state, {payload}) => {
            state.user = null
            state.auth = false
            state.loading = false
            // payload.forEach((error)=>toast.error(error.msg))
        })





        



    }

})
export const {logout}=authSlice.actions
export default authSlice.reducer
