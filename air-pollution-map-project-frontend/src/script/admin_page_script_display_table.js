
let CSVtable;
// get incomming JSON table from request to database
const temptext = document.querySelector(".temptext")
const url = "http://localhost:8080/dataTableToWebsite"
function displayIncomingText(url){
    return fetch(url)
    .then(response => response.json())
    .then(data => {
        // textBlock.innerHTML = JSON.stringify(data); // do something with data
        return data;
    })
    .catch(error =>{
        textBlock.textContent = `Something went wrong: ${error}`
    })
}
CSVtable = displayIncomingText(url)

// display table with handsontable API

let HTtable = document.querySelector('.HTtable')

let data = [
    { id: 1, name: 'John', age: 25 },
    { id: 2, name: 'Mary', age: 30 },
    { id: 3, name: 'Peter', age: 40 }
  ]
  
  // Create Handsontable instance and fill it with data from JSON object
  let hot = new Handsontable(HTtable, {
    data: data,
    colHeaders: ['ID', 'Name', 'Age'],
    columns: [
      { data: 'id' },
      { data: 'name' },
      { data: 'age' }
    ],
    licenseKey: 'non-commercial-and-evaluation'
  });

  // my csv data
  const csvDataDiv = document.querySelector('.csvdata')
  
  let csvData = new Handsontable(csvDataDiv,{
    data: CSVtable,
    colHeaders: ['1','2','3','4','5','6','7','8','9','10'],
    columns: [{ data: 'id' },
    { CSVtable: 'id' },
    { CSVtable: 'date' },
    { CSVtable: 'global_id' },
    { CSVtable: 'adm_area' },
    { CSVtable: 'location' },
    { CSVtable: 'district' },
    { CSVtable: 'logitude' },
    { CSVtable: 'latitude' },
    { CSVtable: 'results' }
    ],
    licenseKey: 'non-commercial-and-evaluation'
  })

  const displayJSON = document.querySelector('.displayJSON')
  displayJSON.innerHTML = JSON.stringify(CSVtable)