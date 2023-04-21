// *** table initialization
// * configuration optimized in async function - createTable()
const csvDataDiv = document.querySelector('.csvdata')
let hot = new Handsontable(csvDataDiv, {
    data: [[]],
    colHeaders: true,
    columns: true,
    licenseKey: 'non-commercial-and-evaluation'
})

// TODO - MAKE LOADING SIGN WHEN UPLOAD TABLE

const url = "http://localhost:8080/dataTableToWebsite"
public_static_void_main_String_args(url)

// ** Main function
// get incoming JSON table with request from database
// requiring JSON file from server and then use fill table
// function to display full table, which admin just uploaded
function public_static_void_main_String_args(url) {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            let hot = createTable(data)
            // console.log(hot) PROMISE PENDING

        })
        .catch(error => {
            console.log(`Something went wrong: ${error}`)
        })
}

// * getters
// parent async fn
async function getColumnNames() {
    try {
        const url = "http://localhost:8080/getColumnNames";
        const response = await fetch(url)
        return await response.json()
    }
    catch (error) {
        console.log("Failed to obtain column names, because: " + error)
    }
}

async function getColHeaders() {
    let list = '' // string of column's names
    const data = await getColumnNames(); // getting incoming data from function
    // fixing string to appropriate format
    list = JSON.stringify(data)
    list = list.substring(1, list.length - 1)
    list = list.replaceAll('"', '')
    // adding all strings into array
    return list.split(',')
}

async function getColumns() {
    // filling columns array with values
    let arr = await getColHeaders();
    return arr.map(element => {
        return { data: element.toLowerCase() } // lowercase is essential!
    })
}

async function getAllDataFromTable(hot) {
    // data array of objects, that will be sent into map HTML file
    let dataObject = []
    let columns = await getColumns();
    for (let i = 0; i < hot.countRows() - 1; i++) {
        let row = hot.getDataAtRow(i)
        let obj = {}
        for (let j = 0; j < row.length; j++) {
            obj[columns[j].data] = row[j]
        }
        dataObject.push(obj)
    }
    console.log(dataObject)

}

// ** fn displays the table and interacts with it and create other exemples
// display table with handsontable API
// this function will start working only after parent getColumnNames()
async function createTable(CSVtable) {
    try {
        // table config
        // getAllDataFromTable(hot)
        hot = new Handsontable(csvDataDiv, {
            data: CSVtable,
            colHeaders: await getColHeaders(),
            columns: await getColumns(),
            licenseKey: 'non-commercial-and-evaluation'
        })
        // ----------------------------------
        // hide the main table
        hot.rootElement.style.display = 'none'

        await clickButtonAction(hot)
        // getAllDataFromTable(hot_main)
        //  hot_main.rootElement.style.display = 'initial'
        // ----------------------------------
    }
    catch (error) {
        console.log(`Something went wrong in createTable function: ${error}`);
    }
}

// ** Button events
// declaration
const btn_everything = document.querySelector('.btn_everything')
const btn_ID = document.querySelector('.btn_ID')
const btn_station_name = document.querySelector('.btn_station_name')
const btn_parameter = document.querySelector('.btn_parameter')

// add event listeners
btn_everything.addEventListener('click', clickButtonAction)
btn_ID.addEventListener('click', clickButtonAction)
btn_station_name.addEventListener('click', clickButtonAction)
btn_parameter.addEventListener('click', clickButtonAction)

// ** new table to display data
const new_table = document.querySelector('.display_table')
let placeholder_hot_table = new Handsontable(new_table, {
    data: [1, 1],
    colHeaders: await getColHeaders(),
    columns: await getColumns(),
    licenseKey: 'non-commercial-and-evaluation'
})
// click button action function
async function clickButtonAction() {
    // create @param hot - new empty table , which 
    // will be filled with if else statements below

    if (this === btn_everything) {
        showAllTable()
    }
    else if (this === btn_ID) {
        form.innerHTML = '<input type="text" placeholder="Введите ID">'
        form.innerHTML += '<button class="fn_btn">accept</button>'
        const btn = document.querySelector('.fn_btn')
        showById(hot, btn)
    }
    else if (this === btn_station_name) {
        let dataCol = showByStationName(hot)
        let children = form.children
        for(let child of children){
            child.addEventListener('click',()=>{
                fillTableByChosenValue(child.innerHTML, dataCol)
            })
        }
    }
    else if (this === btn_parameter) {
        showByParameter(hot)
    }
}

