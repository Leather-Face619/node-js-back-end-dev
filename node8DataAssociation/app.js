const express = require('express');
const userModel = require('./models/user')
const postModel = require('./models/post');
const { default: mongoose } = require('mongoose');
const app = express();

app.get('/', (req, res) => {
    res.send("fff");
})
app.get('/create', async (req, res) => {
   var user = await userModel.create({
        userName: "Leather-face",
        email: "leather-face@gmail.com",
        password: "password",
        age: "20" 
    })
    res.send(user);
})
app.get('/create/post', async (req, res) => {
   var post = await postModel.create({
    postData:"Hello everyone ",
    user:"6630720f6b00f48b4b995f56"
})
var fuser = await userModel.findOne({_id:"6630720f6b00f48b4b995f56"}) 
    fuser.posts.push(post._id)
    fuser.save()
    res.send([post, fuser]);
})

app.listen(3000)