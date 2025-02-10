import { ExpandedCategory, ExpandedImage, ExpandedAuthor } from "@/sanity/types/local.types";
import { CategoryChip } from "@/lib/categoryChip";
import { image } from '@/sanity/image'
import { LogoLight } from "@/components/logo";
import { Link } from '@/components/link'

function buildDefaultCoverImage(title: string, pathName: string) {
    return (
        <div className="aspect-video w-full rounded-2xl bg-gray-100 object-cover sm:aspect-[2/1] lg:aspect-[3/2] bg-gradient-to-br from-[#3C7BEF] via-[#0A4ECD] to-[#3B25E0]">
            <div className="absolute inset-0 p-8 flex flex-col">
                <div className="text-sm font-medium text-white/80 uppercase tracking-wider">
                    {pathName.split('/').pop()?.replace(/-/g, ' ')}
                </div>
                <div className="mt-4 text-2xl font-medium text-white">
                    {title}
                </div>
                <div className="absolute bottom-8 right-8">
                    <LogoLight className="h-8 text-white" />
                </div>
            </div>
        </div>
    )
}

export function CoverImageNoText(
    {
        title,
        slug,
        pathName
    }: {
        title?: string,
        slug: string,
        pathName: string
    }
) {
    return (
        <div className="w-full">
            <Link href={`/${pathName}/${slug}`}>
                <div className="relative w-full">
                    {buildDefaultCoverImage(title || '', pathName)}
                </div>
            </Link>
        </div>
    )
}

export function CoverImageWText(
    {
        date,
        categories,
        type,
        title,
        excerpt,
        author,
        coverImage,
        slug,
        pathName
    }: {
        date?: string;
        categories?: ExpandedCategory[];
        type?: string;
        title?: string;
        excerpt?: string;
        author?: ExpandedAuthor;
        coverImage?: ExpandedImage;
        slug: string,
        pathName: string
    }
) {

    return (
        <div className="w-full">
            <Link href={`/${pathName}/${slug}`}>
                <div className="relative w-full">
                
                        {coverImage ? (
                            <img
                                alt={coverImage?.altText || ''}
                                src={image(coverImage).size(2016, 1344).url()}
                                className="aspect-video w-full rounded-2xl bg-gray-100 object-cover sm:aspect-[2/1] lg:aspect-[3/2]"
                            />
                        ) : (
                            buildDefaultCoverImage(title || '', pathName)
                        )}
                    <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
                </div>
            </Link>
            <div className="max-w-xl">
                <div className="mt-8 flex items-center gap-x-4 text-xs">
                    {type && (
                        <div className="text-xs font-bold text-blue-600 tracking-wider uppercase">{type}</div>
                    )}
                    {date && (
                        <time dateTime={date} className="text-gray-500">
                            {date}
                        </time>
                    )}
                </div>
                <div className="group relative">
                    <h3 className="mt-3 text-lg/6 font-semibold text-gray-900 group-hover:text-gray-600">
                        <Link href={`/${pathName}/${slug}`}>
                            <span className="absolute inset-0" />
                            {title}
                        </Link>
                    </h3>
                    {excerpt && (
                        <p className="mt-5 line-clamp-3 text-sm/6 text-gray-600">{excerpt}</p>
                    )}
                </div>
                {categories && (
                    <div className="mt-5">
                        <CategoryChip categories={categories} pathName={pathName} />
                    </div>
                )}
                {author && author.profilePic && (
                    <div className="relative mt-8 flex items-center gap-x-4">
                        <img
                        alt={`Picture of ${author.name}`}
                        src={image(author.profilePic).width(64).height(64).url()}
                        className="size-10 rounded-full bg-gray-100"
                        />
                    <div className="text-sm/6">
                        <p className="font-semibold text-gray-900">
                            {author.name}
                        </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}