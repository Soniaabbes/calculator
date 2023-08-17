const mongoose = require ("mongoose")
const chaineSchema= new  mongoose.Schema({
    baseNucleo: {
        type: String,
        required: true,
      },
      pourcentageGc:{
        type: String,
      },
      chaineId:{type: mongoose.Schema.Types.ObjectId,
        ref: "User" }
    
      
   

})
module.exports = mongoose.model("Chaine", chaineSchema);