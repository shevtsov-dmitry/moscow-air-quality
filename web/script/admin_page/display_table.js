import {server_url} from "../Constants/CONSTANTS"

const csvDataDiv = document.querySelector('.csvdata')
let hot = new Handsontable(csvDataDiv, {
    data: [],
    colHeaders: true,
    columns: true,
    licenseKey: 'non-commercial-and-evaluation'
})

const url = `${server_url}/all`
public_static_void_main_String_args(url)


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

async function getColHeaders() {
    let list = '';
    const data = await getColumnNames();
    list = JSON.stringify(data)
    list = list.substring(1, list.length - 1)
    list = list.replaceAll('"', '')
    return list.split(',')
}

async function getColumnNames() {
    try {
        const url = `${server_url}/get/column-names`;
        const response = await fetch(url)
        return await response.json()
    } catch (error) {
        console.log("Failed to obtain column names, because: " + error)
    }
}

async function getColumns() {
    let arr = await getColHeaders();
    return arr.map(element => {
        return {data: element.toLowerCase()} // lowercase is essential!
    })
}

async function getAllDataFromTable(hot) {
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

async function createInitialTable(CSVtable) {
    try {
        hot = new Handsontable(csvDataDiv, {
            data: CSVtable,
            colHeaders: await getColHeaders(),
            columns: await getColumns(),
            licenseKey: 'non-commercial-and-evaluation'
        })
        hot.rootElement.style.display = 'none'

        clickButtonAction(hot)
    } catch (error) {
        console.log(`Something went wrong in createTable function: ${error}`);
    }
}

const btn_everything = document.querySelector('.btn_everything')
const btn_ID = document.querySelector('.btn_ID')
const btn_station_name = document.querySelector('.btn_station_name')
const btn_parameter = document.querySelector('.btn_parameter')

btn_everything.addEventListener('click', clickButtonAction)
btn_ID.addEventListener('click', clickButtonAction)
btn_station_name.addEventListener('click', clickButtonAction)
btn_parameter.addEventListener('click', clickButtonAction)

const new_table = document.querySelector('.display_table')
let placeholder_hot_table = new Handsontable(new_table, {
    data: [1, 1],
    colHeaders: await getColHeaders(),
    columns: await getColumns(),
    licenseKey: 'non-commercial-and-evaluation'
})

let form = document.querySelector(".form-filled-with-variants")
form.addEventListener('click', () => {
    setTimeout(() => {
        form.style.display = 'none'
        close_sign.style.display = 'none'
        form.innerHTML = ""
    }, 400)
})

function clickButtonAction() {

    if (this === btn_everything) {
        showAllTable()
        form.style.display = "none" // !X
    } else if (this === btn_ID) {
        placeholder_hot_table.rootElement.style.display = 'initial'
        form.style.display = "none" // !X
        form.innerHTML = ""
        const btn = document.querySelector('.fn-btn')
        showById(hot, btn)
    } else if (this === btn_station_name) {
        placeholder_hot_table.rootElement.style.display = 'initial'
        form.style.display = "initial" // !X
        let dataCol = showByStationName(hot)
        let children = form.children
        for (let child of children) {
            child.addEventListener('click', async () => {
                let data = fillTableByChosenValue(child.innerHTML, dataCol)
                const newTable = createNewTable(data)
                newTable.updateSettings({
                    colHeaders: await getColHeaders()
                })
            })
        }
    } else if (this === btn_parameter) {
        placeholder_hot_table.rootElement.style.display = 'initial'
        form.style.display = "initial" // !X
        let dataCol = showByParameter(hot)
        let children = form.children
        for (const child of children) {
            child.addEventListener('click', async () => {
                let data = fillTableByChosenParameter(child.innerHTML, dataCol)
                const newTable = createNewTable(data)
                newTable.updateSettings({
                    colHeaders: await getColHeaders()
                })
            })
        }
    }
}

const station_col_name = 'station_name'
const parameter_col_name = 'parameter'

function showAllTable() {
    placeholder_hot_table.rootElement.style.display = 'none'
    hot.rootElement.style.display = 'initial'
}

function createNewTable(data) {
    // clear table
    hot.rootElement.style.display = 'none'
    new_table.innerHTML = ""
    return new Handsontable(new_table, {
        data: data,
        colHeaders: getColHeaders(),
        columns: getColumns(),
        licenseKey: 'non-commercial-and-evaluation'
    })
}

let caution = document.querySelector('.caution')

function showById(hot, btn) {
    btn.addEventListener('click', () => {
        let form_input = document.querySelector('.id-form-text-input')
        let value = form_input.value // !X
        let isThereValue = false
        event.preventDefault();
        if (isNaN(value)) {
            form_input.value = ""
            form_input.setAttribute("placeholder", "Вы должны ввести число")
        } else {
            const IDs = hot.getDataAtCol(0)
            let iterator = 0
            while (iterator < IDs.length) {
                if (IDs[iterator] === value) {
                    caution.innerHTML = ''

                    const dataAtRow = hot.getDataAtRow(iterator)
                    // insert data from object into array
                    let arrayDataAtRow = []
                    for (let objectElement in dataAtRow) {
                        arrayDataAtRow.push(dataAtRow[objectElement])
                    }
                    let twoDimArray = [arrayDataAtRow]
                    createNewTable(twoDimArray)

                    form_input.value = ""
                    form_input.setAttribute("placeholder", "Данные найдены")

                    isThereValue = true
                    break
                }
                if (isThereValue) break
                iterator++
            }

            if (hot.getDataAtCell(iterator, 0) === null) {
                form_input.value = ""
                form_input.setAttribute("placeholder", "Совпадений не найдено")
            }
        }
    })
}

function showByStationName(hot) {
    form.innerHTML = ''
    let dataCol = 0
    for (let i = 0; i < hot.countCols(); i++) {
        let column = hot.getColHeader(i);
        if (column === station_col_name) dataCol = i
    }
    const station_names = hot.getDataAtCol(dataCol)
    const no_dups_station_names = [...new Set(station_names)]
    for (let i = 0; i < no_dups_station_names.length; i++) {
        form.innerHTML += `<li>${no_dups_station_names[i]}</li>`
    }
    return dataCol
}

function fillTableByChosenValue(value_name, dataCol) {
    let data = []
    const station_names = hot.getDataAtCol(dataCol)
    for (let i = 0; i < hot.countRows(); i++) {
        if (station_names[i] == value_name) {
            let dataObject = hot.getDataAtRow(i)
            let dataArray = []
            for (let data in dataObject) {
                dataArray.push(dataObject[data])
            }
            data.push(dataArray)
        }
    }
    return data
}


function showByParameter(hot) {
    form.innerHTML = ''
    let dataCol = 0
    for (let i = 0; i < hot.countCols(); i++) {
        let column = hot.getColHeader(i);
        if (column === parameter_col_name) dataCol = i
    }
    const parameters = hot.getDataAtCol(dataCol)
    const no_dups_parameters = [...new Set(parameters)]
    for (let i = 0; i < no_dups_parameters.length; i++) {
        form.innerHTML += `<li>${no_dups_parameters[i]}</li>`
    }
    return dataCol
}

function fillTableByChosenParameter(parameter_name, dataCol) {
    const parameter_names = hot.getDataAtCol(dataCol)
    let data = []
    for (let i = 0; i < hot.countRows(); i++) {
        if (parameter_names[i] === parameter_name) {
            let dataObject = hot.getDataAtRow(i)
            let dataArray = []
            for (let data in dataObject) {
                dataArray.push(dataObject[data])
            }
            data.push(dataArray)
        }
    }
    return data
}

const close_sign = document.querySelector('.close-sign')
close_sign.addEventListener('click', () => {
    setTimeout(() => {
        form.style.display = "none"
    }, 200)
})

window.addEventListener('scroll', () => {
    if (window.pageYOffset >= 20) {
        hide(close_sign)
    } else if (form.getAttribute("style") === "display: flex") {
        show(close_sign)
    }
})