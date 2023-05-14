import '../../css/map/style.css';
import {Feature, Map, View} from 'ol';
import {fromLonLat, useGeographic} from "ol/proj";
import {Point} from "ol/geom";
import {Heatmap as HeatmapLayer, Tile as TileLayer} from 'ol/layer.js';
import Stamen from 'ol/source/Stamen.js';
import VectorSource from 'ol/source/Vector.js';
import {Select} from "ol/interaction";
import {Fill, Stroke, Style} from "ol/style";
import CircleStyle from "ol/style/Circle";

const serverURL = "http://localhost:8080"

// *** geo data display
useGeographic()

const moscowLon = 37.6173,
    moscowLat = 55.7558

const raster = new TileLayer({
    source: new Stamen({
        layer: 'toner',
    }),
});

// map initialization
const map = new Map({
    target: 'map',
    layers: [raster],
    view: new View({
        center: [moscowLon, moscowLat],
        zoom: 10
    })
});

function createLayer(data) {
    const longitude = data.longitude
    const latitude = data.latitude
    return new HeatmapLayer({
        source: new VectorSource({
            features: [
                new Feature(new Point(fromLonLat([longitude, latitude])))
            ]
        }),

        // blur: 30 - Math.floor(Math.random() * 10),
        // radius:  27 - Math.floor(Math.random() * 25),
    });
}

function getMonthlyAverageData() {
    return fetch(`${serverURL}/getMonthlyAverage`)
}

// TODO HIDE CIRCLES WHEN ZOOM OUT AND PLACE ONLY ONE ON TOP OF THEM
// style: function(feature) {
//     const resolution = this.getMap().getView().getResolution();
//     const size = getSizeForResolution(resolution) + 27 - Math.floor(Math.random() * 25);
//     return new Style({
//         image: new CircleStyle({
//             radius: size,
//             fill: new Fill({
//                 color: 'rgba(255, 0, 0, 0.5)'
//             }),
//             stroke: new Stroke({
//                 color: 'red',
//                 width: 2
//             })
//         })
//     });
// }
function getSizeForResolution(resolution) {
    // define a function that maps resolution to size
    // for example, you can use a linear scale
    const maxResolution = 5000; // adjust as needed
    const minSize = 10; // adjust as needed
    const maxSize = 100; // adjust as needed
    const scale = (maxSize - minSize) / maxResolution;
    return maxSize - resolution * scale;
}

// select block DOM elements
const select_container = document.querySelector(".select-container")
const select_ul = document.querySelector(".select-ul")
const select_close_sign = document.querySelector('.select-close-sign')
const color_block = document.querySelector('.color-block')
const image_block = document.querySelector('.image-block')

select_close_sign.addEventListener('click', () => {
    select_container.style.display = 'none'
    select_close_sign.style.display = 'none'
})

// *** fetch interactions ----------------------------------------------------------------
// * check if there is any data in table
const text_not_uploaded = document.querySelector('.text-is-not-uploaded')
const urlIsTableEmpty = "http://localhost:8080/isTableEmpty"
fetch(urlIsTableEmpty)
    .then(response => response.json())
    .then(answer => {
        if (answer === true) {
            text_not_uploaded.style.display = 'flex'
        }
    })
    .catch(e => {
        console.log(e)
    })
// elements to show div of dates
const btn_show_chooser_div = document.querySelector(".btn-img-to-show-date-choose")
const list_of_dates = document.querySelector('.list-of-dates-div')
const year_chooser = document.querySelector(".choose-year")
const month_chooser = document.querySelector('.choose-month')

const urlDates = "http://localhost:8080/getDates"

function retrieveDates(urlDates) {
    fetch(urlDates)
        .then(response => response.json())
        .then(async (dates) => {
            // show date chooser div on icon click
            btn_show_chooser_div.addEventListener('click', () => {
                list_of_dates.style.display = 'flex'
            })
            // addYears(dates)
            // let year_input = await defineInput(year_chooser)
            // console.log(await year_input)
            // await addMonths(dates, year_input)
            // let month_input = await defineInput(month_chooser)
            // constructed_date = await constructDate(month_input, year_input)
            main(dates)
        })
        .catch(error => {
            console.log(`Something went wrong: ${error}`)
        })
}

let constructed_date = ""

