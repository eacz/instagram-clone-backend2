import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { InjectRepository } from '@nestjs/typeorm'
import { LoginDTO } from './dto/loginDTO.dto'
import { SignupDTO } from './dto/signupDTO'
import { User } from './user.entity'
import { UserRepository } from './user.repository'
import * as bcrypt from 'bcrypt'
import JwtPayload from 'src/interfaces/jwt-payload.interface'
import { ConfigService } from '@nestjs/config'
import { AuthResponseDto } from './dto/authResponse.dto'

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private jwtService: JwtService,
    private configService: ConfigService
  ) {}

  async login(loginDTO: LoginDTO): Promise<AuthResponseDto> {
    const { password, username } = loginDTO
    const user = await this.userRepository.getUserByUsername(username)

    if (user && (await bcrypt.compare(password, user.password))) {
      const payload: JwtPayload = { username }

      const token = this.jwtService.sign(payload, {
        expiresIn: this.configService.get('JWT_EXPIRES_IN') || '600',
      })
      delete user.password
      return { token, user: { ...user } }
    } else {
      throw new UnauthorizedException('Invalid credentials')
    }
  }

  async signup(signupDTO: SignupDTO): Promise<AuthResponseDto> {
    const user = await this.userRepository.createUser(signupDTO)
    const payload: JwtPayload = { username: user.username }
    const token = this.jwtService.sign(payload, {
      expiresIn: this.configService.get('JWT_EXPIRES_IN') || '600',
    })

    return {
      user,
      token,
    }
  }

  async renewToken(token: string): Promise<AuthResponseDto> {
    try {
      const payload: JwtPayload = await this.jwtService.verify(token)
      const user = await this.userRepository.getUserByUsername(payload.username)
      delete user.password
      const newToken = this.jwtService.sign({ username: payload.username })
      return { token: newToken, user }
    } catch (error) {
      throw new BadRequestException('Invalid token')
    }
  }
}
