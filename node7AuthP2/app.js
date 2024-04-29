const userModel = require('./models/user')
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken')
const app = express()
const bcrypt = require('bcrypt')
app.set('view engine', 'ejs')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))
app.use(cookieParser())

app.get('/', (req, res) => {
    res.render("index");
})
app.get('/logout', (req, res) => {
    res.cookie('token', "")
    res.redirect('/')
})
app.get('/login', (req, res) => {

    res.render('login')
})
app.post('/login', async (req, res) => {
    let user = await userModel.findOne({ email: req.body.email })
    if (user == null) return res.send("something went wrong")

    bcrypt.compare(req.body.password, user.password, function (err, result) {
        if (result) {
            let token = jwt.sign({ email: user.email }, "op")
            res.cookie("token", token)
            res.send("success")
        }
        else res.send("something went wrong.")
    });

})
app.post('/create', async (req, res) => {
    // Destructuring Request Body
    let { userName, password, email, age } = req.body
    bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(password, salt, async function (err, hash) {
            let data = await userModel.create({
                userName,
                password: hash,
                email,
                age
            })

            let token = jwt.sign({ email }, "op")
            res.cookie("token", token)
            res.send(data)
        });
    });

})
app.listen(3000)