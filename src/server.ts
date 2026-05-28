import express  from "express";
import router from "./router";
import db from "./config/db";
import colors from 'colors'

// ! Conexion a DB
async function connecDB() {
  try {
    await db.authenticate()
    db.sync() // * En caso de que vayamos creando nuevos modelos, nuevas columnas a nuestra DB, las agrega
    console.log(colors.blue('Conexión Exitosa a la DB'));
  } catch (error) {
    console.log(error);
    console.log(colors.red.bold('Hubo un error al conectar la DB'));
    
  }
}
connecDB()

// ! Instancia de Express
const server = express() // * Sobre la const server agregamos toda la conf del proyecto

// ! Leer datos de formularios
server.use(express.json())

// ! Ejecutar los verbos HTTP con handler y Middleware
server.use('/products', router) // * Ejecuta todos los request con el router

server.get('/api', (req, res) => {
  res.json({msg: 'Desde API en server.ts'})
})

export default server