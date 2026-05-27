// * Funciones para ayudar a separar la funcionalidad
import { Request, Response } from "express";
import Product from "../models/Produc.model";

type GetProductByIDParamsProp = {
  id: string
}

export const getProducts = async (req: Request, res: Response) => { //* req -> Lo que YO envio | res -> Lo que YO recibo
  // console.log(req)
  // console.log(res)
  // const auth = true
  // res.send('Hola Mundo en Express')
  // const datos = [
  //   { id: 1, nombre: 'Luis'},
  //   { id: 2, nombre: 'Aiko'},
  // ]
  // res.send(datos) // * Enviar datos a la pantalla, tambien podemos usar .json
  // res.json('Desde GET')
  try {
    // const products = await Product.findAll({ order: [['id', 'DESC']] })
    // const products = await Product.findAll({ order: [['price', 'ASC']] })
    // const products = await Product.findAll({ order: [['price', 'DESC']], limit: 2 })
    const products = await Product.findAll({ order: [['price', 'DESC']], attributes: { exclude: ['createdAt', 'updatedAt'] } })
    // const products = await Product.findAll()
    res.json({ data: products }) // * Lo hacemos similar a Axios al trabajar con res de API: {data: resAPI} y traer objetos con .map en React
  } catch (error) {
    console.log('Error in Handler GET', error);
  }
}

export const getProductByID = async (req: Request<GetProductByIDParamsProp>, res: Response) => {
  try {
    // console.log('Desde getProductByID');
    // console.log(req.params.id);
    const { id } = req.params
    const productID = await Product.findByPk(id)

    if (!productID) {
      return res.status(404).json({
        error: 'Product not found'
      })
    }
    res.json({ data: productID })
  } catch (error) {
    console.log('Error in Handler get by ID', error);
  }
}

export const createProduct = async (req: Request, res: Response) => { // * siempre que interactuamos con el modelo, las funciones deben ser ASINCRONAS
  // res.json('Desde POST en handlers/product');
  // console.log(req.body); // * Mostrar la inf en terminal habilitando el server.use(express.json())
  // ! Crear y Almacenar Instancia de body Opcion 1:
  // const product = new Product(req.body) // * 1. Creamos el la instancia para formar el Objeto
  // const savedProduct = await product.save() // * 2. Almacenamos objeto en la DB
  // res.json({data: savedProduct}) // * Retornamos el producto desde la DB

  // ! Crear y Almacenar Instancia de body Opcion 2:
  try {
    const product = await Product.create(req.body) // * 1. Creamos el instancia y almacena en la DB
    res.json({ data: product }) // * Retornamos el producto desde la DB
  } catch (error) {
    console.log('Error in Handler POST', error);
  }
}

export const updateProduct = async (req: Request<GetProductByIDParamsProp>, res: Response) => {
  // res.json('Desde put')
  // console.log('Desde put en Handler')
  const { id } = req.params
  const productID = await Product.findByPk(id)

  if (!productID) {
    return res.status(404).json({
      error: 'Product not found'
    })
  }
  // ! Actualizar
  // console.log(req.body); // * Recuperar los datos
  await productID.update(req.body) // * Guardado Parcial Opcion 1
  // * Guardado estricto pero pierde parametros si no se especifican Opcion 2
  // productID.name = req.body.name
  // productID.price = req.body.price
  // productID.availability = req.body.availability
  await productID.save()


  res.json({ data: productID })
}

export const updatedAvailability = async (req: Request<GetProductByIDParamsProp>, res: Response) => {
  const { id } = req.params
  const productID = await Product.findByPk(id)

  if (!productID) {
    return res.status(404).json({
      error: 'Product not found'
    })
  }
  // ! Actualizar
  // console.log(req.body); // * Recuperar los datos
  // await productID.update(req.body) // * Guardado Parcial Opcion 1
  // * Guardado estricto con PATCH:
  // productID.availability = req.body.availability
  productID.availability = !productID.dataValues.availability // * Invertir el valor booleano al momento de actualizar

  await productID.save()
  // console.log(productID.dataValues) // * Leer valores actualizados de la Base de Datos
  // console.log(productID.dataValues.availability) // * Leer valores actualizados especificos de la Base de Datos

  res.json({ data: productID })
}


export const deleteProductByID = async (req, res) => {
  // res.json('Desde DELETE ahora en Handler')
  const { id } = req.params
  const product = await Product.findByPk(id)

  if (!product) {
    return res.status(404).json({
      error: 'Product not found'
    })
  }

  await product.destroy() // * Borra todo el atriubuto desde la DB
  res.json({ data: 'Product Deleted'})
}