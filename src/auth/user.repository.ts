import { EntityRepository, Repository } from "typeorm";
import { User } from "./user.entity";
import { SignupDTO } from './dto/signupDTO';
import * as bcrypt from 'bcrypt'
import { ConflictException, InternalServerErrorException } from "@nestjs/common";

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async createUser(signupDTO: SignupDTO){
    const { password } = signupDTO

    const salt = await bcrypt.genSalt()
    const hashedPassword = await bcrypt.hash(password, salt)
    
    let user = this.create({...signupDTO, password: hashedPassword})
    try {
      user = await this.save(user)
      return user
    } catch (error) {
      if(error.code === '23505') {
        let message = error.detail.includes('username') ? 'Username' : 'Email'
        message+= ' already used' 
        throw new ConflictException(message)
      } else {
        throw new InternalServerErrorException()
      }
    }

  }

  async getUserByUsername(username: string): Promise<User>{
    const user = this.findOne({username})
    return user;
  }
}