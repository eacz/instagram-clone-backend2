import { EntityRepository, Repository } from 'typeorm'
import { User } from './user.entity'
import { SignupDTO } from './dto/signupDTO'
import * as bcrypt from 'bcrypt'
import { ConflictException, InternalServerErrorException } from '@nestjs/common'
import { UpdateUserDto } from '../user/dto/update-user.dto'

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async createUser(signupDTO: SignupDTO) {
    const { password } = signupDTO

    const salt = await bcrypt.genSalt()
    const hashedPassword = await bcrypt.hash(password, salt)

    let user = this.create({ ...signupDTO, password: hashedPassword })
    try {
      user = await this.save(user)
      delete user.password
      return user
    } catch (error) {
      this.handleErrors(error)
    }
  }

  async getUserByUsername(username: string) {
    const user = this.findOne({
      where: { username },
      select: ['email', 'name', 'password', 'username'],
    })
    return user
  }

  async updateUser(id: number, updateUserDto: UpdateUserDto) {
    try {
      const user = await this.preload({ id, ...updateUserDto })
      await this.save(user)
      delete user.password
      return user
    } catch (error) {
      this.handleErrors(error)
    }
  }

  private handleErrors(error: any) {
    if (error.code === '23505') {
      let message = error.detail.includes('username') ? 'Username' : 'Email'
      message += ' already used'
      throw new ConflictException(message)
    } else {
      throw new InternalServerErrorException()
    }
  }
}
