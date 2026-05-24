import { Router } from "express"
import { createProduct } from "./handlers/product"
import { body } from "express-validator"
import { handleInpuErrors } from "./middleware"

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

router.post('/',
   // ! Validacion
    body('name').notEmpty().withMessage('El nombre del Producto no puede ir vacio'),
    body('price')
      .isNumeric().withMessage('Valor No valido, debe ser numerico')
      .notEmpty().withMessage('El precio del Producto no puede ir vacio')
      .custom( (value) => value > 0 ).withMessage('El precio del Producto debe ser mayor a 0'),
    
  handleInpuErrors,
  createProduct
)

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