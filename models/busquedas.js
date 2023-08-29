import "colors"
import { getData } from "../helpers/dataFetch.js"
import { leerDB } from "../helpers/persistence.js"

let historial = []


export const getHistorial = () => {
  return historial
}

export const agregarHistorial = ( lugar = {}) => {
  if( historial.includes(lugar) ){
    return
  }

  historial.unshift( lugar )

  
}

export const leerHistorialDB = async () => {
  historial = leerDB()
}

export const buscarCiudades = async ( ciudad = '' ) => {

  //http://api.weatherapi.com/v1/search.json?key={APIKEY}&q=Concordia&lang=es
  const data = await getData('http://api.weatherapi.com/v1/search.json', {
    key: process.env.WEATHERAPI_KEY,
    q: ciudad,
    lang: 'es'
  })
  .then(res => res.json())
  .catch(err => console.log(`${'ERROR:'.red} ${err}`))

  return data //retornar los lugares que coincidan
}

export const climaCiudad = async ({ name, region, country, lon, lat }) => {

  //https://api.openweathermap.org/data/2.5/weather?appid={APIKEY}&lat=-31.4&lon=-58.03&lang=es&units=metric
  const data = await getData('https://api.openweathermap.org/data/2.5/weather', {
    appid: process.env.OPENWEATHER_KEY,
    lat,
    lon,
    lang: 'es',
    units: 'metric'
  })
  .then(res => res.json())
  .catch(err => console.log(`${'ERROR:'.red} ${err}`))

  /*
    {
      id: 3435261,
      name: 'Concordia',
      region: 'Entre Rios',
      country: 'Argentina',
      temp: 14.95,
      temp_max: 14.95,
      temp_min: 14.95,
      viento_velocidad: 3.13,
      humedad: 60,
      condicion: 'cielo claro'
    }
  */

  return {
    id : data.id,
    name, 
    region, 
    country,
    lat,
    lon,
    temp: data.main.temp,
    temp_max: data.main.temp_max,
    temp_min: data.main.temp_min,
    viento_velocidad: data.wind.speed,
    humedad: data.main.humidity,
    condicion: data.weather[0].description
  } // Devuelve la ciudad correspondiente a la longitud y latitud 
}


export const mostrarClima = ( clima ) => {
  console.clear()
  
  console.log('\n', [ clima.name, clima.region, clima.country ].join(', ').cyan)
  console.log('\n\tLat:', clima.lat)
  console.log('\tLng:', clima.lon)
  console.log('\tTemperatura:', `${ clima.temp }° C`)
  console.log('\tMinima:', `${ clima.temp_min }° C`)
  console.log('\tMaxima:', `${ clima.temp_max }° C`)
  console.log('\tViento:', `${ clima.viento_velocidad } Km/h`)
  console.log('\tHumedad:', `${ clima.humedad }%`)
  console.log('\tCondicion:', `${ clima.condicion } `)
}
