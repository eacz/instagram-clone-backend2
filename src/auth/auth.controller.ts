import { Body, Controller, Param, Post } from '@nestjs/common'
import { AuthService } from './auth.service'
import { LoginDTO } from './dto/loginDTO.dto'
import { SignupDTO } from './dto/signupDTO'
import { User } from './user.entity'

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  login(@Body() loginDTO: LoginDTO): Promise<{ token: string }> {
    return this.authService.login(loginDTO)
  }

  @Post('/signup')
  signup(@Body() signupDTO: SignupDTO): Promise<User> {
    return this.authService.signup(signupDTO)
  }
  @Post('/renew-token')
  renewToken(@Body('token') token: string): Promise<{ token: string }> {
    return this.authService.renewToken(token)
  }
}
