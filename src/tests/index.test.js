import { describe, it } from 'mocha'
import { expect } from 'chai'
import supertest from 'supertest'
import faker from '@faker-js/faker'
import { PORT } from '../config/config.js'

const request = supertest(`http://localhost:${PORT}/api`)

const userBody = {
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
  username: faker.internet.userName(),
  phone: faker.phone.phoneNumber(),
  address: faker.address.streetAddress(),
  age: faker.datatype.number({ min: 18, max: 65 }),
  avatar: faker.image.avatar(),
  role: 'user'
}

const productBody = {
  name: faker.commerce.product(),
  description: faker.commerce.productDescription(),
  category: faker.commerce.department(),
  code: faker.datatype.string(5),
  price: faker.commerce.price(100, 1000),
  stock: faker.datatype.number({ min: 10, max: 100 }),
  picture: faker.image.abstract()
}

describe('USERS', () => {
  it('CREATE (POST) - OK', async () => {
    const userCreated = await request.post('/users').send(userBody)
    await request.delete(`/users/${userCreated.body.id}`)

    expect(userCreated.status).to.be.equals(200)
  })

  it('READ (GET ALL) - OK', async () => {
    const userCreated = await request.post('/users').send(userBody)
    const usersFound = await request.get('/users')
    await request.delete(`/users/${userCreated.body.id}`)

    expect(usersFound.status).to.be.equals(200)
  })

  it('READ (GET ONE) - OK', async () => {
    const userCreated = await request.post('/users').send(userBody)
    const userFound = await request.get(`/users/${userCreated.body.id}`)
    await request.delete(`/users/${userFound.body.id}`)

    expect(userFound.status).to.be.equals(200)
  })

  it('UPDATE (PUT) - OK', async () => {
    const userCreated = await request.post('/users').send(userBody)

    const userUpdated = await request.put(`/users/${userCreated.body.id}`).send(userBody)
    await request.delete(`/users/${userUpdated.body.id}`)

    expect(userUpdated.status).to.be.equals(200)
    expect(userUpdated.body.email).to.be.equals(userBody.email)
  })

  it('DELETE (DELETE) - OK', async () => {
    const userCreated = await request.post('/users').send(userBody)
    const userDeleted = await request.delete(`/users/${userCreated.body.id}`)
    expect(userDeleted.status).to.be.equals(204)
  })
})

describe('PRODUCTS', () => {
  it('CREATE (POST) - OK', async () => {
    const productCreated = await request.post('/products').send(productBody)
    await request.delete(`/products/${productCreated.body.id}`)

    expect(productCreated.status).to.be.equals(200)
  })

  it('READ (GET ALL) - OK', async () => {
    const productCreated = await request.post('/products').send(productBody)
    const productsFound = await request.get('/products')
    await request.delete(`/products/${productCreated.body.id}`)

    expect(productsFound.status).to.be.equals(200)
  })

  it('READ (GET ONE) - OK', async () => {
    const productCreated = await request.post('/products').send(productBody)
    const productFound = await request.get(`/products/${productCreated.body.id}`)
    await request.delete(`/products/${productCreated.body.id}`)

    expect(productFound.status).to.be.equals(200)
  })

  it('UPDATE (PUT) - OK', async () => {
    const productCreated = await request.post('/products').send(productBody)
    const productUpdated = await request.put(`/products/${productCreated.body.id}`).send(productBody)
    await request.delete(`/products/${productUpdated.body.id}`)

    expect(productUpdated.status).to.be.equals(200)
    expect(productUpdated.body.name).to.be.equals(productBody.name)
  })

  it('DELETE (DELETE) - OK', async () => {
    const productCreated = await request.post('/products').send(productBody)
    const productDeleted = await request.delete(`/products/${productCreated.body.id}`)

    expect(productDeleted.status).to.be.equals(204)
  })
})

