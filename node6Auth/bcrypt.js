const express = require('express');
const bcrypt = require('bcrypt');
const saltRounds = 1;
var pass = "leather-face"
var hash = "$2b$04$bQYqZFY1seC2JVuDrrTJEOU1V/OdZMwjEeICGVdQV6jmJumojQsr2" 
const app = express();

app.get('/', (req, res) => {
    //Encrypt password
    bcrypt.genSalt(saltRounds, function (err, salt) {
        bcrypt.hash(pass, salt, function (err, hash) {
            console.log("=>" + hash);
        });
    });
    res.send("salt");
})
app.get('/com', (req, res) => {
    // Load hash from your password DB.
    bcrypt.compare(pass, hash, function(err, result) {
       console.log(result);
    });
    
    res.send("password");

});
app.listen(3000, () => {
    console.log("hello bcrypt 3000");
})