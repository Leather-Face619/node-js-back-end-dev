const cookieParser = require('cookie-parser')
const userModel = require('./models/user')
const postModel = require('./models/post')
const express = require('express')
const jwt = require('jsonwebtoken')
const multer = require('./utils/multer')
const app = express()
const bcrypt = require('bcrypt');
const path = require('path')
app.set('view engine', 'ejs')
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname,"public")))


app.get('/', (req, res) => {
    res.render("index");

})
app.get('/login', (req, res) => {
    res.render("login");
})
app.get('/like/:id', isLoggedIn, async (req, res) => {
    let post = await postModel.findOne({_id: req.params.id}).populate("user")
    
    if (post.likes.indexOf(req.user.userid) === -1) {
        post.likes.push(req.user.userid)
    }
    else {
        post.likes.splice(post.likes.indexOf(req.user.userid), 1)

    }
    await post.save()
    res.redirect("/profile")
})
app.get('/edit/:id', isLoggedIn, async (req, res) => {
    let post = await postModel.findOne({_id: req.params.id})
    res.render("edit",{post})
})

app.post('/post/update/:id', isLoggedIn, async (req, res) => {
    let { content } = req.body
    let post = await postModel.findOneAndUpdate({_id:req.params.id},{content})
    await post.save()
    res.redirect('/profile')
})
app.post('/post', isLoggedIn, async (req, res) => {
    let { content } = req.body
    let user = await userModel.findOne({ email: req.user.email })

    let post = await postModel.create({
        user: user._id,
        content,
        
    })
    user.posts.push(post._id)
    await user.save()
    res.redirect('/profile')
})
app.get('/profile', isLoggedIn, async (req, res) => {
    let user = await userModel.findOne({ email: req.user.email }).populate("posts")
    res.render("profile", { user });
})
app.get('/profile/upload', isLoggedIn, async (req, res) => {
    
    res.render("picUpload");
})
app.post('/upload', isLoggedIn,multer.single("image"), async (req, res) => {
    let user = await userModel.findOne({email:req.user.email})
    user.profilePic =  req.file.filename
   
    await user.save()
    res.redirect("/profile")
})
app.post('/login', async (req, res) => {
    let { email, password } = req.body

    var user = await userModel.findOne({ email })

    if (!user) {
        return res.send("User does not exist")
    }

    bcrypt.compare(password, user.password).then(function (result) {
        if (result) {
            var token = jwt.sign({ email: email, userid: user._id }, 'shhhhh');
            res.cookie("token", token)
            res.redirect("profile")
            //    res.status(200).send(user)
        } else {
            res.send("incorrect Password ")
        }
    });



})

app.post('/create', async (req, res) => {
    let { userName, name, email, password, age } = req.body

    var us = await userModel.findOne({ email })
    if (us) return res.send(us)

    bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(password, salt, async function (err, hash) {
            let user = await userModel.create({
                userName,
                name,
                age,
                email,
                password: hash
            })

            var token = jwt.sign({ email: email, userid: user._id }, 'shhhhh');
            res.cookie("token", token)
            res.redirect("/login")
        });
    });

})
app.get('/logout', (req, res) => {
    res.clearCookie("token")
    res.redirect("/login")
})
function isLoggedIn(req, res, next) {
    const token = req.cookies.token;
    if (!token) {
        return res.redirect("/login");
    }
    try {
        let data = jwt.verify(token, "shhhhh");
        req.user = data;
        next();
    } catch (err) {
        return res.send("Invalid token");
    }
}

app.listen(3000)