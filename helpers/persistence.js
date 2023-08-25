import fs from 'fs'

const dataPath = './db/data.json'

export const initDB = async () => {
  const [ , dir] = dataPath.split('/')

  if( !fs.existsSync(dir) ){
    fs.mkdirSync(dir)
    console.log('Se creo la carpeta de db')
  }
}

export const guardarDB = ( data ) => {
  fs.writeFileSync( dataPath, JSON.stringify(data) )
}


export const leerDB = () => {

  if ( !fs.existsSync(dataPath) ) {
    return null
  }

  const info = fs.readFileSync(dataPath, { encoding: 'utf-8' })
  const data = JSON.parse(info)

  return data
}