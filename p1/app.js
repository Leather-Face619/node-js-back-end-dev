const cookieParser = require('cookie-parser')
const userModel = require('./models/user')
const postModel = require('./models/post')
const express = require('express')
const jwt = require('jsonwebtoken')
const app = express()
const bcrypt = require('bcrypt');
app.set('view engine', 'ejs')
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())


app.get('/', (req, res) => {
    res.render("index");

})
app.get('/login', (req, res) => {
    res.render("login");

})
app.get('/profile',isLoggedIn,(req, res) => {
    res.send("Profile hu mai");
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
            res.status(200).send(user)
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
            res.send(user)
        });
    });

})
app.get('/logout', (req, res) => {
    res.clearCookie("token")
    res.send("logged out")
})
function isLoggedIn(req, res, next) {
    const token = req.cookies.token;
    if (!token) {
        return res.send("You must be logged in");
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