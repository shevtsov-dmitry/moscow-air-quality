import '../css/style.css';
import {Map, View} from '../../node-modules/node_modules/ol';
import TileLayer from '../../node-modules/node_modules/ol/layer/Tile';
import OSM from '../../node-modules/node_modules/ol/source/OSM';

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
