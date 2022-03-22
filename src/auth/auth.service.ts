import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm'
import { LoginDTO } from './dto/loginDTO.dto'
import { SignupDTO } from './dto/signupDTO'
import { User } from './user.entity';
import { UserRepository } from './user.repository';
import * as bcrypt from 'bcrypt'
import JwtPayload from 'src/interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private jwtService: JwtService
  ){}
  
  async login(loginDTO: LoginDTO): Promise<{token: string, user: User}> {
    const { password, username } = loginDTO
    const user = await this.userRepository.getUserByUsername(username)

    if(user && ( await bcrypt.compare(password, user.password) ) ){
      const payload: JwtPayload = { username }
      
      const token = this.jwtService.sign(payload)
      delete user.password
      return {token, user};
    } else {
      throw new UnauthorizedException('Invalid credentials')
    }
  }
  
  async signup(signupDTO: SignupDTO): Promise<User> {    
    return this.userRepository.createUser(signupDTO)
  }

  async renewToken(token: string): Promise<{ user: User, token: string }>{
    try {
      const payload: JwtPayload = await this.jwtService.verify(token)
      const user = await this.userRepository.getUserByUsername(payload.username)
      delete user.password
      const newToken = this.jwtService.sign({username: payload.username})
      return { user, token: newToken }
    } catch (error) {
      throw new BadRequestException('Invalid token')
    }
  }
}
