import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { User } from 'src/auth/user.entity'

@Entity({ name: 'post' })
export class Post {
  @PrimaryGeneratedColumn()
  id: number

  @Column('text', { unique: true })
  url: string

  @Column('int', { default: 0 })
  savedCount: number

  @Column('text', { nullable: true })
  description: string

  @Column('text', { nullable: true })
  location: string

  @Column('boolean', { default: false })
  hideLikesAndViews?: boolean

  @Column('boolean', { default: true })
  canBeCommented?: boolean

  @ManyToOne(() => User, (user) => user.posts)
  user: User
  //likes: User[]
  //commments: Comment[]
}