//xxxxxxxxxxxxx
function main(dates) {
    let years = filterYears(dates)
    for (const year of years) {
        year_chooser.innerHTML += `<li>${year}</li>`
    }
    let year_chooser_children = year_chooser.children // choosing all years
    // for each year add event listener on click to display months
    for (const yearsChild of year_chooser_children) {
        yearsChild.addEventListener('click', () => {
            // everytime click on year clear @param month_chooser to not stack values
            month_chooser.innerHTML = ""
            let year_input = yearsChild.innerHTML
            let months = filterMonths(dates, year_input)

            // months
            // for each day add event listener to construct actual date that will be retrieved from db
            for (const month of months) {
                month_chooser.innerHTML += `<li>${month}</li>`
            }

            let month_chooser_children = month_chooser.children
            for (const monthChooserChild of month_chooser_children) {
                monthChooserChild.addEventListener("click", () => {
                    // hide dates on month choose
                    list_of_dates.style.display = 'none'

                    let month_input = monthChooserChild.innerHTML
                    // got constructed_date
                    constructed_date = `${month_input}.${year_input}`
                    // console.log(constructed_date)
                    // send request to retrieve needed data by year and month

                    // ? await
                    retrieveDataByChosenDate(constructed_date)

                })
            }

        })
    }
}

//
const urlData = "http://localhost:8080/getDataByDate"

function retrieveDataByChosenDate(date_to_send) {
    fetch(urlData, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(date_to_send)
    })
        .then(response => response.json())
        .then(data => {
            // -----------------------

            map.getLayers().forEach(layer => {
                map.removeLayer(layer);
            });
            map.addLayer(raster)

            // ! sort data
            let uniqueList = []
            let additionalLists = []
            for (let obj of data) {
                if (uniqueList.find(e => e.station_name == obj.station_name) == undefined) {
                    uniqueList.push(obj)
                } else {
                    additionalLists.push(obj)
                }
            }
            // console.log(uniqueList)
            // console.log(additionalLists)

            // define monthly average value, which will adjust spread area of air pollution
            // ! initialization of first value is needed to avoid division by 0
            // when loop will count average_value
            let monthly_averages_by_all_stations = []
            let station_avoid_duplicates = [additionalLists[0].station_name]
            let all_measures_by_one_station = []

            for (const element of additionalLists) {
                if (station_avoid_duplicates.includes(element.station_name)) {
                    all_measures_by_one_station.push(element.monthly_average)
                    all_measures_by_one_station.push(element.monthly_average_pdkss)
                } else {
                    let average_value = all_measures_by_one_station
                        .reduce((acc, cur) => acc + cur, 0) / all_measures_by_one_station.length
                    if (average_value > 1) average_value = 0.34
                    all_measures_by_one_station.length = 0 // clear array of gathered values
                    // create new object from retrieved values for further processing
                    monthly_averages_by_all_stations.push({
                        station_name: element.station_name,
                        monthly_average: average_value,
                        longitude: element.longitude,
                        latitude: element.latitude
                    })
                    station_avoid_duplicates.push(element.station_name)
                }
            }
            // console.log(uniqueList)
            console.log(monthly_averages_by_all_stations)
            // -----------------------
            let select_vectors_list = []

            // *** MULTIPLIERS ***
            for (const obj of monthly_averages_by_all_stations) {
                const newLayer = createLayer(obj)
                const blur_size = 30 - Math.floor(Math.random() * 13)
                const radius_size = 5 + obj.monthly_average * 35
                newLayer.set('blur', blur_size)
                newLayer.set('radius', radius_size)
                map.addLayer(newLayer)
                select_vectors_list.push(newLayer)
                map.getView().on('change:resolution', function() {
                    const currentZoom = map.getView().getZoom(); // get the current zoom level
                    if(currentZoom < 7){
                        const final = 1.6
                        const newBlur = Math.pow( final, currentZoom)
                        const newRadius = Math.pow( final, currentZoom); // calculate the new radius value based on the current zoom level
                        // set the new radius value on the HeatmapLayer
                        newLayer.setRadius(newRadius);
                        newLayer.setBlur(newBlur)
                    }
                    else {
                        newLayer.set('blur', blur_size)
                        newLayer.set('radius', radius_size)
                    }
                });
            }

            let select = new Select({
                layers: select_vectors_list
            })
            select.on('select', () => {
                // clear content
                image_block.style.backgroundImage = "url()"
                select_ul.innerHTML = ""
                // display content
                select_close_sign.style.display = 'block'
                select_container.style.display = "block"
                // ON CLICK FUNCTION
                let index = Math.floor(Math.random() * uniqueList.length)
                for (let value in uniqueList[index]) {
                    let word_to_translate = value
                    let element_value = uniqueList[index][value]
                    // rusification of values from database
                    word_to_translate = rusificate(value)

                    if (value == "monthly_average") {
                        element_value = (parseFloat(element_value) +
                            // FIXME make mutual monthly average
                            parseFloat(uniqueList[index].monthly_average_pdkss))
                        color_block.style.backgroundColor = visualizeAwarenessByNumber(element_value)
                        image_block.style.backgroundImage = `url(${showFaceByAwarenessNumber(element_value)})`
                        element_value = element_value.toFixed(2)
                    }
                    if (value == "monthly_average_pdkss") break

                    select_ul.innerHTML += `<li>${word_to_translate}: ${element_value}</li>`

                }
            })

            map.addInteraction(select)

        })
        .catch(error => {
            console.log(`Something went wrong: ${error}`)
        })
}

