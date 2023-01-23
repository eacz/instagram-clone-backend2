import { EntityRepository, Repository } from 'typeorm'
import { Post } from './entities/post.entity'
import { CreatePostDto } from './dto/create-post.dto'
import { User } from 'src/auth/user.entity'
import { PaginationDto } from '../common/dto/pagination.dto'
import { NotFoundException } from '@nestjs/common'

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
    const posts = await this.find({ where: { user: userId }, skip: offset, take: limit })
    return posts
  }

  async getOneById(id: number) {
    const post = await this.findOne({ id })
    if (!post) {
      throw new NotFoundException(`There is no post with id ${id}`)
    }
    return post
  }

  async likePost(postId: number, user: User) {
    const post = await this.preload({ id: postId })
    post.likes.push(user)
    await this.save(post)
    return post
  }

  async dislikePost(postId: number, userId: number) {
    const post = await this.preload({ id: postId })
    post.likes = post.likes.filter((user) => user.id !== userId)
    await this.save(post)
    return post
  }
}
