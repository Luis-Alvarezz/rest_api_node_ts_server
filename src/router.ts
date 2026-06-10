import { Router } from "express"
import { createProduct, getProducts, getProductByID, updateProduct, updatedAvailability, deleteProductByID } from "./handlers/product"
import { body, param } from "express-validator"
import { handleInpuErrors } from "./middleware"

const router = Router() // * Creamos una instancia de la clase de Router

/**
 * * Documentando productos y Atributos de Productos
* @swagger
* components:
*     schemas:
*         Product: 
*           type: object
*           properties: 
*             id:
*               type: integer
*               description: The Product ID
*               example: 1
*             name:
*               type: string
*               description: The Product name
*               example: Monitor Curvo de 49 pulgadas
*             price:
*               type: number
*               description: The Product price
*               example: 300
* 
*             availability:
*               type: boolean
*               description: The Product availability
*               example: true
* 
*/

/**
 * * Documentando todos los productos
 * @swagger
 * /api/products:
 *    get:
 *      summary: Get a list of products
 *      tags: 
 *         - Products
 *      description: Return a list of products
 *      responses: 
 *        200:
 *          description: Successful response
 *          content: 
 *            application/json:
 *               schema:
 *                type: array
 *                items:
 *                  $ref: '#/components/schemas/Product'
 */
// ! ROUTING
router.get('/', getProducts)

/**
 * * Docuemntando endpoint para ontener producto por ID:
 * @swagger
 * /api/products/{id}:
 *    get:
 *      summary: Get a Product by ID
 *      tags: 
 *        - Products
 *      description: Return a producto based on its unique ID
 *      parameters:
 *      - in: path
 *        name: id
 *        description: The ID of the product to retrieve
 *        required: true
 *        schema:
 *          type: integer
 *      responses:
 *        200:
 *          description: Successful Response
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Product'
 *        404:
 *          description: Product not found
 *        400:
 *          description: Bad Request - Invalid ID
 */
router.get('/:id', 
  // ! Validacion para parametro unicamente string
  param('id').isInt().withMessage('ID not validate integer'),
  handleInpuErrors,
  getProductByID
)

router.post('/',
   // ! Validation
    body('name').notEmpty().withMessage('Product name cannot be empty'),
    body('price')
      .isNumeric().withMessage('Invalid value, must be numeric')
      .notEmpty().withMessage('Price of Product cannot be empty')
      .custom( (value) => value > 0 ).withMessage('Price of product must be greater than 0'),
    
  handleInpuErrors,
  createProduct
)

router.put('/:id',
  // ! Validation
  param('id').isInt().withMessage('ID invalid, need to be numeric'),
  body('name').notEmpty().withMessage('Product name cannot be empty'),
  body('price')
    .isNumeric().withMessage('Invalid value, must be numeric')
    .notEmpty().withMessage('Price of Product cannot be empty')
    .custom( (value) => value > 0 ).withMessage('Price of product must be greater than 0'),
  body('availability').isBoolean().withMessage('Invalid value, to availability, must be boolean') ,

  handleInpuErrors,
  updateProduct
)

router.patch('/:id',
  // ! Validacion
  param('id').isInt().withMessage('ID invalid, need to be numeric'),
  handleInpuErrors,
  updatedAvailability
)

router.delete('/:id',
  // ! Validacion
  param('id').isInt().withMessage('ID invalid, need to be numeric'),
  handleInpuErrors,
  deleteProductByID
)

export default router