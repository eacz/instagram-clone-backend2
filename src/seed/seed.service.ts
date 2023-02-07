import { Injectable } from '@nestjs/common'
import { User } from 'src/auth/user.entity'
import { UserRepository } from 'src/auth/user.repository'
import { Post } from 'src/post/entities/post.entity'
import { PostRepository } from '../post/post.repository'
import { UserSeed, SeedPosts } from './data'

@Injectable()
export class SeedService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly postRepository: PostRepository
  ) {}

  async executeAllSeeds() {
    await this.deleteAllTables()
    const users: User[] = []
    const posts: Post[] = []

    for (const u of UserSeed) {
      const user = this.userRepository.create(u)
      await this.userRepository.save(user)
      users.push(user)
    }

    for (const p of SeedPosts) {
      const post = this.postRepository.create(p)
      post.user = users[0]
      await this.postRepository.save(post)
      posts.push(post)
    }
  }

  async deleteAllTables() {
    await this.postRepository.delete({})
    await this.userRepository.delete({})
  }
}
