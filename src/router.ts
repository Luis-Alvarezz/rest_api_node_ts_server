import { Router } from "express"
import { createProduct, getProducts } from "./handlers/product"
import { body } from "express-validator"
import { handleInpuErrors } from "./middleware"

const router = Router() // * Creamos una instancia de la clase de Router

// ! ROUTING
router.get('/', getProducts)

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