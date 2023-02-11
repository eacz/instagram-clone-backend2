import { Controller, Body, Patch, Param, Post, ParseIntPipe, Get } from '@nestjs/common'
import { UserService } from './user.service'
import { UpdateUserDto } from './dto/update-user.dto'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { getUser } from 'src/auth/decorators/get-user.decorator'
import { User } from 'src/auth/user.entity'
import { getAcountCount } from './interfaces'

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Patch(':id')
  @Auth()
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto)
  }

  @Post('/follow-user/:userId')
  @Auth()
  followUser(@getUser() user: User, @Param('userId', ParseIntPipe) userId: number) {
    return this.userService.followUser(userId, user)
  }

  @Post('/unfollow-user/:userId')
  @Auth()
  unollowUser(@getUser() user: User, @Param('userId', ParseIntPipe) userId: number) {
    return this.userService.unfollowUser(userId, user)
  }

  @Get('/get-account-count')
  @Auth()
  getAcountCount(@getUser() user: User): Promise<getAcountCount> {
    return this.userService.getAcountCount(user)
  }
}
