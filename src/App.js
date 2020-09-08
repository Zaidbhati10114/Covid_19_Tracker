import React , {useState,useEffect} from 'react';
import './App.css';
import {MenuItem,FormControl,Select, Card,CardContent} from "@material-ui/core";
import InfoBox from "./InfoBox";
import Map from "./Map";
import Table from './Table'
import {sortData,prettyPrintStat} from './util'
import LineGraph from './LineGraph';
import "leaflet/dist/leaflet.css";

//BEM Name Convention
{/*CountryApi*/}
// https://disease.sh/v3/covid-19/countries
{/*CountryApi*/}

 


function App() {

const [countries,setCountries] = useState([]);
//State for which country is selected

const [country,setCountry] = useState('worldwide');
const [countryInfo,setcountryInfo]=useState({})
const[tableData,setTableData]=useState([]);
const[mapCenter,setmapCenter]=useState({lat:34.80746,lng:-40.4796});
const[mapZoom,setmapZoom]=useState(3);
const [mapCountries,setmapCountries]=useState([]);
const[casestype,setcasestype]=useState("cases");

 //USEEFFECT = RUNS A PIECE OF CODE BASED ON GIVEN CONDITION

 //SortedData is used to list the No 1 Country on Top list w.r.t noOfCases.
 //lng :center of map | PAcific Ocean 

//For worldwide Option Tracker.
 useEffect(() => {

  fetch("https://disease.sh/v3/covid-19/all")
  .then(response => response.json())
  .then(data => {
    setcountryInfo(data);
  })

 })

 useEffect(() => {

  //async -> request is send adnd wait for results and do something with it 

  {/*MAkes request async thorough and get the countries name*/}

  const getCountriesData = async () => {
    await fetch ("https://disease.sh/v3/covid-19/countries")
    .then((response) => response.json())
    .then((data) => {

      const countries = data.map((country) => (
        {
          name:country.country, //United States ,India ,United kIngdom
          value:country.countryInfo.iso2  // UK,USA,IND

        }));

        const sortedData = sortData(data);
        setTableData(sortedData);
        setmapCountries(data);
      setCountries(countries);


    });
  };

  getCountriesData();

},[]);

const onCountryChange = async (event) => {

const countryCode = event.target.value //gets countryCode(UK,USA..etc)

setCountry(countryCode);

//Make Api Call for dropDown Change

const url = countryCode === 'worldwide' ? 'https://disease.sh/v3/covid-19/all' : `https://disease.sh/v3/covid-19/countries/${countryCode}`


await fetch (url)
.then((response) => response.json())
.then((data) => {
  

  //All the data gets stored in this below var
  setCountry(countryCode);
  setcountryInfo(data);
  setmapCenter([data.countryInfo.lat,data.countryInfo.long]);
  setmapZoom(4);


});
};


{/*Header*/} 
  return (
    <div className="app">

    <div className="app__left">

    

    <div className="app__header">

  
    <h1> Covid-19  Tracker</h1>

    <FormControl className="app_dropDown">
    <Select
    variant="outlined"
    value={country}
    onChange={onCountryChange}
    
    > 
    <MenuItem  value={country}>Worldwide</MenuItem>
    {
      countries.map(country => (

        <MenuItem  value={country.value}>{country.name}</MenuItem>

      ))
    }
    </Select>

    </FormControl>

    </div> 
    {/*HeaderComplete*/}
  
  <div className="app__stats">

  <InfoBox 
  isRed
  active={casestype === "cases"}
  onClick={(e) => setcasestype('cases')}
  title="CoronaVirus Cases" cases={prettyPrintStat(countryInfo.todayCases)} total={prettyPrintStat(countryInfo.cases)} />

  <InfoBox 
  isRed
  active={casestype === "recovered"}
  onClick={(e) => setcasestype('recovered')}
  title="Recoverd" cases={prettyPrintStat(countryInfo.todayRecovered)} total={prettyPrintStat(countryInfo.recovered)} />

  <InfoBox 
  isRed
  active={casestype === "deaths"}
  onClick={(e) => setcasestype('deaths')}
  title="Deaths" cases={prettyPrintStat(countryInfo.todayDeaths)} total={prettyPrintStat(countryInfo.deaths)} />
  </div>

    {/*RealMap*/}
    <Map
    casestype={casestype}
    countries={mapCountries}
      center={mapCenter}
      zoom={mapZoom}
    />
    </div>



    <Card className="app__right">
    <CardContent>
    <h3>Live Cases By Country</h3>
    {/*Table*/}
    <Table countries={tableData}/>
    


    {/*Graph*/}
    <p className="app__graphTitle">Worldwide new {casestype}</p>
    <LineGraph
    className="app__graph"
      casestype={casestype}
    />


    </CardContent>
    </Card>
    </div>
  );
}

export default App;
