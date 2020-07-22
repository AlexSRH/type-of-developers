import { Request, Response } from 'express'

import User from '@entities/User'

class UserController {
  async store (request: Request, response: Response) {
    const { name, email, password } = request.body

    if (await User.findOne({ where: { email } })) {
      return response.status(200).json({ message: 'User already created' })
    }

    const user = new User()
    user.name = name
    user.email = email
    await user.setPasswordHash(password)

    const savedUser = await user.save()

    delete savedUser.passwordHash

    return response.json(savedUser)
  }
}

export default UserController
