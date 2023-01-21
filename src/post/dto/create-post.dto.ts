import { IsArray, IsBoolean, IsOptional, IsString } from 'class-validator'

export class CreatePostDto {
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  images?: string[]

  @IsOptional()
  @IsString()
  description: string

  @IsOptional()
  @IsString()
  location: string

  @IsOptional()
  @IsBoolean()
  hideLikesAndViews?: boolean

  @IsOptional()
  @IsBoolean()
  canBeCommented?: boolean
}
