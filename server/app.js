
let express = require('express');
require('./db/conn');
// let dotenv = require('dotenv');
// dotenv.config({path:'./config.env'});        // These two are already required in conn.js

let app = express();

let PORT = process.env.PORT;
app.listen(PORT, ()=>{
    console.log(`at ${PORT} running`);
});

// Making use of router

// Json type specification through code and postman is required like below
app.use(express.json());
app.use(require('./router/auth'));

let middleware = (req, res, next) => {
    console.log('At middleware');
    next();
}

app.get('/about', middleware, (req, res)=>{     // This middleware function will be called, as request arrived -> middleware -> serving request
    // Any change done to req.body through middleware function, will reflect here
    res.send('Hello world about');
});

console.log(123); // Despite being at last, this is logged at very first, why ?
