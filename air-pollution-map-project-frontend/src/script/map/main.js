import '../../css/map/style.css';
import {Feature, Map, View} from 'ol';
import {fromLonLat, useGeographic} from "ol/proj";
import {Point} from "ol/geom";
import {Heatmap as HeatmapLayer, Tile as TileLayer} from 'ol/layer.js';
import Stamen from 'ol/source/Stamen.js';
import VectorSource from 'ol/source/Vector.js';

// *** fetch interactions
const div_list_of_dates = document.querySelector(".list-of-dates-div")
const year_chooser = document.querySelector(".choose-year")
const month_chooser = document.querySelector('.choose-month')

let constructed_date = ""

const urlDates = "http://localhost:8080/getDates"
function retrieveDates(urlDates) {
  fetch(urlDates)
      .then(response => response.json())
      .then(async (dates) => {
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
                    let month_input = monthChooserChild.innerHTML
                    // got constructed_date
                    constructed_date = `${month_input}.${year_input}`
                    console.log(constructed_date)
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

            // -----------------------
        })
        .catch(error => {
            console.log(`Something went wrong: ${error}`)
        })
}

function JSON_parser(data){

}

retrieveDates(urlDates)

// years
async function addYears(dates){
    let years = filterYears(dates)
    for (const year of years) {
        year_chooser.innerHTML += `<li>${year}</li>`
    }
}

// months
async function addMonths(dates, input){
    let months = filterMonths(dates, input)
    for (const month of months) {
        month_chooser.innerHTML += `<li>${month}</li>`
    }
}

// define input
async function defineInput(chooser){
    let list = chooser.children
    for (const element of list) {
        element.addEventListener('click',()=>{
            return chooser.innerHTML // the year user has chosen
        })
    }
}

async function constructDate(month_input, year_input){
    console.log(`${month_input}.${year_input}`)
    return `${month_input}.${year_input}`
}


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

// *** geo data display
// olProj.useGeographic()
useGeographic()

const moscowLon = 37.6173,
      moscowLat = 55.7558

const blur = document.getElementById('blur');
const radius = document.getElementById('radius');

const vector = new HeatmapLayer({
    source: new VectorSource({
        features: [
            new Feature(new Point(fromLonLat([moscowLon, moscowLat])))
        ]
    }),
    blur: parseInt(blur.value, 10),
    radius: parseInt(radius.value, 10),
});

const raster = new TileLayer({
    source: new Stamen({
        layer: 'toner',
    }),
});

// map initialization
const map = new Map({
  target: 'map',
  layers: [
      raster, vector
  ],
  view: new View({
    center: [moscowLon,moscowLat],
    zoom: 8
  })
});

blur.addEventListener('input', function () {
    vector.setBlur(parseInt(blur.value, 10));
});

radius.addEventListener('input', function () {
    vector.setRadius(parseInt(radius.value, 10));
});
