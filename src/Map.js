import React from 'react';
import "./Map.css";
import { Map as LeafletMap,TileLayer } from "react-leaflet";
import {showDataOnMap} from './util';


function Map({countries,casestype,center,zoom}) {
  return (
    <div className="map">

    <LeafletMap center={center} zoom={zoom}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      attribution='&copy; <a href="https://osm.org/copyright">
      OpenStreetMap</a> contributors'/>


      {/*Loop through and Draw Circles on screen*/}

      {showDataOnMap(countries,casestype)}
        
      
    </LeafletMap>
      
    </div>
  )
}

export default Map
