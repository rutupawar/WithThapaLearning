
const express = require('express');
const app = express();
const dotenv = require('dotenv');
require('./db/conn');

dotenv.config({path:'./config.env'});

const PORT = process.env.PORT;

app.get('/',(req, res)=>{
    res.send('Hello world root');
});

const middleware = (req, res, next) => {
    console.log('At middleware');
    next();
}

app.get('/about', middleware, (req, res)=>{
    res.send('Hello world about');
});

app.listen(PORT, ()=>{
    console.log(`at ${PORT} running`)
});

console.log(123);