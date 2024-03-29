import { ForbiddenException, NotFoundException, UnauthorizedException } from '@nestjs/common'
import { EntityRepository, Repository, In } from 'typeorm'

import { Post } from './entities/post.entity'
import { CreatePostDto } from './dto/create-post.dto'
import { User } from 'src/auth/user.entity'
import { PaginationDto } from '../common/dto/pagination.dto'
import { UpdatePostDto } from './dto/update-post.dto'

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
    if (!post) {
      throw new NotFoundException(`There is no post with id ${postId}`)
    }
    post.likes.push(user)
    await this.save(post)
    return post
  }

  async dislikePost(postId: number, userId: number) {
    const post = await this.preload({ id: postId })
    if (!post) {
      throw new NotFoundException(`There is no post with id ${postId}`)
    }
    post.likes = post.likes.filter((user) => user.id !== userId)
    await this.save(post)
    return post
  }

  async updatePost(id: number, updatePostDto: UpdatePostDto, user: User) {
    const post = await this.preload({ id, ...updatePostDto })

    if (!post) {
      throw new NotFoundException(`There is no post with id ${id}`)
    }

    if (post.user.id !== user.id) {
      throw new ForbiddenException(`You're not allowed to edit this post`)
    }

    await this.save(post)
    return post
  }

  async deletePost(id: number, user: User) {
    const post = await this.findOne(id)
    if (!post) {
      throw new NotFoundException(`There is no post with id ${id}`)
    }
    if (post.user.id !== user.id) {
      throw new UnauthorizedException(`You're not allowed to delete this post`)
    }
    await this.remove(post)
    return post
  }

  async getFeedPosts({ limit, offset }: PaginationDto, user: User) {
    const posts = await this.find({
      where: [{ id: In([...user.posts]) }, { user: In([...user.followers, ...user.following]) }],
      skip: offset,
      take: limit,
      order: {
        createdAt: 'DESC',
      },
    })
    return posts
  }
}
