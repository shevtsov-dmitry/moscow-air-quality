import * as olProj from 'ol/proj';
import '../css/style.css';
import {Map, View} from '../node_modules/ol';
import TileLayer from '../node_modules/ol/layer/Tile';
import OSM from '../node_modules/ol/source/OSM';

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

