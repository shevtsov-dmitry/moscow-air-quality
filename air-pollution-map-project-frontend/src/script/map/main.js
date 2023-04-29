import '../../css/map/style.css';
import {Feature, Map, View} from 'ol';
import {fromLonLat, useGeographic} from "ol/proj";
import {Point} from "ol/geom";
import {Heatmap as HeatmapLayer, Tile as TileLayer} from 'ol/layer.js';
import Stamen from 'ol/source/Stamen.js';
import VectorSource from 'ol/source/Vector.js';

// *** geo data display
// olProj.useGeographic()
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
        center: [moscowLon,moscowLat],
        zoom: 8
    })
});

// elements to show div of dates
const btn_show_chooser_div = document.querySelector(".btn-img-to-show-date-choose")
const list_of_dates = document.querySelector('.list-of-dates-div')

// *** fetch interactions ----------------------------------------------------------------
const div_list_of_dates = document.querySelector(".list-of-dates-div")
const year_chooser = document.querySelector(".choose-year")
const month_chooser = document.querySelector('.choose-month')


const urlDates = "http://localhost:8080/getDates"
function retrieveDates(urlDates) {
  fetch(urlDates)
      .then(response => response.json())
      .then(async (dates) => {
          // show date chooser div on icon click
          btn_show_chooser_div.addEventListener('click', ()=>{
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
function main(dates){
    let years = filterYears(dates)
    for (const year of years) {
        year_chooser.innerHTML += `<li>${year}</li>`
    }
    let year_chooser_children = year_chooser.children // choosing all years
    // for each year add event listener on click to display months
    for (const yearsChild of year_chooser_children) {
        yearsChild.addEventListener('click', ()=>{
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
                monthChooserChild.addEventListener("click", ()=>{
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
function retrieveDataByChosenDate(date_to_send){
    fetch(urlData, {
      method: 'POST',
      headers:{
          'Content-Type' : 'application/json'
      },
      body: JSON.stringify(date_to_send)
    })
        .then(response => response.json())
        .then( data => {
            // -----------------------

            map.getLayers().forEach( layer => {
                map.removeLayer(layer);
            });
            map.addLayer(raster)

            // ! sort data
            let uniqueList = []
            let additionalLists = []
            for(let obj of data){
                if(uniqueList.find(e => e.station_name == obj.station_name) == undefined){
                    uniqueList.push(obj)
                }
                else{
                    additionalLists.push(obj)
                }
            }
            console.log(uniqueList)
            console.log(additionalLists)
            // -----------------------
            for (const obj of uniqueList) {
                const newLayer = createLayer(obj)
                map.addLayer(newLayer)
                // TODO need to add event listener on click to show station info 
                // newLayer.addEventListener('click',()=>{
                //     console.log("!!!!")
                // })
            }

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

function filterYears(list){
  return list.map(str => str.match(/\d+/g))
        .filter(Boolean)
        .flatMap(arr => arr.map(Number))
        .filter((value, index, self) => {
          return self.indexOf(value) == index
        })
}

function filterMonths(list, input){
    let dates = list.map(str => {
    if(str.includes(input)){
      return str.replace(input.toString(), '').replace('.','')
    }
  }).filter(str => str !== undefined)
    return [...new Set(dates)] // return the Set to delete all duplicates
}

function createLayer(data){
    const longitude = data.longitude
    const latitude = data.latitude

    return new HeatmapLayer({
        source: new VectorSource({
            features: [
                new Feature(new Point(fromLonLat([longitude, latitude])))
            ]
        }),

        blur: 30 - Math.floor(Math.random() * 10),
        radius:  27 - Math.floor(Math.random() * 25),
        
    });
}

