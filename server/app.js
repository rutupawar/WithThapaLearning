
let express = require('express');
let app = express();

require('./db/conn');

let PORT = process.env.PORT;
app.listen(PORT, ()=>{
    console.log(`at ${PORT} running`)
});

app.get('/',(req, res)=>{
    res.send('Hello world root');
});

let middleware = (req, res, next) => {
    console.log('At middleware');
    next();
}

app.get('/about', middleware, (req, res)=>{     // This middleware function will be called, as request arrived -> middleware -> serving request
    res.send('Hello world about');
});

console.log(123); // Despite being at last, this is logged at very first, why ?
