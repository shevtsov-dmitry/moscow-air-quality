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

// get incomming JSON table with request from database
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
        const data = await getColumnNames(); // getting incomming data from function

        // fixing string to appropriate format
        list = JSON.stringify(data)
        list = list.substring(1,list.length - 1)
        list = list.replaceAll('"','')

        // adding all strings into array
        let arr = list.split(',')

        // filling columns array with values
        // and counting the index until it's date index
        // I will use it later to format date in table
        let iteratorFindDate = 0; // variable just for loop below
        let dateColumnIndex = 0 // variable, which will be used later
        let columns = arr.map(element => {
            if(element === "period") dateColumnIndex = iteratorFindDate // little bit hard code 
            iteratorFindDate++
            return {data: element.toLowerCase()} // lowercase is essential!
        })
        // table config
        hot = new Handsontable(csvDataDiv,{
            data: CSVtable,
            colHeaders: arr,
            columns: columns,
            licenseKey: 'non-commercial-and-evaluation'
        })
        
        // changing date into new format from previosly retrieved date index
        // at first filling new array with formated view of date
        let dates = hot.getDataAtCol(dateColumnIndex)
        let formattedDateArray = []
        for (let i = 0; i < dates.length; i++) {
            let dateObj = new Date(dates[i]);
            // let day = dateObj.getDate(); // day is redundant
            let month = dateObj.getMonth() + 1;
            let year = dateObj.getFullYear();
            formattedDateArray.push(`${month}.${year}`)
        }
        // then insert it into table
        for(let i = 0; i < dates.length; i++){
            hot.setDataAtCell(i, dateColumnIndex, formattedDateArray[i])
        }
        // ========================================================
        
    }
    catch(error){
        console.log(`Something went wrong in interactionsWithTable function: ${error}`);
    }
}
