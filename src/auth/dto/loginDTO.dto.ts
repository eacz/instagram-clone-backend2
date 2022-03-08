import { IsNotEmpty, IsString, MaxLength, MinLength, Matches } from 'class-validator'

export class LoginDTO {
  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(20)
  username: string

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(32)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'Password should contain at least one uppercase letter, one lowercase letter and one number or special character',
  })
  password: string
}
