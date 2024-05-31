const fs = require('fs')
const path = require('path')
const LOG_FILE_PATH = path.join(__dirname, '../logs', '/requests.log')

const addRequest = async (req, res, next) => {
  //obtener el metodo y url de la petición entrante
  const method = req.method
  const url = req.url
  const dateStamp = new Date()
  const log = `${dateStamp} - ${method} - ${url}\n`
  //escribir en el archivo los datos
  try {
    await fs.promises.appendFile(LOG_FILE_PATH, log, (error)=>{
      if (error) throw new Error(error)
    })
  } catch (error) {
    console.error(error)
  }
  next()
}

module.exports = addRequest