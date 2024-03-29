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

  @Column({ nullable: true })
  biography: string

  @Column({ nullable: true })
  profilePicture: string

  @OneToMany(() => Post, (post) => post.user, { onDelete: 'CASCADE', cascade: true })
  posts: Post[]

  @ManyToMany(() => User, (user) => user.followers, { onDelete: 'CASCADE' })
  @JoinTable()
  followers: User[]

  @ManyToMany(() => User, (user) => user.following, { onDelete: 'CASCADE' })
  @JoinTable()
  following: User[]
}
