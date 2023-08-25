import { 
  inquirerMenu, 
  leerInput, 
  pausa,
  listadoLugares
} from "./helpers/inquirer.js"
import { initDB } from "./helpers/persistence.js"
import { agregarHistorial, buscarCiudades, climaCiudad, getHistorial, mostrarClima } from "./models/busquedas.js"
import 'dotenv/config'

await initDB()

const main = async () => {

  let historialBusqueda = await getHistorial()

  let opt = 0

  do {

    opt = await inquirerMenu()

    if ( opt === 1 ) {

      // Mostrar mensaje
      const lugar = await leerInput('Busca la Ciudad: ')

      // Buscar lugares
      
      const ciudades = await buscarCiudades(lugar)

      // Seleccionar lugares
      const lugarSeleccionado = await listadoLugares(ciudades)

      if(lugarSeleccionado === 0) continue

      // Guardar Historial
      agregarHistorial(lugarSeleccionado)


      const clima = await climaCiudad(lugarSeleccionado)

      // Mostrar resultados

      mostrarClima(clima)

      
    }
    
    if ( opt === 2 ) {
      
      const historialLugares = getHistorial()

      const lugarSeleccionado = await listadoLugares(historialLugares, 'Historial de Lugares: ')

      if(lugarSeleccionado === 0) continue

      const clima = await climaCiudad(lugarSeleccionado)

      // Mostrar resultados

      mostrarClima(clima)

    }

    if ( opt !== 0 ) {
      await pausa()
    }

  } while( opt !== 0 )

}

main()
