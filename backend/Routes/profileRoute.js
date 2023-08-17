const express= require('express');
const { getAllUsers, deleteUser, getOneUser } = require('../Controllers/profileController');
const isAuth = require('../midelwares/isAuth');
const routere= express.Router();
//get all users
routere.get("/getAllUsers", getAllUsers)
routere.delete('/deleteUser/:id',deleteUser )
// get one user 
routere.get ('/userOne/:id',getOneUser)
module.exports = routere;
