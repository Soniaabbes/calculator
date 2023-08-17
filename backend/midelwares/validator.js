const express = require('express');
const { body,validationResult } = require('express-validator');
const registerRules = [
    body("username", "username is required").notEmpty(),
    
    body("email", "email is required").isEmail(),
    body("password", "password must have 6 character").isLength({ min: 6 }),
  ];
  const loginRules = [
   
  
    body("email", "email is required").isEmail(),
    body("password", "password is required"). notEmpty(),
  ];
  const validator = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  };
  module.exports = { registerRules,loginRules, validator}