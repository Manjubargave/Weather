import './App.css';
import './Spinner.css'
import { useState,useEffect, Fragment } from 'react';
import Future from './components/Future'

function App() {

  const [data,setData]=useState()
  const[future,setFuture]=useState()
  const [lat,setLat]=useState([])
  const [long,setLong]=useState([])
  const [loading,setLoading]=useState(false)
  const getLocation = () => {
    if(navigator.geolocation){
          navigator.geolocation.getCurrentPosition((position) =>{
                let la = position.coords.latitude;
                let lon = position.coords.longitude;
                setLat(la)
                setLong(lon)
                console.log(lat,long)
                
                         
          }) 
    }
}
useEffect(()=>{
  getLocation();
  setLoading(true)
  
},[])
  useEffect(()=>{
   
    fetch(`https://api.weatherapi.com/v1/current.json?key=7c0e7d4cc33e4975871175003230408&q=${lat},${long}`).then((response)=>{
      if(response.ok){
        return response.json()
      }
    }).then((data)=>{
        setData(data)
        setLoading(false)
        console.log(data)
    })
  },[lat,long])
  useEffect(()=>{
    fetch(`https://api.weatherapi.com/v1/forecast.json?key=7c0e7d4cc33e4975871175003230408&q=${lat},${long}&days=2`).then((response)=>{
        if(response.ok){
          return response.json()
        }
      }).then((data)=>{
          
          setFuture(data)
          console.log(future)
      })
    },[lat,long])
  
  
  
  const weatherCondition=(value)=>{
    switch(value){
      
      case "Partly cloudy":{ console.log(value)
                              return <div className="bi bi-cloud-sun"></div>}
      case "sunny":return <div className="bi bi-sun">{value}</div>
      case "Mist":return <div className="bi bi-cloud-fog"></div>
      case "Light drizzle": return <div className='bi bi-cloud-drizzle'></div>
    }
  }
  const checkFuture=(data)=>{
    if(data){
      return true
    }
    return false
  }

  return (
    
    <Fragment>
     

      
      <div className='wrapper'>
        <div className='weather'>
        {(!data)?<div className="spinner-container">
      <div className="loading-spinner">
      </div>
    </div>:
        <div>
          <div className='city'>
            <h1>{data.location.name}</h1>
           </div>
            <div class="clearfix"></div>
            <div className='icon'>
                <div>{weatherCondition(data.current.condition.text)}</div>
                <div>{data.current.condition.text}</div>
            </div>
          <div className='temp'>
            <div className='current'>{data.current.temp_c}&deg;C</div>
            <div className='humidity'> {`Humidity:${data.current.humidity}%`}</div>
          </div>
          <div class="clearfix"></div>
          <div>{checkFuture(future)?`${future.forecast.forecastday[0].day.maxtemp_c}/${future.forecast.forecastday[0].day.mintemp_c}`:""}</div>

          </div>
          }
          </div>
      </div>

    </Fragment>
  )
}

export default App;
