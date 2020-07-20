import 'reflect-metadata'

import * as faker from 'faker'
import request from 'supertest'
import { createConnection } from 'typeorm'

import app from '../app'
import User from '@entities/User'

describe('User Controller', () => {
  beforeAll(async () => {
    await createConnection({
      type: 'sqlite',
      database: 'src/tests/dbTest.sqlite',
      entities: [User],
      synchronize: true
    })
  })

  afterAll(async () => {
    await User.createQueryBuilder().delete().execute()
  })

  it('should create a user', async () => {
    const user = {
      name: faker.name.findName(),
      email: faker.internet.email(),
      password: faker.internet.password()
    }

    const response = await request(app)
      .post('/users')
      .send(user)

    expect(response.status).toBe(200)
  })
})
