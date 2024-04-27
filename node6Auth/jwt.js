const express = require('express');
var jwt = require('jsonwebtoken');
const app = express();
const cookieParser = require('cookie-parser');
app.use(cookieParser());
app.get('/', (req, res) => {
    var token = jwt.sign({ email: 'rahulTest@gmail.com' }, 'secret');
    
    res.cookie("token", token);
   
    res.send(token);
})
app.get('/read', (req, res) => {
    if (!req.cookies.token) {
        return res.status(401).send("Token not provided");
    }

    try {
        // Verify the token
        let data = jwt.verify(req.cookies.token, 'secret');
        console.log(data);
        res.send("done");
    } catch (error) {
        // Handle invalid token
        return res.status(401).send("Invalid token");
    }
})

app.listen(3000, () => {
    console.log("hello jwt 3000");
})