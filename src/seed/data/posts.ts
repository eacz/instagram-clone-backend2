import { User } from 'src/auth/user.entity'

interface ISeedPost {
  images: string[]
  user?: User
  savedCount?: number
  description?: string
  hideLikesAndViews?: boolean
  canBeCommented?: boolean
}

export const SeedPosts: ISeedPost[] = [
  {
    images: [
      'https://st2.depositphotos.com/1036149/5381/i/450/depositphotos_53811511-stock-photo-duck-with-sunglasses.jpg',
    ],
  },
  {
    images: [
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuRcKl4Ma25FiDnNETOZloVqmoDdIUyIzxYNpEGE4xGOHlHGEw-ApPClxPNiyfk66YFWo&usqp=CAU',
    ],
  },
]
