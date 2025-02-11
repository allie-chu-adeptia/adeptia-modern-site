import { ReactElement } from "react"
import { Connector, Customer, Page, Resource } from "./sanity.types"

export interface ExpandedAuthor {
    _id: string
    name?: string
    profilePic?: typeof Image
  }
  
export interface ExpandedCategory {
  _id: string
  name?: string
  slug?: string
}

export interface ExpandedImage {
  _type: 'image'
  asset: {
    _ref: string
    _type: 'reference'
  }
  altText?: string
}

export interface ExpandedConnector extends Omit<Connector, 'logo' | 'categories'> {
  slug: string
    logo: {
        asset: {
            url: string
        }
    }
    categories: ExpandedCategory[]
    name: string
}

export interface ExpandedPost extends Omit<Resource, 'author' | 'categories' | 'category'> {
  author?: ExpandedAuthor
  categories?: ExpandedCategory[]
  category?: ExpandedCategory[]
  featuredImage?: ExpandedImage
  slug: string
  pathName: string
}

export interface IconObject {
  provider: string;
  name: string;
  component: () => ReactElement;
  tags: string[];
}

export interface ExpandedPage extends Omit<Page, 'category' | 'parent'> {
  category?: ExpandedCategory[]
  slug: string
  pathName: string
  parent: {
    _id: string,
    link: string
  }
}

export interface ExpandedCustomer extends Omit<Customer, 'category' | 'connector'> {
  category?: ExpandedCategory[]
  featuredImage?: ExpandedImage
  logo?: ExpandedImage
  slug: string
  pathName: string
  connector?: ExpandedConnector[]
}