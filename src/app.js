const express = require('express');
const User = require('./models/user');
const connectDb = require('./config/dbconnection');

const app = express();

app.use('/', (req, res) => {
    res.send('Response sent successfully'); 
});

connectDb().then(() => {
    app.listen(process.env.PORT, (req, res) => {
    console.log("listening");
});
}).catch(err => {
    console.log("Connection to DB failed");
});