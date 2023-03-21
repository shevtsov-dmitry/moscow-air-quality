const url = "http://localhost:8080/dataTableToWebsite"
getCsvResponse(url)

// get incomming JSON table with request from database
// requiring JSON file from server and then use fill table
// function to display full table, which admin just uploaded
function getCsvResponse(url){
    fetch(url)
    .then(response => response.json())
    .then(data => {
        fillTable(data)
    })
    .catch(error =>{
        textBlock.textContent = `Something went wrong: ${error}`
    })
}

// get columns names from database
async function getColumnNames(){
    const url = "http://localhost:8080/getColumnNames";
    const response = await fetch(url)
    data = await response.json()
    return data
}
// display table with handsontable API

async function fillTable(CSVtable){
    let list = []
    const data = await getColumnNames();
    list = data
    const displayJSON = document.querySelector('.temptext')
    displayJSON.textContent = list

    const csvDataDiv = document.querySelector('.csvdata')
    // table config
    new Handsontable(csvDataDiv,{
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
