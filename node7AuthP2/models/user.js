const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/node7')

const userSchema = new mongoose.Schema({
    userName:{type: 'string'},
    email:{type: 'string'},
    password:{type: 'string'},
    age:{type:Number, required: true}
})
module.exports = mongoose.model('User', userSchema)