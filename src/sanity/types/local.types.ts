import { Post } from "./sanity.types"

interface ExpandedAuthor {
    _id: string
    name?: string
    link?: string
    avatarUrl?: string
  }
  
  export interface ExpandedCategory {
    _id: string
    name?: string
    slug?: string
  }
  
  export interface ExpandedPost extends Omit<Post, 'author' | 'categories'> {
    author?: ExpandedAuthor
    categories?: ExpandedCategory[]
  }