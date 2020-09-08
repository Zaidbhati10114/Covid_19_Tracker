import React from 'react'
import numeral from "numeral";
import { Circle,Popup } from "react-leaflet";


//Contains Utilities

//Colors for circle and MAp 

const casesTypeColors = {
    cases : {
        hex:"#CC1034",
        multiplier:800,
    },
    recovered: {
        hex:"#7dd71d",        
        multiplier:1200,
        
    },

    deaths: {
        hex:"#fb4443",        
        multiplier:2000,

    },
};










export const sortData = (data) => {
    const sortedData = [...data];

    //Ternary Operator Condition to return | SortedData is used to list the No 1 Country on Top list w.r.t noOfCases.

    sortedData.sort((a,b) => (a.cases > b.cases ? -1 : 1 ));

    return sortedData;




};

//MAke the number good looking (results|eg:34K)

export const prettyPrintStat = (stat) => 
stat ? `+${numeral(stat).format("0.0a")}`: "0+";



{/*Draw Circles on Map*/}

export const showDataOnMap = (data,casestype ="cases") => 
    data.map((country) => (

        <Circle
        center={[country.countryInfo.lat,country.countryInfo.long]}
        fillOpacity={0.4}
        color={casesTypeColors[casestype].hex}
        fillColor={casesTypeColors[casestype].hex}
        radius={Math.sqrt(country[casestype]) * casesTypeColors[casestype].multiplier}
        >
            <Popup>

            
            <div className="info-container">
                <div
                className="info-flag" 
                style={{ backgroundImage:`url(${country.countryInfo.flag})`}}
                />
                <div className="info-name">{country.country}</div>
                <div className="info-confirmed">Cases: {numeral(country.cases).format("0,0")}</div>
                <div className="info-recovered">Recovered: {numeral(country.recovered).format("0,0")}</div>
                <div className="info-deaths">Deaths: {numeral(country.deaths).format("0,0")}</div>

                
            </div>

                



            </Popup>
        </Circle>
        


    ));
