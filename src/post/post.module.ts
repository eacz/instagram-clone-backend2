import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { PostService } from './post.service'
import { PostController } from './post.controller'
import { PostRepository } from './post.repository'
import { CommonModule } from '../common/common.module'

@Module({
  controllers: [PostController],
  providers: [PostService],
  imports: [TypeOrmModule.forFeature([PostRepository]), CommonModule],
  exports: [TypeOrmModule, PostService],
})
export class PostModule {}
