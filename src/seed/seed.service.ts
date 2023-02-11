import { Injectable, NotAcceptableException } from '@nestjs/common'
import { User } from 'src/auth/user.entity'
import { UserRepository } from 'src/auth/user.repository'
import { Post } from 'src/post/entities/post.entity'
import { PostRepository } from '../post/post.repository'
import { UserSeed, SeedPosts } from './data'
import * as bcrypt from 'bcrypt'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class SeedService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly postRepository: PostRepository,
    private readonly configService: ConfigService
  ) {}

  async executeAllSeeds() {
    if (!(this.configService.get('ENVIROMENT') === 'DEV')) {
      throw new NotAcceptableException()
    }

    await this.deleteAllTables()
    const users: User[] = []
    const posts: Post[] = []

    for (const u of UserSeed) {
      const user = this.userRepository.create(u)
      const salt = await bcrypt.genSalt()
      const hashedPassword = await bcrypt.hash(user.password, salt)
      user.password = hashedPassword

      await this.userRepository.save(user)
      users.push(user)
    }

    for (const p of SeedPosts) {
      const post = this.postRepository.create(p)
      post.user = users[0]
      await this.postRepository.save(post)
      posts.push(post)
    }
    for (const p of SeedPosts) {
      const post = this.postRepository.create(p)
      post.user = users[1]
      await this.postRepository.save(post)
      posts.push(post)
    }
  }

  async deleteAllTables() {
    await this.postRepository.delete({})
    await this.userRepository.delete({})
  }
}
