// import express from 'express';
const express = require('express');

// import user from './usermodel'
const user = require('./usermodel')
const app = express()

app.get('/', (req, res) => {
    res.send("200");
})
app.get('/create', async (req, res) => {
    var us = await user.create({
        name: 'ravi pal',
        email: 'aaraviatest@gmail.com',
        phone: 4444567890
    })
    res.send(us);
})
app.get('/find', async (req, res) => {
    var us = await user.find({})
    res.send(us);
})
app.listen(3000, (req, res) => { console.log("port wunning on 3000"); })