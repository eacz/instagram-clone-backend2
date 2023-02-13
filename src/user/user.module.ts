import { Module } from '@nestjs/common'
import { UserService } from './user.service'
import { UserController } from './user.controller'
import { AuthModule } from '../auth/auth.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserRepository } from 'src/auth/user.repository'
import { CommonModule } from 'src/common/common.module'

@Module({
  controllers: [UserController],
  providers: [UserService],
  imports: [AuthModule, CommonModule, TypeOrmModule.forFeature([UserRepository])],
  exports: [TypeOrmModule, UserService],
})
export class UserModule {}
