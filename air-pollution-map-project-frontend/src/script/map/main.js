import * as olProj from 'ol/proj';
import '../../css/map/style.css';
import {Map, View} from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';

// *** fetch interactions
const div_list_of_dates = document.querySelector(".list-of-dates-div")
const year_chooser = document.querySelector(".choose-year")
const month_chooser = document.querySelector('.choose-month')

const urlDates = "http://localhost:8080/getDates"
function chooseDate(urlDates) {
  fetch(urlDates)
      .then(response => response.json())
      .then(dates => {
        // years
        let years = filterYears(dates)
        for (const year of years) {
          year_chooser.innerHTML += `<li>${year}</li>`
        }

        let year_chooser_children = year_chooser.children // choosing all years
          // for each year add event listener on click to display months
          for (const yearsChild of year_chooser_children) {
              yearsChild.addEventListener('click', ()=>{
                month_chooser.innerHTML = "" // clear months if user will choose other year
                let input = yearsChild.innerHTML
                let months = filterDates(dates, input)

                for (const month of months) {
                    month_chooser.innerHTML += `<li>${month}</li>`
                }

            })

        }
          // months


      })
      .catch(error => {
        console.log(`Something went wrong: ${error}`)
      })
}

chooseDate(urlDates)

function filterYears(list){
  return list.map(str => str.match(/\d+/g))
        .filter(Boolean)
        .flatMap(arr => arr.map(Number))
        .filter((value, index, self) => {
          return self.indexOf(value) == index
        })
}

function filterDates(list, input){
    let dates = list.map(str => {
    if(str.includes(input)){
      return str.replace(input.toString(), '').replace('.','')
    }
  }).filter(str => str !== undefined)
    return [...new Set(dates)] // return the Set to delete all duplicates
}



// *** geo data display
olProj.useGeographic()

// basic center map point (right on the Moscow)
const MoscowLat = 55.755829;
const MoscowLon = 37.617627;
// map initialization
const map = new Map({
  target: 'map',
  layers: [
    new TileLayer({
      source: new OSM()
    })
  ],
  view: new View({
    center: [MoscowLat,MoscowLon],
    zoom: 6
  })
});

