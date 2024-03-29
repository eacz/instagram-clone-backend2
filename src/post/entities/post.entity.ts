import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm'
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

  @ManyToOne(() => User, (user) => user.posts, { eager: true, onDelete: 'CASCADE' })
  user: User

  @ManyToMany(() => User, { cascade: true, eager: true, onDelete: 'CASCADE' })
  @JoinTable()
  likes: User[]
  //commments: Comment[]

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)' })
  public createdAt: Date

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  public updatedAt: Date
}
