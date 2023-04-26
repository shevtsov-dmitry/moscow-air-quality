import * as olProj from 'ol/proj';
import '../../css/map/style.css';
import {Map, View} from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';

// get data object



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