retrieveDates(urlDates)

// // years
// async function addYears(dates){
//     let years = filterYears(dates)
//     for (const year of years) {
//         year_chooser.innerHTML += `<li>${year}</li>`
//     }
// }
//
// // months
// async function addMonths(dates, input){
//     let months = filterMonths(dates, input)
//     for (const month of months) {
//         month_chooser.innerHTML += `<li>${month}</li>`
//     }
// }
//
// // define input
// async function defineInput(chooser){
//     let list = chooser.children
//     for (const element of list) {
//         element.addEventListener('click',()=>{
//             return chooser.innerHTML // the year user has chosen
//         })
//     }
// }
//
// async function constructDate(month_input, year_input){
//     console.log(`${month_input}.${year_input}`)
//     return `${month_input}.${year_input}`
// }

function filterYears(list) {
    return list.map(str => str.match(/\d+/g))
        .filter(Boolean)
        .flatMap(arr => arr.map(Number))
        .filter((value, index, self) => {
            return self.indexOf(value) == index
        })
}

function filterMonths(list, input) {
    let dates = list.map(str => {
        if (str.includes(input)) {
            return str.replace(input.toString(), '').replace('.', '')
        }
    }).filter(str => str !== undefined)
    return [...new Set(dates)] // return the Set to delete all duplicates
}


// rusificate word
function rusificate(word) {
    switch (word) {
        case 'id':
            word = 'ID';
            break;
        case 'date':
            word = 'Дата';
            break;
        case 'station_name':
            word = 'Название станции';
            break;
        case 'global_id':
            word = 'Общее ID';
            break;
        case 'latitude':
            word = 'Широта';
            break;
        case 'Surveillance_zone_characteristics':
            word = 'Характеристика зоны наблюдения';
            break;
        case 'longitude':
            word = 'Долгота';
            break;
        case 'adm_area':
            word = 'Административная зона';
            break;
        case 'district':
            word = 'Район';
            break;
        case 'location':
            word = 'Местоположение';
            break;
        case 'parameter':
            word = 'Параметр';
            break;
        case 'monthly_average':
            word = 'Среднемесячная норма качества воздуха';
            break;
        case 'monthly_average_pdkss':
            word = '';
            break;
    }
    return word
}

function visualizeAwarenessByNumber(value) {
    //value from 0 to 1
    let hue = ((1 - value) * 120).toString(10);
    return ["hsl(", hue, ",100%,50%)"].join("");
}


// display chosen image by value of awareness
function showFaceByAwarenessNumber(num) {

    // paths of faces' images
    const face_happy = "../../static/happy.png"
    const face_normal = "../../static/normal.png"
    const face_neutral = "../../static/neutral.png"
    const face_bad = "../../static/bad.png"
    const face_angry = "../../static/angry.png"
    const face_demon = "../../static/demon.png"

    if (num >= 0 && num <= 0.166) return face_happy
    else if (num > 0.166 && num <= 0.332) return face_normal
    else if (num > 0.322 && num <= 0.488) return face_neutral
    else if (num > 0.488 && num <= 0.654) return face_bad
    else if (num > 0.654 && num <= 0.82) return face_angry
    else if (num > 0.82) return face_demon
}

const body = document.querySelector('body');

// add a click event listener to the body
body.addEventListener('click', (event) => {
    // check if the clicked element is inside the form
    if (!select_container.contains(event.target)) {
        // if the clicked element is not inside the form, hide the form
        select_container.style.display = 'none';
    }
});