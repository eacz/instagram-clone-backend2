import { BadRequestException, Injectable } from '@nestjs/common'
import { User } from 'src/auth/user.entity'
import { CreatePostDto } from './dto/create-post.dto'
import { PostRepository } from './post.repository'
import { PaginationDto } from '../common/dto/pagination.dto'
import { FilesService } from 'src/common/files.service'
import { UpdatePostDto } from './dto/update-post.dto'

@Injectable()
export class PostService {
  constructor(private readonly postRepository: PostRepository, private readonly filesService: FilesService) {}

  async create(createPostDto: CreatePostDto, images: Array<Express.Multer.File>, user: User) {
    if (!images || images.length === 0) {
      throw new BadRequestException(`There should be at least one image for the post`)
    }

    const imagesUrls = await this.filesService.uploadImages(images)
    createPostDto.images = imagesUrls

    const post = await this.postRepository.createPost(createPostDto, user)
    return post
  }

  async getPostsForUser(paginationDto: PaginationDto, user: User) {
    return this.postRepository.getPostsForUser(paginationDto, user.id)
  }

  async getPostsByUser(paginationDto: PaginationDto, id: string) {
    return this.postRepository.getPostsForUser(paginationDto, +id)
  }

  async likePost(postId: number, user: User) {
    await this.postRepository.likePost(postId, user)
  }

  async dislikePost(postId: number, user: User) {
    await this.postRepository.dislikePost(postId, user.id)
  }

  async update(id: string, updatePostDto: UpdatePostDto, user: User) {
    return this.postRepository.updatePost(+id, updatePostDto, user)
  }

  async delete(id: number, user: User) {
    const post = await this.postRepository.deletePost(id, user)
    await this.filesService.deleteImages(post.images)
  }
}
