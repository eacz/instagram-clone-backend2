import { Controller, Get, Post, Body, Param, UseInterceptors, UploadedFiles, Query } from '@nestjs/common'
import { FilesInterceptor } from '@nestjs/platform-express'

import { PostService } from './post.service'
import { CreatePostDto } from './dto/create-post.dto'
import { fileExtensionFilter } from '../common/filters/fileExtension.filter'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { getUser } from '../auth/decorators/get-user.decorator'
import { User } from 'src/auth/user.entity'
import { PaginationDto } from '../common/dto/pagination.dto'

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  @Auth()
  @UseInterceptors(FilesInterceptor('images', 5, { fileFilter: fileExtensionFilter, limits: { files: 5 } }))
  async create(
    @Body() createPostDto: CreatePostDto,
    @UploadedFiles() images: Array<Express.Multer.File>,
    @getUser() user: User
  ) {
    return this.postService.create(createPostDto, images, user)
  }

  @Get('current-user-posts')
  @Auth()
  getPostsForUser(@Query() paginationDto: PaginationDto, @getUser() user: User) {
    return this.postService.getPostsForUser(paginationDto, user)
  }

  @Get('by-user/:id')
  @Auth()
  getPostsByUser(@Query() paginationDto: PaginationDto, @Param('id') id: string) {
    return this.postService.getPostsByUser(paginationDto, id)
  }
}
