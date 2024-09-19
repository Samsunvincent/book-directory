let book = require('../db/model/model');
const { success_function, error_function} = require('../utils/responseHandler')

//add data
exports.create = async function(req,res){
    try {
        let body = req.body;
        console.log("body",body,'type of body',typeof(body));

        let new_book  = await book.create(body)

        let response = success_function({
            success : true,
            statusCode : 200,
            message : "Added successfully"
        })

        res.status(response.statusCode).send(response)

    } catch (error) {
        console.log("error",error);

        let response = error_function({
            success : false,
            statusCode :400,
            message : "book adding failed" 
        })

        res.status(response.statusCode).send(response);
        return;
    }
}

//get all data


exports.getdata = async function(req,res) {

    try {
        let booksResponse = await book.find();
        console.log('book response',booksResponse)

        let str_bookResponse = JSON.stringify(booksResponse);
        console.log("str_bookResponse",str_bookResponse);

        let response = success_function({
            success : true,
            statusCode : 200,
            message: "fetching successfull",
            data : str_bookResponse
        })
        res.status(response.statusCode).send(response);
        return;
    } catch (error) {
        console.log("error",error);

        let response = error_function({
            success : false,
            statusCode : 400,
            message : "fetching failed",
            
        })
        res.status(response.statusCode).send(response)
        return;
    }
    
}

//get single data

exports.getsingledata = async function(req,res){
    try {
        let id = req.params.id;
        console.log("id : ",id)

        let single_Data = await book.findOne({_id : id});
        console.log("single_Data : ",single_Data);

        let strsingle_Data = JSON.stringify(single_Data);
        console.log("strsingle_Data",strsingle_Data);

        let response = success_function({
            success : true,
            statusCode : 200,
            message: "fetching successfull",
            data : strsingle_Data
        })
        res.status(response.statusCode).send(response);
        return;


    } catch (error) {

        console.log("error".error)


        let response = error_function({
            success : false,
            statusCode : 400,
            message : "fetching failed",
            
        })
        res.status(response.statusCode).send(response)
        return;
    }
}