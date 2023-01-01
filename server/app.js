const mongoose = require('mongoose');
const express = require('express');
const app = express();

const DB = 'mongodb+srv://rishikeshpawar:rutu6march@cluster0.uplqyax.mongodb.net/MERNTHAPA?retryWrites=true&w=majority'

mongoose.connect(DB, {
    // useNewUrlParser: true,       // whats use of these 3 arguments ?
    // useCreateIndex: true,
    // useUnifiedTopology: true,
    // useFindAndModify: false
}).then(()=>{
    console.log('db connected')
}).catch((err)=>console.log('db not found'));

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

app.listen(4000, ()=>{
    console.log('at 4000 running')
});

console.log(123);