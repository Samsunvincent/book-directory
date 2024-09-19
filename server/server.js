const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();


const mongoConnect = require('../server/db/connect');
const router = require('./router/router');
mongoConnect();

app.use(express.static('../client'))
app.use(express.json())
app.use(express.urlencoded({extended : true}));
app.use(router)



app.listen(process.env.PORT,()=>{
    console.log(`server is running at http://localhost:${process.env.PORT}`)
})