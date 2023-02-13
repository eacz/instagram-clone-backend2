import {
  Controller,
  Body,
  Patch,
  Param,
  Post,
  ParseIntPipe,
  Get,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common'
import { UserService } from './user.service'
import { UpdateUserDto } from './dto/update-user.dto'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { getUser } from 'src/auth/decorators/get-user.decorator'
import { User } from 'src/auth/user.entity'
import { getAccountCount } from './interfaces'
import { FileInterceptor } from '@nestjs/platform-express'
import { fileExtensionFilter } from 'src/common/filters/fileExtension.filter'

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Patch(':id')
  @Auth()
  @UseInterceptors(FileInterceptor('profilePicture', { fileFilter: fileExtensionFilter }))
  update(
    @Body() updateUserDto: UpdateUserDto,
    @Param('id') id: string,
    @UploadedFile() profilePicture?: Express.Multer.File
  ) {
    return this.userService.update(+id, updateUserDto, profilePicture)
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

  @Get('/get-account-count/:id')
  @Auth()
  getAccountCount(@Param('id', ParseIntPipe) id: number): Promise<getAccountCount> {
    return this.userService.getAccountCount(id)
  }
}
