const mongoose = require('mongoose')

let books_schema = new mongoose.Schema({
    name :{
        type:String,
        require : true,
    },
    publisher : {
        type:String,
        require : true,
    },
    author :{
        type:String,
        require : true,
    },
    description : {
        type:String,
        require : true,
    },
    price : {
        type:Number,
        require : true,
    },
    release_date:{
        type:Date,
        require : true,
    },
    image_url : {
        type:String,
        require:true
    }


})

let book = mongoose.model('books_collection', books_schema);
module.exports = book;

