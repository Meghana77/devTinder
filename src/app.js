const express = require('express');
const User = require('./models/user');

const app = express();

app.use('/', (req, res) => {
    res.send('Response sent successfully'); 
});

app.listen(7777, (req, res) => {
    console.log("listening");
});