import { Router } from "express"

const router = Router() // * Creamos una instancia de la clase de Router

// ! ROUTING
router.get('/', (req, res) => { //* req -> Lo que YO envio | res -> Lo que YO recibo
  // console.log(req)
  // console.log(res)
  // const auth = true
  // res.send('Hola Mundo en Express')
  // const datos = [
  //   { id: 1, nombre: 'Luis'},
  //   { id: 2, nombre: 'Aiko'},
  // ]
  // res.send(datos) // * Enviar datos a la pantalla, tambien podemos usar .json
  res.json('Desde GET')
})

router.post('/', (req, res) => {
  res.json('Desde POST')
})

router.put('/', (req, res) => {
  res.json('Desde PUT')
})

router.patch('/', (req, res) => {
  res.json('Desde PATCH')
})

router.delete('/', (req, res) => {
  res.json('Desde DELETE')
})

export default router