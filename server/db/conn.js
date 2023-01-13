let mongoose = require('mongoose');
let dotenv = require('dotenv');
dotenv.config({path:'./config.env'});

let DB = process.env.DATABASE;

mongoose.connect(DB, {
    // useNewUrlParser: true,       // whats use of these 3 arguments ?
    // useCreateIndex: true,
    // useUnifiedTopology: true,
    // useFindAndModify: false
}).then(()=>{
    console.log('db connected')
}).catch((err)=>console.log('db not found ' + DB + ' EROor: '+ err));