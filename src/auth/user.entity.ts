import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column({unique: true})
  username: string

  @Column()
  name: string

  @Column({unique: true})
  email: string

  @Column()
  password: string
}