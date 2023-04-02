// table initialization
// configuration optimized in async function - fillTable()
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
        fillTable(data)
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
async function fillTable(CSVtable){
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

        // let dates = hot.getDataAtCol(1)
        // for (let i = 0; i < dates.length; i++) {
        //     const dateObj = new Date(dates[i]);
        //     const day = dateObj.getDate();
        //     const month = dateObj.getMonth() + 1;
        //     const year = dateObj.getFullYear();
        //     const formattedDate = `${day}.${month}.${year}`;
        //     console.log(formattedDate);
        //   }
    }
    catch(error){
        console.log(`Something went wrong in fillTable function: ${error}`);
    }
}

async function awaitMe(){
    let data = await hot.getDataAtCol(1)
    return data
}

async function main() {
    try {
      await fillTable()
      let arrWin = await awaitMe()
      console.log(arrWin)
    } catch (error) {
      console.log(`Error in main function: ${error}`)
    }
  }
  
  main()

let pressThis = document.querySelector(".temptext")
pressThis.addEventListener('click',()=>{
    console.log(arrWin)
})