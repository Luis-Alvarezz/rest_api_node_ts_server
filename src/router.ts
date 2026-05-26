import { Router } from "express"
import { createProduct, getProducts, getProductByID } from "./handlers/product"
import { body, param } from "express-validator"
import { handleInpuErrors } from "./middleware"

const router = Router() // * Creamos una instancia de la clase de Router

// ! ROUTING
router.get('/', getProducts)
router.get('/:id', 
  // ! Validacion para parametro unicamente string
  param('id').isInt().withMessage('ID not validate integer'),
  handleInpuErrors,
  getProductByID
)

router.post('/',
   // ! Validacion
    body('name').notEmpty().withMessage('Product name cannot be empty'),
    body('price')
      .isNumeric().withMessage('Invalid value, must be numeric')
      .notEmpty().withMessage('Price of Product cannot be empty')
      .custom( (value) => value > 0 ).withMessage('Price of product must be greater than 0'),
    
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