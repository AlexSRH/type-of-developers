import bcrypt from 'bcryptjs'
import { Entity, BaseEntity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity('users')
export default class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column({ unique: true })
  email: string

  @Column({ name: 'password_hash', select: false })
  passwordHash: string

  async setPasswordHash (password: string) {
    this.passwordHash = await bcrypt.hash(password, 10)
  }

  async checkPassword (password: string) {
    return await bcrypt.compare(password, this.passwordHash)
  }
}
