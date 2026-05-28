import request from 'supertest' // * Enviar request, peticion a determinado Endpoint
import server from '../server'

describe('GET /api', () => {
  // * Pruebas aquí
  it('Should send back a json response', async() => {
    const response = await request(server).get('/api')
    // console.log(response);
    expect(response.status).toBe(200) // * Exista el servidor con res 200
    expect(response.header['content-type']).toMatch(/json/) // * El contenido debe ser JSON
    // console.log(response.status);
    // console.log(response.header['content-type']); // * Salida:  application/json; charset=utf-8  
    // console.log(response.text); // * Opcion 1.-Muestra Contenido de en Endpoint | NO Se coneta al endpoint
    // console.log(response.body.msg); // * Opcion 2.-Muestra Contenido de en Endpoint, actua como req.body de Express | Se coneta al endpoint
    expect(response.body.msg).toBe('Desde API en server.ts') // * Debe ser EXACTO a la res de la API
  })
})