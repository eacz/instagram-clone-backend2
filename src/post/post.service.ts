import { Injectable } from '@nestjs/common'
import { User } from 'src/auth/user.entity'
import { CreatePostDto } from './dto/create-post.dto'
import { PostRepository } from './post.repository'
import { PaginationDto } from '../common/dto/pagination.dto'

@Injectable()
export class PostService {
  constructor(private readonly postRepository: PostRepository) {}
  async create(createPostDto: CreatePostDto, user: User) {
    console.log({ createPostDto })
    const post = await this.postRepository.createPost(createPostDto, user)
    return post
  }

  async getPostsForUser(paginationDto: PaginationDto, user: User) {
    return this.postRepository.getPostsForUser(paginationDto, user.id)
  }

  async getPostsByUser(paginationDto: PaginationDto, id: string) {
    return this.postRepository.getPostsForUser(paginationDto, +id)
  }
}
