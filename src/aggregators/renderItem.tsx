import { ExpandedAggregatorItem } from './aggregator'
import dayjs from 'dayjs'
import { CoverImageWText } from './displayTypes/cardDisplay'
import cleanString from '@/lib/cleanString'

// Cleans and trims the excerpt to 200 characters
export function excerptToHTML(excerpt: string) {

  excerpt = cleanString(excerpt)
    if (!excerpt) {
      return ''
    }
    // Remove any HTML tags from the excerpt
    const plainText = typeof excerpt === 'string' ? excerpt.replace(/(<([^>]+)>)/gi, '') : ''
    // Trim to 200 chars and add ellipsis
    return plainText.substring(0, 200) + '...'
}

export function getTypeSlug(type: string) {
    const slugs: { [key: string]: string } = {
      'Datasheet': 'datasheets',
      'White Paper': 'white-papers',
      'Video': 'videos',
      'eBook': 'ebooks',
      'Infographic': 'infographics',
    }
    return slugs[type]
}

// Renders paginated list of resource posts, filtered by category if specified
export async function RenderItem({ 
    items
  }: { 
    items: ExpandedAggregatorItem[]
  }) {
  
    return (
      <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
        {items.map((item, index) => (
          <div
            key={index}
            className="flex flex-col items-start justify-between"
          >
            {item._type === 'page' ? (
                <CoverImageWText
                    title={item.title}
                    slug={item.slug}
                    pathName={item.pathName}
                />
            ) : item._type === 'resource' ? (
              item.type === 'Blog' || item.type === 'News' ? (
                <CoverImageWText 
                    date={dayjs(item.publishDate).format('dddd, MMMM D, YYYY')}
                    categories={item.category}
                    type={item.type}
                    title={item.title}
                    excerpt={excerptToHTML(item.excerpt as string)}
                    author={item.author}
                    coverImage={item.featuredImage}
                    slug={item.slug}
                    pathName={item.pathName}
                    gradient={true}
                />
              ) : (
                <CoverImageWText 
                    date={dayjs(item.publishDate).format('dddd, MMMM D, YYYY')}
                    categories={item.category}
                    type={item.type}
                    title={item.title}
                    excerpt={excerptToHTML(item.excerpt as string)}
                    author={item.author}
                    coverImage={item.featuredImage}
                    slug={item.slug}
                    pathName={item.pathName}
                    gradient={false}
                />
              )
            ) : item._type === 'customer' ? (
              <CoverImageWText 
                title={item.title}
                slug={item.slug}
                pathName={item.pathName}
                coverImage={item.featuredImage}
                excerpt={excerptToHTML(item.description as string)}
                logo={item.logo}
                gradient={true}
              />
            ) : (null)}
          </div>
        ))}
      </div>
    )
  }

//   export async function RenderFeaturedItem({ 
//     items,
//     pathName
//   }: { 
//     items: ExpandedPost[]
//     pathName: string
//   }) {
//     return (
//       <div>
//         {items.map((item, index) => (
//           <div
//             key={index}
//             className="relative grid grid-cols-1 border-b border-b-gray-100 py-10 first:border-t first:border-t-gray-200 max-sm:gap-3 sm:grid-cols-3"
//           >
//             <div>
//               <div className="text-sm/5 max-sm:text-gray-700 sm:font-medium">
//                 {dayjs(item.publishDate).format('dddd, MMMM D, YYYY')}
//               </div>
//             </div>
//             <div className="sm:col-span-2 sm:max-w-2xl">
//               <div className="text-xs font-bold text-blue-600 tracking-wider uppercase">{item.type}</div>
//               <h2 className="text-md/6 font-medium">{item.title}</h2>
//               <p className="mt-3 text-sm/6 text-gray-500">
//                 {excerptToHTML(item.excerpt as string)}
//               </p>
//               <div className="mt-4">
//                 <Link
//                   href={pathName === 'resources' ? `/${pathName}/${getTypeSlug(item.type as string)}/${item.slug}` : `/${pathName}/${item.slug}`}
//                   className="flex items-center gap-1 text-sm/5 font-medium"
//                 >
//                   <span className="absolute inset-0" />
//                   Read more
//                   <ChevronRightIcon className="size-4 fill-gray-400" />
//                 </Link>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     )
//   }