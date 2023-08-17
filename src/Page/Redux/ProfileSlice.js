import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {  toast } from 'react-toastify';
import axios from "axios"
const initialState = {   
userProfile: [],
profileOne:[],

loading: false,
errors: []
};
// get all users 
export const getAllUser= createAsyncThunk("profile/allUsers", async(data,{rejectWithValue})=>{
    const config={
        headers:{authorization:localStorage.getItem("token")}
      }
    try {
        const res = await axios.get('api/profile/getAllUsers',data,config)
      
       return res.data
    } catch (error) {
        return rejectWithValue(error.response.data.errors)
    }
})
// delete user 
export const deleteUser = createAsyncThunk("profile/deletetUser", async (id, {rejectWithValue}) => {
   
    

    try {
        const res = await axios.delete(`api/profile/deleteUser/${id}`)
     
        return res.data
    } catch (error) {
        return rejectWithValue(error.response.data.errors)
    }
})
// get one user
export const getOneUser = createAsyncThunk("profile/getOneUser", async (id ,{rejectWithValue}) => {

    
    

    try {
        const res = await axios.get(`api/profile/userOne/${id}`)
     
        return res.data.oneUser
      
    } catch (error) {
        return rejectWithValue(error.response.data.errors)
    }
})
export const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
          // get all users
          .addCase(getAllUser.pending, (state, {payload}) => {
            state.loading = true
            
        }).addCase(getAllUser.fulfilled, (state, {payload}) => {
            state.userProfile = payload.Users
           state.loading = false
           localStorage.setItem("token", payload.token);
       
        }).addCase(getAllUser.rejected, (state, {payload}) => {
         
          
            state.loading = false
            state.errors= payload

    })
    // delete user
    .addCase(deleteUser.pending, (state, {payload}) => {
        state.loading = true
       

    }).addCase(deleteUser.fulfilled, (state, {payload}) => {
  const id= payload
 
       state.loading = false
       if (Array.isArray(state.userProfile)) {
        state.userProfile= state.userProfile.filter((user) => user._id !== id);
    } else {
        state.userProfile = [];
    }
     
    
    }).addCase(deleteUser.rejected, (state, {payload}) => {
     
     
        state.loading = false
        state.errors= payload
    
})

// get one user

.addCase(getOneUser.pending, (state, {payload}) => {
    state.loading = true
   
}).addCase(getOneUser.fulfilled, (state, {payload}) => {
   
   state.loading = false
state.profileOne=payload
   toast.success(payload.msg)
   
}).addCase(getOneUser.rejected, (state, {payload}) => {
 
  
    state.loading = false
    state.auth = false
    state.errors= payload
  
})

    }
})
              
        
            export default profileSlice.reducer