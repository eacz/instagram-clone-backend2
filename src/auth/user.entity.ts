import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { Post } from 'src/post/entities/post.entity'

@Entity({ name: 'user' })
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ unique: true })
  username: string

  @Column()
  name: string

  @Column({ unique: true })
  email: string

  @Column({ select: false })
  password: string

  @OneToMany(() => Post, (post) => post.user)
  posts: Post[]

  @ManyToMany(() => User, (user) => user.followers)
  @JoinTable()
  followers: User[]
  
  @ManyToMany(() => User, (user) => user.followers)
  @JoinTable()
  following: User[]
}
