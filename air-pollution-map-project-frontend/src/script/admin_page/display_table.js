import {server_url} from "../Constants/CONSTANTS"
// *** table initialization
// * configuration optimized in async function - createTable()
const csvDataDiv = document.querySelector('.csvdata')
let hot = new Handsontable(csvDataDiv, {
    data: [],
    colHeaders: true,
    columns: true,
    licenseKey: 'non-commercial-and-evaluation'
})

const url = `${server_url}/dataTableToWebsite`
public_static_void_main_String_args(url)

// ** Main function
// get incoming JSON table with request from database
// requiring JSON file from server and then use fill table
// function to display full table, which admin just uploaded
function public_static_void_main_String_args(url) {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            createInitialTable(data)
        })
        .catch(error => {
            console.log(`Something went wrong: ${error}`)
        })
}

// * getters
// parent async fn
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

async function getColumnNames() {
    try {
        const url = `${server_url}/getColumnNames`;
        const response = await fetch(url)
        return await response.json()
    }
    catch (error) {
        console.log("Failed to obtain column names, because: " + error)
    }
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
async function createInitialTable(CSVtable) {
    try {
        // table config
        // getAllDataFromTable(hot)
        hot = new Handsontable(csvDataDiv, {
            data: CSVtable,
            colHeaders: await getColHeaders(),
            columns: await getColumns(),
            licenseKey: 'non-commercial-and-evaluation'
        })
        // hide the main table
        hot.rootElement.style.display = 'none'

        clickButtonAction(hot)
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

// * functions, related to filling the user's choosing form
let form = document.querySelector(".form-filled-with-variants")
form.addEventListener('click',()=>{
    setTimeout(()=>{
        form.style.display = 'none'
        close_sign.style.display = 'none'
        form.innerHTML = ""
    }, 400)
})

// click button action function
function clickButtonAction() {

    // create @param hot - new empty table , which 
    // will be filled with if else statements below

    if (this === btn_everything) {
        showAllTable()
        form.style.display = "none" // !X
    }
    else if (this === btn_ID) {
        placeholder_hot_table.rootElement.style.display = 'initial'
        form.style.display = "none" // !X
        form.innerHTML = ""
        const btn = document.querySelector('.fn-btn')
        showById(hot, btn)
    }
    else if (this === btn_station_name) {
        placeholder_hot_table.rootElement.style.display = 'initial'
        form.style.display = "initial" // !X
        let dataCol = showByStationName(hot)
        let children = form.children
        for(let child of children){
            child.addEventListener('click',async()=>{
                let data = fillTableByChosenValue(child.innerHTML, dataCol)
                const newTable = createNewTable(data)
                newTable.updateSettings({
                    colHeaders: await getColHeaders()
                })
            })
        }
    }
    else if (this === btn_parameter) {
        placeholder_hot_table.rootElement.style.display = 'initial'
        form.style.display = "initial" // !X
        let dataCol = showByParameter(hot)
        let children = form.children
        for (const child of children) {
            child.addEventListener('click', async ()=> {
                let data = fillTableByChosenParameter(child.innerHTML, dataCol)
                const newTable = createNewTable(data)
                newTable.updateSettings({
                    colHeaders: await getColHeaders()
                })
            })
        }
    }
}

// column names 
const station_col_name = 'station_name'
const parameter_col_name = 'parameter'

// ** ALL TABLE
// functions related to these column names to display all its content without duplicates
function showAllTable() {
    placeholder_hot_table.rootElement.style.display = 'none'
    hot.rootElement.style.display = 'initial'
}

// FIXME column headers don't show because function is not async
// create new table function
function createNewTable(data){
    // clear table
    hot.rootElement.style.display = 'none'
    new_table.innerHTML = ""
    // create new table
    return new Handsontable(new_table, {
        data: data,
        colHeaders: getColHeaders(),
        columns: getColumns(),
        licenseKey: 'non-commercial-and-evaluation'
    })
}
// ** ID
// * caution text if didn't find ID
let caution = document.querySelector('.caution')

// function will take a user's input and will compare it with available ones
function showById(hot, btn) {
    btn.addEventListener('click', () => {
        let form_input = document.querySelector('.id-form-text-input')
        let value = form_input.value // !X
        let isThereValue = false
        event.preventDefault();
        if (isNaN(value)){
            form_input.value = ""
            form_input.setAttribute("placeholder", "Вы должны ввести число")
            // id_form.innerHTML += "<p>ВЫ должны ввести число</p>"
        }
        else {
            const IDs = hot.getDataAtCol(0)
            let iterator = 0
            while (iterator < IDs.length) {
                if (IDs[iterator] == value) {
                    // clear htmls
                    caution.innerHTML = ''

                    // get data from row
                    const dataAtRow = hot.getDataAtRow(iterator)
                    // insert data from object into array
                    let arrayDataAtRow = []
                    for(let objectElement in dataAtRow){
                        arrayDataAtRow.push(dataAtRow[objectElement])
                    }
                    // contain @param arrayDataAtRow into the array to use @createNewTable()
                    let twoDimArray = [arrayDataAtRow]
                    createNewTable(twoDimArray)

                    // input form field cleanup
                    form_input.value = ""
                    form_input.setAttribute("placeholder", "Данные найдены")

                    // set true value to break the first loop
                    isThereValue = true
                    break
                }
                if(isThereValue) break
                iterator++
            }

            // if didn't find anything check if there is something in first cell
            if (hot.getDataAtCell(iterator,0) === null) {
                form_input.value = ""
                form_input.setAttribute("placeholder", "Совпадений не найдено")
            }
        }
    })
}

// ** STATION NAME
// two similar functions, which will automatically choose all
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
    return data
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
    return dataCol
}

function fillTableByChosenParameter(parameter_name, dataCol){
    const parameter_names = hot.getDataAtCol(dataCol)
    let data = []
    for (let i = 0; i < hot.countRows(); i++) {
        if(parameter_names[i] == parameter_name){
            let dataObject = hot.getDataAtRow(i)
            let dataArray = []
            for(let data in dataObject) {
                dataArray.push(dataObject[data])
            }
            data.push(dataArray)
        }
    }
    return data
}

// !X
const close_sign = document.querySelector('.close-sign')
close_sign.addEventListener('click', ()=>{
    setTimeout(()=>{
        form.style.display = "none"
    },200)
})

// !X
window.addEventListener('scroll',()=>{
    if(window.pageYOffset >= 20){
        hide(close_sign)
    }
    else if(form.getAttribute("style") == "display: flex"){
        show(close_sign)
    }
})