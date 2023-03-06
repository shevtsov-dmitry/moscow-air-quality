import '../css/style.css';
import {Map, View} from '../node_modules_openlayers/ol';
import TileLayer from '../node_modules_openlayers/ol/layer/Tile';
import OSM from '../node_modules_openlayers/ol/source/OSM';

const map = new Map({
  target: 'map',
  layers: [
    new TileLayer({
      source: new OSM()
    })
  ],
  view: new View({
    center: [0, 0],
    zoom: 2
  })
});
