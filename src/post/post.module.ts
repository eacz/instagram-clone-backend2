import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { PostService } from './post.service'
import { PostController } from './post.controller'
import { PostRepository } from './post.repository'
import { CommonModule } from '../common/common.module'
import { AuthModule } from '../auth/auth.module'

@Module({
  controllers: [PostController],
  providers: [PostService],
  imports: [TypeOrmModule.forFeature([PostRepository]), CommonModule, AuthModule],
  exports: [TypeOrmModule, PostService],
})
export class PostModule {}
