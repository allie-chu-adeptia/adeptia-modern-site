import { Link } from "@/components/link"
import { ExpandedCategory } from "@/sanity/types/local.types"

export function CategoryChip({
    categories,
    nolink
}: {
    categories?: ExpandedCategory[],
    nolink?: boolean
}) {

    return (
        Array.isArray(categories) && (
            <div className="flex flex-wrap gap-2">
                {categories.map((category: ExpandedCategory, index: number) => (
                    nolink ? (
                        <span
                            key={index}
                            className="rounded-full border border-dotted border-gray-300 bg-gray-50 px-2 text-sm/6 font-medium text-gray-500"
                        >
                            {category.name}
                        </span>
                    ) : (
                        <Link
                            key={index}
                            href={`?category=${category.slug}`}
                            className="rounded-full border border-dotted border-gray-300 bg-gray-50 px-2 text-sm/6 font-medium text-gray-500"
                        >
                            {category.name}
                        </Link>
                    )
                ))}
            </div>
        )
    )
}


