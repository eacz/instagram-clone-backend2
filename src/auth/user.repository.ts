import { ConflictException, BadRequestException, NotFoundException } from '@nestjs/common'
import { EntityRepository, Repository } from 'typeorm'
import * as bcrypt from 'bcrypt'

import { User } from './user.entity'
import { SignupDTO } from './dto/signupDTO'
import { UpdateUserDto } from '../user/dto/update-user.dto'
import { getAccountCount } from 'src/user/interfaces'
import { basicUser } from './interfaces/basicUser.interface'

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  constructor() {
    super()
  }
  async createUser(signupDTO: SignupDTO): Promise<basicUser> {
    const { password } = signupDTO

    const salt = await bcrypt.genSalt()
    const hashedPassword = await bcrypt.hash(password, salt)
    
    let user = this.create({
      ...signupDTO,
      password: hashedPassword,
      profilePicture: process.env.DEFAULT_PROFILE_PICTURE || null,
    })

    try {
      user = await this.save(user)
      delete user.password
      return user
    } catch (error) {
      this.handleErrors(error)
    }
  }

  async getUserByUsername(username: string) {
    const user = this.findOne({
      where: { username },
      select: ['email', 'name', 'password', 'username', 'id', 'biography', 'profilePicture'],
    })
    return user
  }

  async updateUser(id: number, updateUserDto: UpdateUserDto) {
    try {
      const user = await this.preload({ id, ...updateUserDto })
      await this.save(user)
      delete user.password
      return user
    } catch (error) {
      this.handleErrors(error)
    }
  }

  async followUser(userId: number, user: User) {
    try {
      const userFollowing = await this.findOne(user.id, {
        relations: ['following', 'followers'],
        loadRelationIds: true,
      })
      const userToFollow = await this.findOne(userId, {
        relations: ['following', 'followers'],
        loadRelationIds: true,
      })

      //TODO: fix this type error properly xd
      if (userFollowing.following.includes(userId as unknown as User)) {
        throw new BadRequestException(`Already following user with id ${userId}`)
      }

      const queryBuilder = this.createQueryBuilder()
      await queryBuilder.relation('following').of(userFollowing).add(userId)
      await queryBuilder.relation('followers').of(userToFollow).add(userFollowing.id)
    } catch (error) {
      this.handleErrors(error)
    }
  }

  async unfollowUser(userId: number, user: User) {
    const userFollowing = await this.findOne(user.id, {
      relations: ['following', 'followers'],
      loadRelationIds: true,
    })
    const userToFollow = await this.findOne(userId, {
      relations: ['following', 'followers'],
      loadRelationIds: true,
    })

    //TODO: fix this type error properly xd
    if (!userFollowing.following.includes(userId as unknown as User)) {
      throw new BadRequestException(`Not following user with id ${userId}`)
    }

    const queryBuilder = this.createQueryBuilder()
    await queryBuilder.relation('following').of(userFollowing).remove(userId)
    await queryBuilder.relation('followers').of(userToFollow).remove(userFollowing.id)
  }

  async getAccountCount(id: number): Promise<getAccountCount> {
    const user = await this.findOne(id, {
      //TODO: investigate why this doesn't work
      //select: ['following', 'followers', 'posts'],
      relations: ['following', 'followers', 'posts'],
      loadRelationIds: true,
    })
    if (!user) {
      throw new NotFoundException(`There is no user with id ${id}`)
    }

    return {
      followersCount: user.followers.length,
      followingCount: user.following.length,
      postsCount: user.posts.length,
    }
  }

  private handleErrors(error: any) {
    if (error.code === '23505') {
      let message = error.detail.includes('username') ? 'Username' : 'Email'
      message += ' already used'
      throw new ConflictException(message)
    } else {
      throw error
    }
  }
}
