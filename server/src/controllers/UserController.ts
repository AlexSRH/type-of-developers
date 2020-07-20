import { Request, Response } from 'express'

import User from '@entities/User'

class UserController {
  async store (request: Request, response: Response) {
    const { name, email, password } = request.body

    const user = new User()

    user.name = name
    user.email = email
    user.passwordHash = password

    const savedUser = await user.save()

    return response.json(savedUser)
  }
}

export default UserController
