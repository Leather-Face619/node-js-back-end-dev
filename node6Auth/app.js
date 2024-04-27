const express = require('express');
const cookieParser = require('cookie-parser')
const app = express();
app.use(cookieParser())
app.get('/', (req, res) => {
    res.cookie('Name', 'Arv')
    res.send("ok ");
})
app.get('/read', (req, res) => {
    console.log('Cookies: ', req.cookies)
    res.send("ok ");
})
app.listen(3001, () => {
    console.log("hello bro 3001");
})