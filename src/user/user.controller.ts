import { Controller, Body, Patch, Param, Post, ParseIntPipe } from '@nestjs/common'
import { UserService } from './user.service'
import { UpdateUserDto } from './dto/update-user.dto'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { getUser } from 'src/auth/decorators/get-user.decorator'
import { User } from 'src/auth/user.entity'

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

  @Post('/unfollow-user')
  @Auth()
  unfollowUser() {}
}
