const  User = require("../Model/Users")
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken');
require("dotenv").config()
exports.signup = async (req, res) => {
    
    const { username, email, password} = req.body;
try {
    const userExist= await User.findOne({email})
    if(userExist){
        res.status(409).json({errors:[{msg:"user already exists"}]})
    }
    const user = new User({
        username,
        email,
        password
    });
    user.password= await bcrypt.hash(password,10)
    const payload={id: user._id}
    const token= jwt.sign(payload, process.env.secretKey,{ expiresIn: '3d' });;
    await user.save();
    
    res.status(201).json({msg: 'user created',
    user: { username: user.username, email: user.email, _id: user._id,role:user.role
        },
     token})
} catch (error) {
    res.status(500).json({msg: error.message})

}

};
exports.signin = async (req, res) => {
    
    try {
    const {email, password} = req.body;
    const user= await User.findOne({email})
    if(!user){
        res.status(400).json({errors:[{msg:"bad credentials "}]})
    }
    const isMatch= await bcrypt.compare(password, user.password)
    if(!isMatch){return res.status(400).json({errors:[{msg:"bad credentials"}]})}
   //generate token 
    const payload={id: user._id}
    const token= jwt.sign(payload, process.env.secretKey,{ expiresIn: '3d' });;
    await user.save();
    
    return res.status(200).json({msg: 'user is connected', user:{username:user.username, email: user.email,_id:user._id, role:user.role
    }, token})
} catch (error) {
   console.log(error)
}

}
exports.current = async (req, res) => {
   
    try {
      const user = await User.findById(req.user.id).lean().exec();
     
      const { password, ...rest } = user;
      res.send(rest);
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  };
