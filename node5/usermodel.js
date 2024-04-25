// import mongoose from "mongoose";
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/mongoTest')
   
    const userSchema = new mongoose.Schema({
        name:{type: 'string'},
        email:{type: 'string'},
        phone:{type:Number, required: true}
    })
   module.exports =  mongoose.model('user', userSchema)