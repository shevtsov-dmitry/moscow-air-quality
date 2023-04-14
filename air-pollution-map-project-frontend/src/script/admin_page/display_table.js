// table initialization
// configuration optimized in async function - interactionsWithTable()
const csvDataDiv = document.querySelector('.csvdata')
let hot = new Handsontable(csvDataDiv,{
    data: [[]],
    colHeaders: true,
    columns: true,
    licenseKey: 'non-commercial-and-evaluation'
})

const url = "http://localhost:8080/dataTableToWebsite"
getCsvResponse(url)

// get incoming JSON table with request from database
// requiring JSON file from server and then use fill table
// function to display full table, which admin just uploaded
function getCsvResponse(url){
    fetch(url)
    .then(response => response.json())
    .then(data => {
        interactionsWithTable(data)
    })
    .catch(error =>{
        textBlock.textContent = `Something went wrong: ${error}`
    })
}

// get columns names from database
// parent async fn
async function getColumnNames(){
    try{
        const url = "http://localhost:8080/getColumnNames";
        const response = await fetch(url)
        let data = await response.json()
        return data
    }
    catch(error){
        console.log("Failed to obtain column names, because: " + error)
    }
}
// display table with handsontable API
// this function will start working only after parent getColumnNames()
async function interactionsWithTable(CSVtable){
    try{
        let list = '' // string of column's names
        const data = await getColumnNames(); // getting incoming data from function

        // fixing string to appropriate format
        list = JSON.stringify(data)
        list = list.substring(1,list.length - 1)
        list = list.replaceAll('"','')

        // adding all strings into array
        let arr = list.split(',')

        // filling columns array with values
        let columns = arr.map(element => {
            return {data: element.toLowerCase()} // lowercase is essential!
        })
        // table config
        hot = new Handsontable(csvDataDiv,{
            data: CSVtable,
            colHeaders: arr,
            columns: columns,
            licenseKey: 'non-commercial-and-evaluation'
        })

        // data array of objects, that will be sent into map HTML file
        let dataObject = []
        for (let i = 0; i < hot.countRows() - 1; i++) {
            let row = hot.getDataAtRow(i)
            let obj = {}
            for (let j = 0; j < row.length; j++) {
                obj[columns[j].data] = row[j]
            }
            dataObject.push(obj)
        }
        // console.log(dataObject)

        // select * from station name
    }
        catch(error){
        console.log(`Something went wrong in interactionsWithTable function: ${error}`);
    }
}

async function showAllTable(){}
async function showById(){}
async function showByStationName(){}
async function showByParameter(){}