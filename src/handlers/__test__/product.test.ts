import request from "supertest";
import server from "../../server";

// ? 1.- Validacion al tener error en crear un producto
describe('POST /api/products', () => {
  it('Should display validation errors', async() => {
    const response = await request(server).post('/api/products').send({})
    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty('errors')
    expect(response.body.errors).toHaveLength(4)

    // ! Que NO debe hacer
    expect(response.status).not.toBe(401)
    expect(response.body.errors).not.toBe(2)
  })

  // ! Validacion al tener errores en el precio = 0 al crear un producto
  it('Should validate that the price is greater than 0', async() => {
    const response = await request(server).post('/api/products').send({
      name: 'Monitor Curvo',
      price: 0
    })
    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty('errors')
    expect(response.body.errors).toHaveLength(1)

    // ! Que NO debe hacer
    expect(response.status).not.toBe(404)
    expect(response.body.errors).not.toBe(2)
  })
  // ! Validacion al tener errores en el precio = "STRING" al crear un producto
  it('Should validate that the price is a number and greater than 0', async() => {
    const response = await request(server).post('/api/products').send({
      name: 'Monitor Curvo',
      price: "string"
    })
    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty('errors')
    expect(response.body.errors).toHaveLength(2)

    // ! Que NO debe hacer
    expect(response.status).not.toBe(404)
    expect(response.body.errors).not.toBe(4)
  })


  // ! Validacion al crear un producto
  it('Should create a new peoduct', async () => {
    const response = await request(server).post('/api/products').send({
      "name": "Mouse - Testing",
      "price": 100
    })
    // expect(response.status).toBe(201)
    expect(response.status).toEqual(201)
    expect(response.body).toHaveProperty('data')

    // ! Que NO debe hacer
    expect(response.status).not.toBe(400)
    expect(response.status).not.toBe(404)
    expect(response.status).not.toBe(200)
    expect(response.status).not.toHaveProperty('error')
    expect(response.status).not.toHaveProperty('errors')
  })
})

// ? 2.- Validacion al obtener todos los productos:
describe('GET /api/products', () => {
  it('Should check if api/product url exists', async () => {
    const response = await request(server).get('/api/products')
    expect(response.status).not.toBe(404)
  })

  it('GET a JSON response with products', async() => {
    const response = await request(server).get('/api/products')
    expect(response.status).toBe(200)
    expect(response.headers['content-type']).toMatch(/json/)
    expect(response.body).toHaveProperty('data')
    expect(response.body.data).toHaveLength(1) // * 1 Produto para este prueba!!

    // ! Que NO debe de hacer
    expect(response.body).not.toHaveProperty('error')
    expect(response.body).not.toHaveProperty('errors')
  })
})

// ? 3.- Validacion al obtener producto por ID:
describe('GET /api/products/:id', () => {
  it('Should return a 404 response for a non-existent product', async() => {
    const productID = 2000
    const response = await request(server).get(`/api/products/${productID}`)
    expect(response.status).toBe(404)
    expect(response.body).toHaveProperty('error')
    expect(response.body.error).toBe('Product not found')
  })

  it('Should check a valid ID in the URL with integer number', async() => {
    const response = await request(server).get('/api/products/not-valid-url')
    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty('errors')
    expect(response.body.errors).toHaveLength(1) // * Es un mensaje de error
    expect(response.body.errors[0].msg).toBe('ID not validate integer')
  })

  it('Get a JSON response for a single product', async() => {
    const response = await request(server).get('/api/products/1')
    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('data')
  })
})

// ? 4.- Validacion al actualizar mediente PUT
describe('PUT /api/products/:id', () => {
  it('Should check a valid ID in the URL with integer number', async() => {
    const response = await request(server).put('/api/products/not-valid-url').send({
      name: "Monitor Curvo",
      availability: true,
      price: 300
    })
    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty('errors')
    expect(response.body.errors).toHaveLength(1) // * Es un mensaje de error
    expect(response.body.errors[0].msg).toBe('ID invalid, need to be numeric')
  })

  it ('Should display validation error messages when updating a producto', async() => {
    const response = await request(server).put('/api/products/1').send({})

    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty('errors')
    expect(response.body.errors).toBeTruthy() // * Expresion (no true o false) Detecta que tiene algo el arreglo y lo trata como TRUE
    expect(response.body.errors).toHaveLength(5)

    // ! Que NO debe hacer
    expect(response.status).not.toBe(200)
    expect(response.body).not.toHaveProperty('data')
  })

  it ('Should validate that the price is greater than 0', async() => {
    const response = await request(server).put('/api/products/1').send({ 
      name: "Monitor Curvo",
      availability: true,
      price: 0
    })

    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty('errors')
    expect(response.body.errors).toHaveLength(1)
    expect(response.body.errors[0].msg).toBe('Price of product must be greater than 0')

    // ! Que NO debe de hacer:
    expect(response.status).not.toBe(200)
    expect(response.body).not.toHaveProperty('data')
  })

  it ('Should return a 404 response for a non-existent product', async() => {
    const productoID = 2000
    const response = await request(server).put(`/api/products/${productoID}`).send({ 
      name: "Monitor Curvo",
      availability: true,
      price: 300
    })

    expect(response.status).toBe(404)
    expect(response.body).toHaveProperty('error')
    expect(response.body.error).toBe('Product not found')

    // ! Que NO debe de hacer:
    expect(response.status).not.toBe(200)
    expect(response.body).not.toHaveProperty('data')
  })

  it ('Should update an existing product with valid data', async() => {
    const response = await request(server).put(`/api/products/1`).send({ 
      name: "Monitor Curvo",
      availability: true,
      price: 300
    })

    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('data')

    // ! Que NO debe de hacer:
    expect(response.status).not.toBe(400)
    expect(response.body).not.toHaveProperty('errors')
  })

})

// ? 5.- Validación al eliminar producto por ID:
describe('DELETE /api/products/:id', () => {
  it('Should check valid ID', async() => {
    const response = await request(server).delete('/api/products/not-valid-url')
    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty('errors')
    expect(response.body.errors[0].msg).toBe('ID invalid, need to be numeric')
    expect(response.body.errors).toHaveLength(1)
  })

  it('Should return a 404 error for a non-existent product', async() => {
    const productoID = 2000
    const response = await request(server).delete(`/api/products/${productoID}`)
    expect(response.status).toBe(404)
    expect(response.body).toHaveProperty('error')
    expect(response.body.error).toBe('Product not found')

    // ! Lo que NO se permite
    expect(response.status).not.toBe(200)
  })

  it('Should delete a product', async() => {
    const response = await request(server).delete('/api/products/1')
    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('data')
    expect(response.body.data).toBe('Product Deleted')

    // ! Lo que NO se permite:
    expect(response.status).not.toBe(404)
    expect(response.status).not.toBe(400)
  })
})

// ? 6.- Valiación para verbo PATCH
describe('PATCH /api/products/:id', () => {
  it('Should return a 404 response for a non-existing product', async() => {
    const productID = 2000;
    const response = await request(server).patch(`/api/products/${productID}`)

    expect(response.status).toBe(404)
    expect(response.body).toHaveProperty('error')
    expect(response.body.error).toBe('Product not found')

    // ! Lo que NO debe hacer:
    expect(response.status).not.toBe(200)
    expect(response.body).not.toHaveProperty('data')
  })
})