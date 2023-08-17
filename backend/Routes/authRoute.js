const express= require('express');
const { signup, signin, current } = require("../Controllers/authController");
const { registerRules,validator, loginRules } = require("../midelwares/validator");
const isAuth = require("../midelwares/isAuth");


const router= express.Router();
// signup create new user
router.post('/signup', registerRules, validator,signup)
//sign in login 
router.post('/signin',loginRules, validator,signin)
//
router.get('/current',isAuth, current)

module.exports= router