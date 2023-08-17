import { configureStore } from '@reduxjs/toolkit'


import authReducer from "./AuthSlice"
import seqReducer from "./SeqSlice"
import profileReducer from './ProfileSlice'


const store = configureStore({
    reducer:{
  auth: authReducer,
  chaine: seqReducer,
  profile:profileReducer


}
})

export default store