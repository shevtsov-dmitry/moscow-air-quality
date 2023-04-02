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
// parent async fn
async function getColumnNames(){
    const url = "http://localhost:8080/getColumnNames";
    const response = await fetch(url)
    data = await response.json()
    return data
}
// display table with handsontable API
// this function will start working only after parent getColumnNames()
async function fillTable(CSVtable){
    let list = '' // string of column's names
    const data = await getColumnNames(); // getting incomming data from function

    // fixing string to appropriate format
    list = JSON.stringify(data)
    list = list.substring(1,list.length - 1)
    list = list.replaceAll('"','')

    // adding all strings into array
    arr = list.split(',')

    // filling columns array with values 
    let columns = arr.map(element => {
        return {data: element.toLowerCase()} // lowercase is essential!
      })

    // table config
    const csvDataDiv = document.querySelector('.csvdata')
    new Handsontable(csvDataDiv,{
        data: CSVtable,
        colHeaders: arr,
        columns: columns,
        licenseKey: 'non-commercial-and-evaluation'
    })

    console.log(csvDataDiv.select)
}
