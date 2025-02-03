import { Link } from '@/components/link'
import { client } from '@/sanity/client'
import { defineQuery } from 'next-sanity'
import { Container } from '@/components/container'

const PRODUCT_QUERY = defineQuery(/* groq */ `*[
  _type == "page" && 
  defined(parent) && 
  parent._ref in *[_type == "page" && metadata.slug.current == "products"]._id
] {
  "slug": metadata.slug.current,
  title
}`)

export default async function ProductPage() {
    const pages = await client.fetch(PRODUCT_QUERY)

    return (
        <div className="py-24">
            <Container>
                {pages.map((page: { slug: string, title: string }) => (
                    <div key={page.slug}>
                    <Link href={`/products/${page.slug}`} className="text-base font-medium text-gray-950">
                        {page.title}
                    </Link>
                    </div>
                ))}
            </Container>
        </div>
    )
}