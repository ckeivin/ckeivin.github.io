async function fetch_sample_request() {	
    const uri = 'https://pythonoreilly-nfrgyuxdzq-as.a.run.app/api/v1/get_isbn_sample';

    let h = new Headers();
    h.append('Content-Type','application/json')
    h.append('charset','utf-8')
    h.append('accept','text/html')

    let req = new Request(uri, {
        method: 'GET',
        headers: h,
        
    });
    // let response_data = await 
    let response_data = await fetch(req)
        .then( (response)=>{
            if(response.ok){
                return response.json(); //converts to json 
            }else {
                throw new Error("Response encountered some issues!");
                
            }
        })
        .then(data => {console.log(data); return data;})
        .catch( (err) =>{
            console.log(err)
        });
    return response_data
}

async function fetch_sample_data(){

    ShowAwaiting();
    try
    {   
        document.getElementById("inlineFormInputKeyword").value = "golang"
        document.getElementById("inlineFormInputPages").value = "2"
        response_data = await fetch_sample_request()
        var x = document.getElementById("responseDiv");
        x.querySelector("#responseData").innerHTML = JSON.stringify(response_data);      
    }
    finally
    {
        HideAwaiting();
    }
}

async function fetch_request() {	
    const uri = 'https://pythonoreilly-nfrgyuxdzq-as.a.run.app/api/v1/get_isbn';
    let keyword_string = document.getElementById("inlineFormInputKeyword").value;
    let pages_string = document.getElementById("inlineFormInputPages").value;
    
    let payload = {
        keyword: keyword_string,
        pages: pages_string
    }
    let h = new Headers();
    h.append('Content-Type','application/json')
    h.append('charset','utf-8')
    h.append('accept','text/html')

    let req = new Request(uri, {
        method: 'POST',
        headers: h,
        body : JSON.stringify(payload),
        
    });
    if ((!keyword_string) || (!pages_string)) {
        alert("keyword/pages value is invalid")
    } else {
        let response_data = await fetch(req)
        .then( (response)=>{
            if(response.ok){
                return response.json(); //converts to json 
            }else {
                throw new Error("Response encountered some issues in PUT request!");
                
            }
        })
        .then(data => {console.log(data); return data;})
        .catch( (err) =>{
            console.log(err)
        });
        return response_data
    }

}

async function fetch_data(){

    ShowAwaiting();
    try
    {
        response_data = await fetch_request()
        var x = document.getElementById("responseDiv");
        x.querySelector("#responseData").innerHTML = JSON.stringify(response_data); 

    }
    finally
    {
        HideAwaiting();
    }
}

// function CreateTableFromJSON(jsonData){
//     var col = [];
//     for (var i = 0; i < jsonData.length; i++) {
//         for (var key in jsonData[i]) {
//             if (col.indexOf(key) === -1) {
//                 col.push(key);
//             }
//         }
//     }
//      // CREATE DYNAMIC TABLE.
//      var table = document.createElement("table");

//      // CREATE HTML TABLE HEADER ROW USING THE EXTRACTED HEADERS ABOVE.

//      var tr = table.insertRow(-1);                   // TABLE ROW.

//      for (var i = 0; i < col.length; i++) {
//          var th = document.createElement("th");      // TABLE HEADER.
//          th.innerHTML = col[i];
//          tr.appendChild(th);
//      }

//      // ADD JSON DATA TO THE TABLE AS ROWS.
//      for (var i = 0; i < jsonData.length; i++) {

//          tr = table.insertRow(-1);

//          for (var j = 0; j < col.length; j++) {
//              var tabCell = tr.insertCell(-1);
//              tabCell.innerHTML = jsonData[i][col[j]];
//          }
//      }

//      // FINALLY ADD THE NEWLY CREATED TABLE WITH JSON DATA TO A CONTAINER.
//      var divContainer = document.getElementById("responseData");
//      divContainer.innerHTML = "";
//      divContainer.appendChild(table);
// }



// To only hide the icon when every ShowAwaiting call was met with a HideAwaiting call
var globalAwaitingCounter = 0;

// Show wait icon
function ShowAwaiting()
{
    if(globalAwaitingCounter <= 0)
    {
        document.getElementById("awaiting").style.visibility = "visible";
        globalAwaitingCounter = 1;
    }
    else
    {
        globalAwaitingCounter++;
    }
}

// Hide wait icon
function HideAwaiting()
{
    if(globalAwaitingCounter <= 1)
    {
        document.getElementById("awaiting").style.visibility = "hidden";
        globalAwaitingCounter = 0;
    }
    else
    {
        globalAwaitingCounter--;
    }
}