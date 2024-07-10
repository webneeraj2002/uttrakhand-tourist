const express = require('express');
const { Code } = require('mongodb');
const { mongo, default: mongoose } = require('mongoose');

const userSchema = new mongoose.Schema({
    userName:{
        type: String,
        required:[true, 'user name is required']
    },
    state:{
        type: String,
    },
    city:{
        type: String,
    },
    pinCode: {
        type: Number,
    },

    email:{
        type: String,
        required:[true, 'email is required'],
        unique: true
    },
    password:{
        type: String,
        required:[true, 'password is required'],
    },
    address:{
        type: String,
    },
    
    phone:{
        type: String,
        required:[true, 'phone no. is required'],
    },
  
},{timestamps:true});

module.exports= mongoose.model('User', userSchema);