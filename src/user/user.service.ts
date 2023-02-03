import { Injectable } from '@nestjs/common'
import { UpdateUserDto } from './dto/update-user.dto'
import { UserRepository } from '../auth/user.repository'

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}
  async update(id: number, updateUserDto: UpdateUserDto) {
    await this.userRepository.updateUser(id, updateUserDto)
  }
}