describe('CARTS', () => {
  it('CREATE (POST) - OK', async () => {
    const userCreated = await request.post('/users').send(userBody)
    const cartBody = { user: userCreated.body.id }
    const cartCreated = await request.post('/carts').send(cartBody)

    await request.delete(`/users/${userCreated.body.id}`)
    await request.delete(`/carts/${cartCreated.body.id}`)

    expect(cartCreated.status).to.be.equals(200)
  })

  it('READ (GET ALL) - OK', async () => {
    const userCreated = await request.post('/users').send(userBody)
    const cartBody = { user: userCreated.body.id }
    const cartCreated = await request.post('/carts').send(cartBody)

    const cartsFound = await request.get('/carts')

    await request.delete(`/users/${userCreated.body.id}`)
    await request.delete(`/carts/${cartCreated.body.id}`)

    expect(cartsFound.status).to.be.equals(200)
  })

  it('READ (GET ONE) - OK', async () => {
    const userCreated = await request.post('/users').send(userBody)
    const cartBody = { user: userCreated.body.id }
    const cartCreated = await request.post('/carts').send(cartBody)

    const cartFound = await request.get(`/carts/${cartCreated.body.id}`)

    await request.delete(`/users/${userCreated.body.id}`)
    await request.delete(`/carts/${cartCreated.body.id}`)

    expect(cartFound.status).to.be.equals(200)
  })

  it('ADD PRODUCT TO CART (POST) - OK', async () => {
    const productCreated = await request.post('/products').send(productBody)

    const userCreated = await request.post('/users').send(userBody)
    const cartBody = { user: userCreated.body.id }
    const cartCreated = await request.post('/carts').send(cartBody)

    const productsCartAdded = await request.post(`/carts/${cartCreated.body.id}/products/${productCreated.body.id}`)

    await request.delete(`/products/${productCreated.body.id}`)
    await request.delete(`/users/${userCreated.body.id}`)
    await request.delete(`/carts/${cartCreated.body.id}`)

    expect(productsCartAdded.status).to.be.equals(200)
  })

  it('PRODUCTS FROM CART (GET) - OK', async () => {
    const productCreated = await request.post('/products').send(productBody)

    const userCreated = await request.post('/users').send(userBody)
    const cartBody = { user: userCreated.body.id }
    const cartCreated = await request.post('/carts').send(cartBody)

    const productsCartFound = await request.get(`/carts/${cartCreated.body.id}/products`)

    await request.delete(`/products/${productCreated.body.id}`)
    await request.delete(`/users/${userCreated.body.id}`)
    await request.delete(`/carts/${cartCreated.body.id}`)

    expect(productsCartFound.status).to.be.equals(200)
  })

  it('DELETE PRODUCT FROM CART (DELETE) - OK', async () => {
    const productCreated = await request.post('/products').send(productBody)

    const userCreated = await request.post('/users').send(userBody)
    const cartBody = { user: userCreated.body.id }
    const cartCreated = await request.post('/carts').send(cartBody)

    await request.post(`/carts/${cartCreated.body.id}/products/${productCreated.body.id}`)

    const productCartDeleted = await request.delete(`/carts/${cartCreated.body.id}/products/${productCreated.body.id}`)

    await request.delete(`/products/${productCreated.body.id}`)
    await request.delete(`/users/${userCreated.body.id}`)
    await request.delete(`/carts/${cartCreated.body.id}`)

    expect(productCartDeleted.status).to.be.equals(204)
  })

  it('DELETE CART (DELETE) - OK', async () => {
    const userCreated = await request.post('/users').send(userBody)
    const cartBody = { user: userCreated.body.id }
    const cartCreated = await request.post('/carts').send(cartBody)

    const cartDeleted = await request.delete(`/carts/${cartCreated.body.id}`)
    await request.delete(`/users/${userCreated.body.id}`)

    expect(cartDeleted.status).to.be.equals(204)
  })
})
