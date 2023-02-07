import { Module } from '@nestjs/common'
import { SeedService } from './seed.service'
import { SeedController } from './seed.controller'
import { PostModule } from '../post/post.module'
import { UserModule } from '../user/user.module'

@Module({
  imports: [PostModule, UserModule],
  controllers: [SeedController],
  providers: [SeedService],
})
export class SeedModule {}
