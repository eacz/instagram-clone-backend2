import { EntityRepository, Repository } from 'typeorm'
import { Post } from './entities/post.entity'
import { CreatePostDto } from './dto/create-post.dto'
import { User } from 'src/auth/user.entity'
import { PaginationDto } from '../common/dto/pagination.dto'

@EntityRepository(Post)
export class PostRepository extends Repository<Post> {
  async createPost(createPostDto: CreatePostDto, user: User) {
    const post = this.create(createPostDto)
    post.user = user
    try {
      await this.save(post)
      return post
    } catch (error) {
      console.log({ error })
    }
  }

  async getPostsForUser({ limit, offset }: PaginationDto, userId: number) {
    const posts = await this.find({ where: { user: userId}, skip: offset, take: limit })
    return posts
  }
}
