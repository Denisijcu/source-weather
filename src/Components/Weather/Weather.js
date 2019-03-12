import React, { useState, useEffect } from "react";

import Spinner from './Spinner';

// List of Weather Images 
  /* day */
  import Clouds from '../../images/day/clouds.png';
  import Clear from '../../images/day/clear.png';
  import Mist from '../../images/day/mist.png';
  import Rain from '../../images/day/rain.png';
  import ShowerRain from '../../images/day/shower-rain.png';
  import Snow from '../../images/day/snow.png';
  import Storm from '../../images/day/storm.png';
    /* night */
  import CloudsNight from '../../images/night/clouds.png';
  import ClearNight from '../../images/night/clear.png';
  import MistNight from '../../images/night/mist.png';
  import RainNight from '../../images/night/rain.png';
  import ShowerRainNight from '../../images/night/shower-rain.png';
  import SnowNight from '../../images/night/snow.png';
  import StormNight from '../../images/night/storm.png';

    
  // Dictionary of Images
  const gallery = [Clouds, Clear, Mist, Rain, ShowerRain, Snow, Storm, CloudsNight, ClearNight, MistNight, RainNight, ShowerRainNight, SnowNight, StormNight, ];

let day = false;

const Weather = (city) => {
 
     // Hooks
   // Declare Loading Var to use with the spinner
   const [loading, setLoading] = useState(true);
   // Declaring the states vars using Hooks
   const [stateData, setData] = useState({ data: [] });
   const [stateCity, setCity] = useState({ city: {} });
   const [test, setTest] = useState('Searching ');
   
   useEffect(() => {callApi("Miami");}, []);

  


    // Start Function CallApi //
   const callApi = (city)=>{
    //show the spinner
    setLoading(true);
    setTest('Searching '+city.charAt(0).toUpperCase()+city.substring(1,city.length).toLowerCase()+' City');

      fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=42cf2654dc52a783c605577b3dbf51d7`)
           .then(response =>  response.json())
           .then(json => {
                console.log(json);
            if(json.code !== 404){
              setCity({city: json.city});
              setData({ data: json.list });
              // Hide the spinner
              setLoading(false);
              setTest('');
             
            }
             else{
               // if no found city and result is code 404
               // Reload the page
               // DRYs Violation rule
              window.location.reload();
            }})
           .catch(function() {  
             // if no found city and result is code 404
             // Reload the page    
             // DRYs Violation rule
             // I found Necessary otherwice bad effect produced.
             window.location.reload();
           });
         return;
    }
    //End CallApi function //

    //Functions handleCityName//
   let _city = '';

    const handleCityName = (e)=>{
         _city = e.target.value;
         
    }

    const handleCityAction = (e)=>{
        if (_city===''){
            return;
        }
        callApi(_city.toUpperCase());
        _city = '';
   }

   

 
  
   
  return (
    <div className="container">

       
        <h1 className="banner">WEATHER</h1>
        <p className="subtitle">5 day / 3 hour forecast</p>
        <div className="_form">
          <input type="text" placeholder="&#xf002; Enter name city"  style={style} name="city"  onChange = {handleCityName} className="text-input" />
          <input type="submit" onClick = {handleCityAction} value ="&#xf002;" style = {sbtn} />    
          <p className="text-example">Example: Miami, London, Paris</p>    
        </div>
      
        {test}
   
        {loading ? <Spinner /> : '' }

        <h1 className="city">
        {stateCity.city.name} <span className="showbarra"> / </span>{stateCity.city.country}
        </h1>
      
        <div className="card">
   
        <ul>
           {stateData.data.map((m, index) => (
               
              <div className="card-content">
              <div className="logo">
                 <Picture pic = {m.weather[0].main}/>
                </div>
   
              <li key={index}>
               <h3>
               <DateComponent date = {m.dt_txt} />
                <span>
                <p>
                <TimeComponent date = {m.dt_txt} />
                </p>
                </span>
               </h3>
           
               <Picture pic =  {m.weather[0].main} /> 
              
              
               <div className="card-footer">
                 <Temperature kelvin = {m.main} />
                       <h5>Wind</h5>
                 <p className="wind-prop"> Speed:  {m.wind.speed} </p>
                 <p className="wind-prop"> Deg:  {m.wind.deg} </p>
               </div>
             </li>
              </div> 
           ))}
         </ul>
     </div>  

    </div>
  ); 
  
  
 

};

 /*Defining styling  */

  
 const style = {fontFamily: 'Arial, FontAwesome'}
 const sbtn = {fontFamily: 'Arial, FontAwesome'}
 const extra = {backgroundColor: 'black',color: 'white',textAlign:'center'}
 const yellow = {color: 'yellow', marginLeft: '15px'}


 /*Defining components */

 // Picture Component //
const Picture = ({pic})=>{
    //const [day, setDay ] = useState(false);
  
     let i, j = 0;
      // eslint-disable-next-line default-case
      switch(pic){
          case 'Clouds': {
              i = 0;
              j = 7;
              break;
          }
          case 'Clear': {
              i = 1;
              j = 8;
              break;
          }
          case 'Mist': {
              i = 2;
              j = 9;
              break;
          }
          case 'Rain': {
              i = 3;
              j = 10;
              break;
          }
          // eslint-disable-next-line no-duplicate-case
          case 'ShowerRain': {
              i = 4;
              j = 11;
              break;
          }
          case 'Snow': {
              i = 5;
              j = 12;
              break;
          }
          case 'Storm': {
              i = 6;
              j = 13;
              break;
          }
  
          default: {
             i = 0;
          }       
      }

      return(<span>
         
          {day ?  <img src={gallery[i]} alt="no found" /> : <img src={gallery[j]} alt="no found" /> }
      
       </span>)
  }

  // Temperature Component //
  const Temperature = ({kelvin}) =>{

    let F = Math.floor((1.8 * kelvin.temp) - 459.67);
    let C = Math.floor((kelvin.temp) - 273.15);

   return (
   <div>
       <h5> Temperature </h5>
       <h1> <span className="f">{F}</span><span className="sf">F</span>/ <span className="c">{C}</span><span className="sf">C</span></h1>
        <div> 
         <p> <Up /> <span className="wind-prop">{kelvin.temp_max}</span></p>
         <p> <Down /> <span className="wind-prop">{kelvin.temp_min}</span></p>
        
          <div style={extra} className="wind-prop" key= {kelvin.humidity.toString()}>
            <span> Humidity:  <span style={yellow}> {kelvin.humidity}</span> </span> <br></br>
            <span> Pressure:  <span style={yellow}> {kelvin.pressure}</span> </span>  <br></br>
            <span> Sea Level: <span style={yellow}> {kelvin.sea_level}</span> </span> 
         </div>
        </div>
   </div>
   );
}

// Other components //


const Up = () => <span><i className ='fa fa-arrow-up' /></span>
const Down = () => <span><i className ='fa fa-arrow-down' /></span>
const DateComponent = ({date}) =>{
    const stringDate = new Date(date);
    return(<span> {stringDate.toString().substr(0,15)} </span>)}

const TimeComponent = ({date}) =>{
  const stringTime = new Date(date);
  const meridian = parseInt(stringTime.toString().substr(15,10))<18 ? ' AM' : ' PM';
  day = parseInt(stringTime.toString().substr(15,10))>6 && parseInt(stringTime.toString().substr(15,10))<18 ? true : false;
  return(<span style={style}> {stringTime.toString().substr(15,10)+meridian} </span>)}

// End other components //

export default Weather;
