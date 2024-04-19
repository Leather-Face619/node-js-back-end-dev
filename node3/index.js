import express from 'express';
import { fileURLToPath } from 'url';
import { dirname }from 'path';
var app = express()
//Inka use incoming request object ko handle karne mein hota hai.
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.set('view engine', 'ejs')



 const __filename = fileURLToPath(import.meta.url);
 const __dirname = dirname(__filename);



 app.use(express.static(__dirname + '/public'));


app.get("/",(req, res) =>{
res.render("home")
})
app.get("/pro/:name",(req, res) =>{
res.send(`hello ${req.params.name}`)
})
app.get("/pro/:name/:age",(req, res) =>{
res.send( req.params)
})
app.listen(3000,()=>{
    console.log("Server is running on port 3000")
})