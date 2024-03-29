export interface IUserSeed {
  username: string
  name: string
  email: string
  password: string
  biography?: string
}

export const UserSeed: IUserSeed[] = [
  {
    username: 'eacz',
    name: 'Esteban',
    email: 'email@email.com',
    password: 'Password1',
    biography: "It's me!",
  },
  {
    username: 'tina',
    name: 'Tina',
    email: 'email2@email.com',
    password: 'Password1',
  },
  {
    username: 'mimi',
    name: 'Mimi',
    email: 'email3@email.com',
    password: 'Password1',
    biography: "It's my cat!"
  },
  {
    username: 'Poli',
    name: 'Poli',
    email: 'email4@email.com',
    password: 'Password1',
  },
]
