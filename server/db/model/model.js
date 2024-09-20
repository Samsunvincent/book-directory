const mongoose = require('mongoose')

let books_schema = new mongoose.Schema({
    name :{
        type:String,
        required : true,
    },
    publisher : {
        type:String,
        required : true,
    },
    author :{
        type:String,
        required : true,
    },
    description : {
        type:String,
        required : true,
    },
    price : {
        type:Number,
        required : true,
    },
    release_date:{
        type:Date,
        required : true,
    },
    image_url : {
        type:String,
        required:true
    }


})

let book = mongoose.model('books_collection', books_schema);
module.exports = book;

