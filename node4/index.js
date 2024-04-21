const express = require('express');
const path = require('path');
const fs = require('node:fs');
const { log } = require('console');
const app = express();
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "/public")))

app.get('/', (req, res) => {
    fs.readdir('./files', (err, files) => {
        res.render('index', { files: files })
    })
})
app.get('/file/:fname', (req, res) => {
    fs.readFile(`files/${req.params.fname}.txt`, 'utf8', (err,fdata) => {
       res.render('show',{filename: req.params.fname,filedata: fdata})
    })
})
app.post('/create', (req, res) => {
    fs.writeFile(`./files/${req.body.title.split(" ").join("_")}.txt`, `${req.body.details}`, (err) => {
        console.log(err)
    })
    res.redirect('/')
})

app.listen(3000, (req, res) => console.log("app runnig on 3000"))