
let CSVtable =[];
// get incomming JSON table with request from database
const temptext = document.querySelector(".temptext")
const url = "http://localhost:8080/dataTableToWebsite"

function getCsvResponse(url){
    fetch(url)
    .then(response => response.json())
    .then(data => { // main part of script. using written functions
        fillTable(data)
    })
    .catch(error =>{
        textBlock.textContent = `Something went wrong: ${error}`
    })
}

getCsvResponse(url)

// display table with handsontable API

function fillTable(CSVtable){
    const csvDataDiv = document.querySelector('.csvdata')
    let hot = new Handsontable(csvDataDiv,{
        data: CSVtable,
        colHeaders: ['1','2','3','4','5','6','7','8','9'],
        columns: [
        { data: 'id' },
        { data: 'date' },
        { data: 'global_id' },
        { data: 'adm_area' },
        { data: 'location' },
        { data: 'district' },
        { data: 'longitude' },
        { data: 'latitude' },
        { data: 'results' }
        ],
        licenseKey: 'non-commercial-and-evaluation'
      })
}
//   const displayJSON = document.querySelector('.displayJSON')
//   displayJSON.innerHTML = JSON.stringify(CSVtable)