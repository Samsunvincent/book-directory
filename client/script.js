

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
        
        viewcontainer.innerHTML = rows;
      


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

async function adminView(){
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
            <div>
                <div><img src = "${data[i].image_url}" onclick ="handleclick('${data[i]._id}')"></div>
                <div  onclick ="handleclick('${data[i]._id}')">${data[i].name}</div>
                <div onclick ="handleclick('${data[i]._id}')">${data[i].author}</div>
                <div onclick ="handleclick('${data[i]._id}')">${data[i].release_date}</div>
                <div><button onclick ="updateClick('${data[i]._id}')">update</button>
                <div><button onclick ="deleteClick('${data[i]._id}')">delete</button>


            </div>
            

            `;
           
        }
        
        viewcontainer.innerHTML = rows;
        // dle.innerHTML=rows;


    } catch (error) {
        console.log("error from viewdata",error)
    }
}


// update data

function updateClick(id){

    console.log('buttonclicked')
console.log("id from updateclick",id);

window.location = `updateData.html?id=${id}`;

}

async function typefill(){
    let name = document.getElementById('name')
    let publisher = document.getElementById('publisher')
    let author = document.getElementById('author')
    let description = document.getElementById('description')
    let price = document.getElementById('price')
    let release_date = document.getElementById('releasedate')
    let image_url = document.getElementById('image')

    let params = new URLSearchParams(window.location.search);
    console.log("params from typefill",params);

    let id = params.get('id');
    console.log("id from typefill",id);

    try {
        let response  = await fetch(`/singledata/${id}`,{method : 'GET'});
        console.log("response from typefill",response);

        let parsed_response = await response.json();
        console.log("parsed response from typefill : ",parsed_response);

        let data = parsed_response.data;
        console.log("data from typefill",data)

        name.value = data.name;
        publisher.value = data.publisher;
        author.value = data.author;
        description.value = data.description;
        price.value = data.price;
        release_date.value = data.release_date;
      
        image_url.value = data.image_url;

    } catch (error) {
        console.log("error from typefill",error)
    }

}


async function UpdateBook(event){
    event.preventDefault();
  
    

    let name = document.getElementById('name').value
    let publisher = document.getElementById('publisher').value
    let author = document.getElementById('author').value
    let description = document.getElementById('description').value
    let price = document.getElementById('price').value
    let release_date = document.getElementById('releasedate').value
    let image_url = document.getElementById('image').value

    let params = new URLSearchParams(window.location.search);
    console.log("params from updatebook",params);

    let id = params.get('id');
    console.log('id',id)

    let data = {
        name,
        publisher,
        author,
        description,
        price,
        release_date,
        image_url
    }

    console.log("data from updatebook",data);

    let strdata = JSON.stringify(data);
    console.log("strdata",strdata);


    try {
        let response = await fetch(`/updatedata/${id}`,{
            method : 'PUT',
            headers :{ 'Content-Type' : 'application/json'},
            body : strdata
        })

        
      window.location = `admin.html?id=${id}`
       
        console.log("response from updatebook",response)
    } catch (error) {
        console.log("errror",error)
    }
}

async function deleteClick(id){
    
try {
    let response = await fetch(`/deletedata/${id}`,{
        method : 'DELETE'
    })
    console.log("response",response)

    if(response){
        alert('deleted succesfully')
    }
    else{
        alert('something went wrong')
    }
    window.location = `admin.html`
    
    
} catch (error) {
    console.log("error",error)
}
}




