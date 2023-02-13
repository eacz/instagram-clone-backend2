import { Injectable, BadRequestException } from '@nestjs/common'
import { UpdateUserDto } from './dto/update-user.dto'
import { UserRepository } from '../auth/user.repository'
import { User } from 'src/auth/user.entity'
import { getAccountCount } from './interfaces'
import { FilesService } from 'src/common/files.service'

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository, private readonly filesService: FilesService) {}

  async update(id: number, updateUserDto: UpdateUserDto, profilePicture?: Express.Multer.File) {
    if (profilePicture) {
      const imageResponse = await this.filesService.uploadImage(profilePicture)
      updateUserDto.profilePicture = imageResponse.secure_url
    }

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

  async getAccountCount(id: number): Promise<getAccountCount> {
    return this.userRepository.getAccountCount(id)
  }
}
