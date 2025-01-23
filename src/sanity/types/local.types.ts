import { Resource } from "./sanity.types"

interface ExpandedAuthor {
    _id: string
    name?: string
    profilePic?: typeof Image
  }
  
  export interface ExpandedCategory {
    _id: string
    name?: string
    slug?: string
  }
  
  export interface ExpandedPost extends Omit<Resource, 'author' | 'categories'> {
    author?: ExpandedAuthor
    categories?: ExpandedCategory[]
    slug: string
  }
