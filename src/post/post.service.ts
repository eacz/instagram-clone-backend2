import { Injectable } from '@nestjs/common'
import { User } from 'src/auth/user.entity'
import { CreatePostDto } from './dto/create-post.dto'
import { UpdatePostDto } from './dto/update-post.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { Post } from './entities/post.entity'
import { PostRepository } from './post.repository'

@Injectable()
export class PostService {
  constructor(private readonly postRepository: PostRepository) {}
  async create(createPostDto: CreatePostDto, user: User) {
    console.log({ createPostDto })
    const post = await this.postRepository.createPost(createPostDto, user)
    return post
  }

  findAll() {
    return `This action returns all post`
  }

  findOne(id: number) {
    return `This action returns a #${id} post`
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return `This action updates a #${id} post`
  }

  remove(id: number) {
    return `This action removes a #${id} post`
  }
}
