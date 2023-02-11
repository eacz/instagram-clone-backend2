import { Injectable, BadRequestException } from '@nestjs/common'
import { UpdateUserDto } from './dto/update-user.dto'
import { UserRepository } from '../auth/user.repository'
import { User } from 'src/auth/user.entity'
import { getAcountCount } from './interfaces'

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async update(id: number, updateUserDto: UpdateUserDto) {
    return await this.userRepository.updateUser(id, updateUserDto)
  }

  async followUser(userId: number, user: User) {
    if (userId === user.id) {
      throw new BadRequestException("You can't follow yourself xd")
    }
    await this.userRepository.followUser(userId, user)
  }

  async unfollowUser(userId: number, user: User) {
    if (userId === user.id) {
      throw new BadRequestException("You can't unfollow yourself xd")
    }
    await this.userRepository.unfollowUser(userId, user)
  }

  async getAcountCount(user: User): Promise<getAcountCount> {
    return this.userRepository.getAcountCount(user)
  }
}
