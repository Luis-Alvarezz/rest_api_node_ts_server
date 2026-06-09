import swaggerJSDoc from "swagger-jsdoc";

const options: swaggerJSDoc.Options = {
  swaggerDefinition: {
    openapi: '3.0.2', // * Da los lineamientos para la Rest API
    tags: [
      {
        name: 'Products',
        description: 'API operations related to products'
      },
      // {
      //   name: 'Users',
      //   description: 'API operations related to users'
      // },
      // {
      //   name: 'Auth',
      //   description: 'API operations related to authentication'
      // }
    ],
    info: {
      // * Informacion general de nuestra API
      title: 'REST API Node.js / Exprss / TypeScript',
      version: '1.0.0',
      description: 'API Docs for Products'
    }
  },
  // * donde va a encontrar los endpoints que vamos a querer documentar.
  apis: ['./src/router.ts']
}

const swaggerSpec = swaggerJSDoc(options)
export default swaggerSpec