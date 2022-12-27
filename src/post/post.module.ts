import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { PostService } from './post.service'
import { PostController } from './post.controller'
import { PostRepository } from './post.repository'

@Module({
  controllers: [PostController],
  providers: [PostService],
  imports: [TypeOrmModule.forFeature([PostRepository])],
})
export class PostModule {}
