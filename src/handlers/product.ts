// * Funciones para ayudar a separar la funcionalidad
import { Request, Response } from "express";
import Product from "../models/Produc.model";
import { check, validationResult } from "express-validator";

export const createProduct = async (req: Request, res: Response) => { // * siempre que interactuamos con el modelo, las funciones deben ser ASINCRONAS
  // res.json('Desde POST en handlers/product');
  // console.log(req.body); // * Mostrar la inf en terminal habilitando el server.use(express.json())
  // ! Crear y Almacenar Instancia de body Opcion 1:
  // const product = new Product(req.body) // * 1. Creamos el la instancia para formar el Objeto
  // const savedProduct = await product.save() // * 2. Almacenamos objeto en la DB
  // res.json({data: savedProduct}) // * Retornamos el producto desde la DB

  // ! Validacion
  await check('name').notEmpty().withMessage('El nombre del Producto no puede ir vacio').run(req)
  await check('price')
    .isNumeric().withMessage('Valor No valido, debe ser numerico')
    .notEmpty().withMessage('El precio del Producto no puede ir vacio')
    .custom( (value) => value > 0 ).withMessage('El precio del Producto debe ser mayor a 0')
    .run(req)

  // * Leer los mensajes de error
  let errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array()})
  }

  // ! Crear y Almacenar Instancia de body Opcion 2:
  const product = await Product.create(req.body) // * 1. Creamos el instancia y almacena en la DB
  res.json({data: product}) // * Retornamos el producto desde la DB
}