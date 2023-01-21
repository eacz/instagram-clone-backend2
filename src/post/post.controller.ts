import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common'
import { FilesInterceptor } from '@nestjs/platform-express'

import { PostService } from './post.service'
import { CreatePostDto } from './dto/create-post.dto'
import { UpdatePostDto } from './dto/update-post.dto'
import { fileExtensionFilter } from '../common/filters/fileExtension.filter'
import { BadRequestException } from '@nestjs/common'
import { FilesService } from '../common/files.service'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { getUser } from '../auth/decorators/get-user.decorator'
import { User } from 'src/auth/user.entity'

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService, private readonly filesService: FilesService) {}

  @Post()
  @Auth()
  @UseInterceptors(FilesInterceptor('images', 5, { fileFilter: fileExtensionFilter, limits: { files: 5 } }))
  async create(
    @Body() createPostDto: CreatePostDto,
    @UploadedFiles() images: Array<Express.Multer.File>,
    @getUser() user: User
  ) {
    if (!images || images.length === 0) {
      throw new BadRequestException(`There should be at least one image for the post`)
    }

    const imagesUrls = await this.filesService.uploadImages(images)
    createPostDto.images = imagesUrls
    return this.postService.create(createPostDto, user)
  }

  @Get()
  findAll() {
    return this.postService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postService.findOne(+id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postService.update(+id, updatePostDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postService.remove(+id)
  }
}
