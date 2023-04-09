import { basicUser } from "../interfaces/basicUser.interface"

export class AuthResponseDto {
  token: string
  user: basicUser
}