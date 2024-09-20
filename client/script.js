

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
        let dle=document.getElementById('dle');

        let rows = ''
        let row='';
        for(i=0;i<data.length;i++){
            
            rows+=`
            <div>
                <div><img src = "${data[i].image_url}" onclick ="handleclick('${data[i]._id}')"></div>
                <div  onclick ="handleclick('${data[i]._id}')">${data[i].name}</div>
                <div onclick ="handleclick('${data[i]._id}')">${data[i].author}</div>
                <div onclick ="handleclick('${data[i]._id}')">${data[i].release_date}</div>
            </div>
            

            `;
           
        }
        
        viewcontainer.innerHTML = row;
        dle.innerHTML=rows;


    } catch (error) {
        console.log("error from viewdata",error)
    }
}

//single data


function handleclick(id){
    console.log('id from handleclick',id);
    window.location = `single-data.html?id=${id}`

}

async function singleData(){
    
let params = new URLSearchParams(window.location.search);
console.log("params from singledata",params)

let id = params.get('id');
console.log("id from single data : ",id)

try {
    let response = await fetch(`/singledata/${id}`,{method : 'GET',})
    console.log("response from single data",response);

    let parsed_response = await response.json();
    console.log("parsed_Response from single data : ",parsed_response);

    let data = parsed_response.data;
    console.log("data from single data : ",data)

    let singleContainer = document.getElementById('singlecontainer')
    let description = document.getElementById('description')


    let rows = `
    <div>${data.name}</div>
    <div>${data.publisher}</div>
    <div>${data.author}</div>
    <div>${data.price}</div>
    <div>${data.release_date}</div>
    <div><img src = "${data.image_url}"></div>


    `
    let rows1 =`
    <div>${data.description}</div>
    
    `

    singleContainer.innerHTML = rows;
    description.innerHTML = rows1
} catch (error) {
    console.log("error",error)
}


}


//add data by admin


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

//update data

function typefill(){

}