// * functions, related to filling the user's choosing form

let form = document.querySelector(".form-filled-with-variants")

// column names 
const id_col_name = 'id'
const station_col_name = 'station_name'
const parameter_col_name = 'parameter'

// ** ALL TABLE
// functions related to these column names to display all its content without duplicates
function showAllTable() {
    placeholder_hot_table.destroy()
    hot.rootElement.style.display = 'initial'
}

// ** ID
// * caution text if didn't find ID
let caution = document.querySelector('.caution')

// function will take a user's input and will compare it with available ones
 function showById(hot, btn) {
    btn.addEventListener('click', () => {
        event.preventDefault();
        let input = form.firstChild.value
        if (isNaN(input)){
            form.innerHTML += "ВЫ должны ввести число"
        }
        else {
            const IDs = hot.getDataAtCol(0)
            let iterator = 0
            while (iterator < IDs.length) {
                if (IDs[iterator] == input) {
                    // clear htmls
                    hot.rootElement.style.display = 'none'
                    new_table.innerHTML = ""
                    caution.innerHTML = ''

                    // get data from row
                    const dataAtRow = hot.getDataAtRow(iterator)
                    // insert data from object into array
                    let arrayDataAtRow = []
                    for(let objectElement in dataAtRow){
                        arrayDataAtRow.push(dataAtRow[objectElement])
                    }
                    // create new table
                    new Handsontable(new_table, {
                        data: [arrayDataAtRow],
                        colHeaders: getColHeaders(),
                        columns: getColumns(),
                        licenseKey: 'non-commercial-and-evaluation'
                    })

                    break
                }
                iterator++
            }

            // if didn't find anything
            if (iterator == IDs.length) {
                console.log("Совпадений не найдено")
                caution.innerHTML = 'Совпадений не найдено'
            }
        }
    })
}

// ** STATION NAME
// two similiar functions, which will automatically choose all 
// types of data from a certain column without duplicates
 function showByStationName(hot) {
    form.innerHTML = ''
     // find col name
    let dataCol = 0
    for (let i = 0; i < hot.countCols(); i++) {
        let column = hot.getColHeader(i);
        if (column == station_col_name) dataCol = i
    }
    //generate fields
    const station_names = hot.getDataAtCol(dataCol)
    const no_dups_station_names = [...new Set(station_names)]
    for (let i = 0; i < no_dups_station_names.length; i++) {
        form.innerHTML += `<li>${no_dups_station_names[i]}</li>`
    }
    // return value to use in fillTableFunction
    return dataCol
}
function fillTableByChosenValue(value_name, dataCol){
    new_table.innerHTML = ""
    let data = [] //! The main problem was here. I shouldn't insert empty array like this [[]]
    const station_names = hot.getDataAtCol(dataCol)
    for (let i = 0; i < hot.countRows(); i++) {
        if (station_names[i] == value_name){
            let dataObject = hot.getDataAtRow(i)
            let dataArray = []
            for(let data in dataObject) {
                dataArray.push(dataObject[data])
            }
            data.push(dataArray)
        }
    }
    // create new table
    new Handsontable(new_table, {
        data: data,
        colHeaders: getColHeaders(),
        columns: getColumns(),
        licenseKey: 'non-commercial-and-evaluation'
    })
}

// ** PARAMETER
 function showByParameter(hot) {
    form.innerHTML = ''
    let dataCol = 0
    for (let i = 0; i < hot.countCols(); i++) {
        let column = hot.getColHeader(i);
        if (column == parameter_col_name) dataCol = i
    }
    const parameters = hot.getDataAtCol(dataCol)
    const no_dups_parameters = [...new Set(parameters)]
    for (let i = 0; i < no_dups_parameters.length; i++) {
        form.innerHTML += `<li>${no_dups_parameters[i]}</li>`
    }

}