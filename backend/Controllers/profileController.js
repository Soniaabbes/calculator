const  User = require("../Model/Users")
//get all users
exports.getAllUsers=async(req,res)=>{
    try {
        const Users= await User.find()
        res.status(201).send({msg:"all users", Users})
        
    } catch (error) {
        res.status(500).send({msg:'there is an error'})
    }
}//


// delete User
exports.deleteUser=async(req,res)=>{
    const {id}= req.params
    try {
        const deleteUser= await User.findByIdAndDelete(id);
        res.status(201).send({msg:'user is deleted'})
    } catch (error) {
        res.status(500).send({msg:'there is an error'})
        
    }
}
// get one user 
exports.getOneUser= async(req,res)=>{
    const {id}= req.params
    try {
        const oneUser= await User.findById(id)
        res.status(201).send({msg:'the user is ', oneUser})
    } catch (error) {
        res.status(500).send({msg:'there is an error'})
        
    }
}