import request from "supertest";
import server from "../../server";

describe('POST /api/products', () => {
  // ! Validacion al tener error en crear un producto
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