

function viewpage(){
    window.location = `viewdata.html`
}

async function viewData(){

    try {
        let response = await fetch('/getdata',{
            method : 'GET',
            headers : {
                'Content-Type' : 'text/plain'
            }
        })
        console.log("fetched",response)

        let parsed_response = await response.json();
        console.log("parsed_response from viewdata",parsed_response)

        let data = parsed_response.data;
        console.log("data from viewdata",data);

        let viewcontainer = document.getElementById('viewcontainer');

        let rows = ''
        for(i=0;i<data.length;i++){
            
            rows+=`
            <div  onclick ="handleclick('${data[i]._id}')">${data[i].name}</div>
            <div>${data[i].publisher}</div>
            <div>${data[i].author}</div>
            <div>${data[i].description}</div>
            <div>${data[i].price}</div>
            <div>${data[i].release_date}</div>
            <div>${data[i].image_url}</div>
            `
        }

        viewcontainer.innerHTML = rows;

    } catch (error) {
        console.log("error from viewdata",error)
    }
}
function handleclick(id){
    console.log('id from handleclick',id);
    window.location = `single-data.html?id=${id}`

}

async function addbook(){

   
   
    let name = document.getElementById('name').value
    let publisher = document.getElementById('publisher').value
    let author = document.getElementById('author').value
    let description = document.getElementById('description').value
    let price = document.getElementById('price').value
    let image_url = document.getElementById('image').value
    let release_date = document.getElementById('releasedate').value

    let data ={
        name,
        publisher,
        author,
        description,
        price,
        image_url,
        release_date
    };
    console.log("data from add ",data);

    let strdata = JSON.stringify(data);
    console.log('strdata',strdata);

    try {
        let response = await fetch('/create',{
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json'
            },
            body : strdata
        })
        let parsed_response = await response.text();
        console.log("parsed_response from post",parsed_response)
        if (response.status === 200) {
            alert('user created successfully');
            
            window.location = `admin.html`;
        }
        else {
            alert('something went wrong')
        }
    } catch (error) {
        console.log("error",error)
    }


}