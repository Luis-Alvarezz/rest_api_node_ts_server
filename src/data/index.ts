import { exit } from 'node:process' // * Detiene la ejecución de codigo Node.js
import db from '../config/db'

const clearDB = async() => {
  try {
    await db.sync({ force: true})
    console.log('Values successfully deleted');
    exit(0) // * tambien exit()
  } catch (error) {
    console.log('Error to clear database => ', error);
    exit(1) // * Finaliza con errores, 0 es finalizacion con exito
  }
}

if (process.argv[2] === '--clear') { // * process.argv[2] ejecuta desde el CLR o Command Line de Node.js
  clearDB()
}

// *                                   [0] [1]    [2]
// * Podemos colocar en el script: npm run dev --clear
// console.log(process.argv); // ? Se manda a llamar siempre desde la terminal
