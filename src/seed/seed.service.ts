import { Injectable } from '@nestjs/common'
import { User } from 'src/auth/user.entity'
import { UserRepository } from 'src/auth/user.repository'
import { UserSeed } from './data/users'

@Injectable()
export class SeedService {
  constructor(private readonly userRepository: UserRepository) {}
  async executeAllSeeds() {
    await this.purgeDatabase()
    const users = await this.userSeed()
    console.log({ users })
  }

  private async purgeDatabase() {
    await this.userRepository.clear()
  }

  async userSeed(): Promise<User[]> {
    const users: User[] = []
    UserSeed.forEach(async (u) => {
      const user = this.userRepository.create(u)
      await this.userRepository.save(user)
      users.push(user)
    })
    return users
  }
}
