const express= require ("express")
const connectDB= require ('./Config/config')
const app= express()
connectDB()
app.use (express.json())
//authentification
app.use('/api/auth',require('./Routes/authRoute'));
app.use('/api/chaine',require('./Routes/chaineRoute'));
app.use('/api/profile',require("./Routes/profileRoute"));

const port=5000
app.listen(port,()=>{console.log(`server run on port ${port}`)})
