import { Injectable } from '@nestjs/common'
import { User } from 'src/auth/user.entity'
import { UserRepository } from 'src/auth/user.repository'
import { UserSeed } from './data/users'
import { PostRepository } from '../post/post.repository'

@Injectable()
export class SeedService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly postRepository: PostRepository
  ) {}

  async executeAllSeeds() {
    await this.deleteAllTables()
    const users: User[] = []

    for (const u of UserSeed) {
      const user = this.userRepository.create(u)
      await this.userRepository.save(user)
      users.push(user)
    }
  }

  async deleteAllTables() {
    await this.postRepository.delete({})
    await this.userRepository.delete({})
  }
}
