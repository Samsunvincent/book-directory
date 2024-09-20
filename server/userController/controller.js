let book = require('../db/model/model');
const { success_function, error_function } = require('../utils/responseHandler')

//add data
exports.create = async function (req, res) {
    try {
        let body = req.body;
        console.log("body", body, 'type of body', typeof (body));

        let new_book = await book.create(body)

        let response = success_function({
            success: true,
            statusCode: 200,
            message: "Added successfully"
        })

        res.status(response.statusCode).send(response)

    } catch (error) {
        console.log("error", error);

        let response = error_function({
            success: false,
            statusCode: 400,
            message: "book adding failed"
        })

        res.status(response.statusCode).send(response);
        return;
    }
}

//get all data


exports.getdata = async function (req, res) {

    try {
        let booksResponse = await book.find();
        console.log('book response', booksResponse)

      

        let response = success_function({
            success: true,
            statusCode: 200,
            message: "fetching successfull",
            data: booksResponse
        })
        res.status(response.statusCode).send(response);
        return;
    } catch (error) {
        console.log("error", error);

        let response = error_function({
            success: false,
            statusCode: 400,
            message: "fetching failed",

        })
        res.status(response.statusCode).send(response)
        return;
    }

}

//get single data

exports.getsingledata = async function (req, res) {
    try {
        let id = req.params.id;
        console.log("id : ", id)

        let single_Data = await book.findOne({ _id: id });
        console.log("single_Data : ", single_Data);

        let strsingle_Data = JSON.stringify(single_Data);
        console.log("strsingle_Data", strsingle_Data);

        let response = success_function({
            success: true,
            statusCode: 200,
            message: "fetching successfull",
            data: strsingle_Data
        })
        res.status(response.statusCode).send(response);
        return;


    } catch (error) {

        console.log("error".error)


        let response = error_function({
            success: false,
            statusCode: 400,
            message: "fetching failed",

        })
        res.status(response.statusCode).send(response)
        return;
    }
}

exports.updatedata = async function (req, res) {
    try {
        let body = req.body;
        console.log("body from update", body)


        let id = req.params.id;
        console.log("id from update", id);

        let update_data = await book.updateOne({ _id: id }, { $set: body });
        console.log("update_data", update_data);

        let strupdate_data = JSON.stringify(update_data);
        console.log("strupdate_data", strupdate_data);

        let response = success_function({
            success: true,
            statusCode: 200,
            message: "update successfull",
            data: strupdate_data
        })
        res.status(response.statusCode).send(response);
        return;
    } catch (error) {
        console.log("error", error);


        let response = error_function({
            success: false,
            statusCode: 400,
            message: "updating failed",

        })
        res.status(response.statusCode).send(response)
        return;

    }
}

exports.deletedata = async function(req,res){
    try {
        
        let id = req.params.id;
        console.log("id from delete",id);

        let delete_Data = await book.deleteOne({_id : id});
        console.log("delete_Data",delete_Data);

        let response = success_function({
            success: true,
            statusCode: 200,
            message: "delete successfull",
            data: delete_Data
        })
        res.status(response.statusCode).send(response);
        return;

    } catch (error) {
        let response = error_function({
            success: false,
            statusCode: 400,
            message: "deleting failed",

        })
        res.status(response.statusCode).send(response)
        return;
    }
}