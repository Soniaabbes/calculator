import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {  toast } from 'react-toastify';
import axios from "axios"
const initialState = {
    
    userSeq: [],
    seqOne:[],

    loading: false,
    errors: []
};
// create new Seq
export const registreSeq= createAsyncThunk('chaine/createSequence', async (data, {rejectWithValue}) => {
    console.log(data,"ssss")
    const Config={
        headers:{
            authorization:localStorage.getItem('token')
        }
    }
    try {
        const res = await axios.post("/api/chaine/createSeq", data, Config)

        console.log(data,"sssss")
        return res
       
    } catch (error) { console.log(error,"erreur")
        return rejectWithValue(error.response.data.errors);

    }
})
// get all sequences
export const getallSeq = createAsyncThunk(
    'sequence/getAllSequences',
    async (data, { rejectWithValue }) => {
        console.log(data, )
      try {
        const response = await axios.get(`api/chaine/getAllSequences`, data);
        return response.data
      } catch (error) { console.log(error,"error")
        return rejectWithValue(error.response.data.errors);
      }
    }
  );
   // delete seq
   export const deleteSeq = createAsyncThunk("sequence/deletetSequence", async (id, {rejectWithValue}) => {
   
    

    try {
        const res = await axios.delete(`api/chaine/deleteSeq/${id}`)
     
        return res.data
    } catch (error) {
        return rejectWithValue(error.response.data.errors)
    }
})
  // get one seq
  export const getOneSeq = createAsyncThunk("sequence/getOneSequence", async (id ,{rejectWithValue}) => {

    
    
   
    try {
        const res = await axios.get(`api/chaine/getOneSeq/${id}`)
     
        return res.data
      
    } catch (error) {
        return rejectWithValue(error.response.data.errors)
    }
 
})
// delete by chaineID
export const deleteSeqByChaineId = createAsyncThunk(
    'seq/deleteSeqByChaineId',
    async (chaineId, { rejectWithValue }) => {
        try {
            const res = await axios.delete(`/api/chaine/byChaineId/${chaineId}`);
            return res.data;
        } catch (error) {
            return rejectWithValue(error.response.data.errors);
        }
    }
);
export const getSeqUser = createAsyncThunk("/sequence/getSeqUser", async (data,{rejectWithValue}) => {   
    console.log(data,"data")
    try {
        const Config={
            headers:{
                authorization:localStorage.getItem('token')
            }
        }
        const res = await axios.get(`/api/chaine/getSeqUser/${data}`,Config)
     
        return res.data
      
    } catch (error) {
        return rejectWithValue(error.response.data.errors)
    }
})
export const SeqSlice = createSlice({
    name: 'chaine',
    initialState,
    reducers: {},
    extraReducers(builder) {
             builder
             // create new seq
             .addCase(registreSeq.pending, (state, {payload}) => {
                state.loading = true
                
            
    
            }).addCase(registreSeq.fulfilled, (state, {payload}) => {
                state.userSeq = payload
              
               state.loading = false
             
            //    toast.success ('le produit est créé avec succés')
            
             
            }).addCase(registreSeq.rejected, (state, {payload}) => {
             
             
                state.loading = false
                state.errors= payload
            }
            )
               // get all products
               .addCase(getallSeq.pending,(state, {payload}) => {
                state.loading = true
                
            
    
            }).addCase(getallSeq.fulfilled,(state, {payload}) => {
             state.userSeq = payload
              
               state.loading = false
             
               toast.success ('voici nos produits')
            
             
            }).addCase(getallSeq.rejected, (state, {payload}) => {
             
             
                state.loading = false
                state.errors= payload
            
            })
             // delete seq
 
  .addCase(deleteSeq.pending, (state, {payload}) => {
    state.loading = true
   

}).addCase(deleteSeq.fulfilled, (state, {payload}) => {
const id= payload
   state.loading = false

//    toast.success ('le produt est supprimé avec succés')
if (Array.isArray(state.userSeq)) {
    state.userSeq = state.userSeq.filter((seq) => seq._id !== id);
} else {
    state.userSeq = [];
}
}).addCase(deleteSeq.rejected, (state, {payload}) => {
 
 
    state.loading = false
    state.errors= payload

})
// get one sequence

.addCase(getOneSeq.pending, (state, {payload}) => {
    state.loading = true
    
}).addCase(getOneSeq.fulfilled, (state, {payload}) => {
   
   state.loading = false
   state.seqOne = payload.chaine

   
   
}).addCase(getOneSeq.rejected, (state, {payload}) => {
 
  
    state.loading = false

    state.errors= payload
  
})

// get seq user
.addCase(getSeqUser.pending, (state, {payload}) => {
    state.loading = true
   
}).addCase(getSeqUser.fulfilled, (state, {payload}) => {
   

  state.userSeq= payload
//    toast.success(payload.msg)
   
}).addCase(getSeqUser.rejected, (state, {payload}) => {
 state.errors= payload
 
})
.addCase(deleteSeqByChaineId.pending, (state, { payload }) => {
    state.loading = true;
})
.addCase(deleteSeqByChaineId.fulfilled, (state, { payload }) => {
    state.loading = false;
    const deletedSeqIds = payload.deletedSeqIds || [];
    if (Array.isArray(state.userSeq)) {
        state.userSeq= state.userSeq.filter((seq) =>!deletedSeqIds.includes(seq._id));
    } else {
        state.userSeq = [];
    }
    
    
})
.addCase(deleteSeqByChaineId.rejected, (state, { payload }) => {
    state.loading = false;
    state.errors = payload;
});



        }
})
              
        
            export default SeqSlice.reducer
    