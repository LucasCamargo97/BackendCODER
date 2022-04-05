import { describe, it } from 'mocha'
import { expect } from 'chai'
import supertest from 'supertest'
import faker from '@faker-js/faker'
import { PORT } from '../config/config.js'

const request = supertest(`http://localhost:${PORT}/api`)

describe('USERS', () => {
  it('CREATE (POST) - OK', async () => {
    const user = {
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

    const result = await request.post('/users').send(user)
    expect(result.status).to.be.equals(200)
  })

  it('READ (GET ALL) - OK', async () => {
    const result = await request.get('/users')
    expect(result.status).to.be.equals(200)
  })

  it('READ (GET ONE) - OK', async () => {
    const response = await request.get('/users')
    const result = await request.get(`/users/${response.body.users[0].id}`)
    expect(result.status).to.be.equals(200)
  })

  it('UPDATE (PUT) - OK', async () => {
    const response = await request.get('/users')

    const user = {
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

    const result = await request.put(`/users/${response.body.users[0].id}`).send(user)
    expect(result.status).to.be.equals(200)
    expect(result.body.user.email).to.be.equals(user.email)
  })

  it('DELETE (DELETE) - OK', async () => {
    const response = await request.get('/users')
    const result = await request.delete(`/users/${response.body.users[0].id}`)
    expect(result.status).to.be.equals(204)
  })
})

describe('PRODUCTS', () => {
  it('CREATE (POST) - OK', async () => {
    const product = {
      name: faker.commerce.product(),
      description: faker.commerce.productDescription(),
      category: faker.commerce.department(),
      code: faker.datatype.string(5),
      price: faker.commerce.price(100, 1000),
      stock: faker.datatype.number({ min: 10, max: 100 }),
      picture: faker.image.abstract()
    }

    const result = await request.post('/products').send(product)
    expect(result.status).to.be.equals(200)
  })

  it('READ (GET ALL) - OK', async () => {
    const result = await request.get('/products')
    expect(result.status).to.be.equals(200)
  })

  it('READ (GET ONE) - OK', async () => {
    const response = await request.get('/products')
    const result = await request.get(`/products/${response.body.products[0].id}`)
    expect(result.status).to.be.equals(200)
  })

  it('UPDATE (PUT) - OK', async () => {
    const response = await request.get('/products')

    const product = {
      name: faker.commerce.product(),
      description: faker.commerce.productDescription(),
      category: faker.commerce.department(),
      code: faker.datatype.string(5),
      price: faker.commerce.price(100, 1000),
      stock: faker.datatype.number({ min: 10, max: 100 }),
      picture: faker.image.abstract()
    }

    const result = await request.put(`/products/${response.body.products[0].id}`).send(product)
    expect(result.status).to.be.equals(200)
    expect(result.body.product.code).to.be.equals(product.code)
  })

  it('DELETE (DELETE) - OK', async () => {
    const response = await request.get('/products')
    const result = await request.delete(`/products/${response.body.products[0].id}`)
    expect(result.status).to.be.equals(204)
  })
})

describe('CARTS', () => {
  it('CREATE (POST) - OK', async () => {
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

    const user = await request.post('/users').send(userBody)

    const body = { userId: user.body.user.id }

    const cart = await request.post('/carts').send(body)
    expect(cart.status).to.be.equals(200)
  })

  it('READ (GET ALL) - OK', async () => {
    const carts = await request.get('/carts')
    expect(carts.status).to.be.equals(200)
  })

  it('READ (GET ONE) - OK', async () => {
    const carts = await request.get('/carts')
    const cart = await request.get(`/carts/${carts.body.carts[0].id}`)
    expect(cart.status).to.be.equals(200)
  })

  it('ADD PRODUCT TO CART (POST) - OK', async () => {
    const carts = await request.get('/carts')

    const productBody = {
      name: faker.commerce.product(),
      description: faker.commerce.productDescription(),
      category: faker.commerce.department(),
      code: faker.datatype.string(5),
      price: faker.commerce.price(100, 1000),
      stock: faker.datatype.number({ min: 10, max: 100 }),
      picture: faker.image.abstract()
    }

    const product = await request.post('/products').send(productBody)

    const result = await request.post(`/carts/${carts.body.carts[0].id}/products/${product.body.product.id}`)
    expect(result.status).to.be.equals(200)
  })

  it('PRODUCTS FROM CART (GET) - OK', async () => {
    const carts = await request.get('/carts')
    const result = await request.get(`/carts/${carts.body.carts[0].id}/products`)
    expect(result.status).to.be.equals(200)
  })

  it('DELETE PRODUCT FROM CART (DELETE) - OK', async () => {
    const carts = await request.get('/carts')

    const productBody = {
      name: faker.commerce.product(),
      description: faker.commerce.productDescription(),
      category: faker.commerce.department(),
      code: faker.datatype.string(5),
      price: faker.commerce.price(100, 1000),
      stock: faker.datatype.number({ min: 10, max: 100 }),
      picture: faker.image.abstract()
    }

    const product = await request.post('/products').send(productBody)
    await request.post(`/carts/${carts.body.carts[0].id}/products/${product.body.product.id}`)

    const result = await request.delete(`/carts/${carts.body.carts[0].id}/products/${product.body.product.id}`)
    expect(result.status).to.be.equals(204)
  })

  it('DELETE CART (DELETE) - OK', async () => {
    const carts = await request.get('/carts')
    const result = await request.delete(`/carts/${carts.body.carts[0].id}`)
    expect(result.status).to.be.equals(204)
  })
})
