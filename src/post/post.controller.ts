import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Delete,
  Param,
  UseInterceptors,
  UploadedFiles,
  Query,
} from '@nestjs/common'
import { FilesInterceptor } from '@nestjs/platform-express'

import { PostService } from './post.service'
import { CreatePostDto } from './dto/create-post.dto'
import { fileExtensionFilter } from '../common/filters/fileExtension.filter'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { getUser } from '../auth/decorators/get-user.decorator'
import { User } from 'src/auth/user.entity'
import { PaginationDto } from '../common/dto/pagination.dto'
import { UpdatePostDto } from './dto/update-post.dto'
import { ParseIntPipe } from '@nestjs/common'

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  @Auth()
  @UseInterceptors(FilesInterceptor('images', 5, { fileFilter: fileExtensionFilter, limits: { files: 5 } }))
  create(
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

  @Post(':id/like')
  @Auth()
  likePost(@Param('id') id: string, @getUser() user: User) {
    return this.postService.likePost(+id, user)
  }

  @Post(':id/dislike')
  @Auth()
  dislikePost(@Param('id') id: string, @getUser() user: User) {
    return this.postService.dislikePost(+id, user)
  }

  @Put(':id')
  @Auth()
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto, @getUser() user: User) {
    return this.postService.update(id, updatePostDto, user)
  }

  @Delete(':id')
  @Auth()
  delete(@Param('id', ParseIntPipe) id: number, @getUser() user: User) {
    return this.postService.delete(id, user)
  }
}
