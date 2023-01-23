import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { User } from 'src/auth/user.entity'

@Entity({ name: 'post' })
export class Post {
  @PrimaryGeneratedColumn()
  id: number

  @Column('text', { array: true })
  images: string[]

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

  @ManyToMany(() => User, { cascade: true, eager: true })
  @JoinTable()
  likes: User[]
  //commments: Comment[]
}
