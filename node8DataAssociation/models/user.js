const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/node8")

const userSchema = new mongoose.Schema({
    userName: String,
    email: String,
    password: String,
    age: Number,
    posts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'post'
    }]
})

const userModel = mongoose.model('User', userSchema)
module.exports =  userModel