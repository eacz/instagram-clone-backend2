import { Injectable, BadRequestException } from '@nestjs/common'
import { UpdateUserDto } from './dto/update-user.dto'
import { UserRepository } from '../auth/user.repository'
import { User } from 'src/auth/user.entity'

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async update(id: number, updateUserDto: UpdateUserDto) {
    await this.userRepository.updateUser(id, updateUserDto)
  }

  async followUser(userId: number, user: User) {
    if (userId === user.id) {
      throw new BadRequestException("You can't follow yourself xd")
    }
    await this.userRepository.followUser(userId, user)
  }
}
