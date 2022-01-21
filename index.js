const express = require('express');
const mongoose = require('mongoose');
const env = require('dotenv')
const cookieParser = require('cookie-parser');
const cors = require('cors')
env.config();


const userRoute = require('./routes/user')
const todoRoute = require('./routes/todo')

const app = express();

const url = process.env.URL;

mongoose.connect(url,
    ()=>{
        console.log("Database");
    } 
    ,{ useNewUrlParser: true, useUnifiedTopology: true })


app.use(cors())    
app.use(cookieParser());    
app.use(express.json());
app.use('/api' , userRoute);
app.use('/api' , todoRoute);

if(process.env.NODE_ENV=="production"){
    app.use(express.static('/front/build'))
}

const PORT = process.env.PORT || 5000;

app.listen(PORT,() =>{
    console.log("Server");
})