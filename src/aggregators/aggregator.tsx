import { ExpandedPage, ExpandedPost, ExpandedCustomer } from '@/sanity/types/local.types'
import { Category } from '@/sanity/types/sanity.types'
import { CategoriesFilter } from './renderCategories'
import { TypesFilter } from './renderResourceTypes'
import { RenderFeaturedItem, RenderItem } from './renderItem'
import { Pagination } from './pagination'
import { getTypeSlug } from './renderItem'


export type ExpandedAggregatorItem = ExpandedPost | ExpandedPage | ExpandedCustomer

interface AggregatorProps {
    getItems: (startIndex: number, endIndex: number, category?: string, type?: string) => Promise<ExpandedAggregatorItem[]>
    getItemsCount: (category?: string, type?: string) => Promise<number>
    getCategories?: (selected?: string, category?: string) => Promise<Category[]>
    getFeaturedItems?: (quantity: number) => Promise<ExpandedPost[]>
    itemsPerPage: number
    currPage: number
    filterCategory?: string
    filterType?: string
    pathName: string
    pagination?: boolean
}

export async function Aggregator({
    getItems,
    getItemsCount,
    getCategories,
    getFeaturedItems,
    itemsPerPage,
    currPage,
    filterCategory,
    filterType,
    pathName,
    pagination = true
}: AggregatorProps) {

    return (
        <>
            <div className="mb-16">
                <div className="flex gap-8 pb-4">
                    {getCategories && (
                        <CategoriesFilter
                            selected={filterCategory}
                            type={filterType || ''}
                            getCategories={getCategories}
                            pathName={pathName}
                        />
                    )}
                    {pathName === 'resources' && (
                        <TypesFilter
                            selected={filterType}
                            category={filterCategory}
                            pathName={pathName}
                        />
                    )}
                </div>
                {getCategories && <div className="w-full h-px bg-gray-200 mb-6" />}
                {currPage === 1 && !filterCategory && !filterType && getFeaturedItems && getFeaturedItems(3).then(items => {
                    items.map((item: ExpandedAggregatorItem) => {
                        if (item._type === 'page' || item._type === 'customer') {
                            item.pathName = pathName
                        } else {
                            item.pathName = pathName === 'resources' ? `${pathName}/${getTypeSlug(item.type as string)}` : `${pathName}`
                        }
                    })
                    return (
                        <div className="mb-12">
                            {RenderFeaturedItem({ items })}
                        </div>
                    )
                })}
                {getItems(
                    (currPage - 1) * itemsPerPage,
                    currPage * itemsPerPage,
                    filterCategory,
                    filterType
                ).then(items => {
                    items.map((item: ExpandedAggregatorItem) => {
                        if (item._type === 'page' || item._type === 'customer') {
                            item.pathName = pathName
                        } else {
                            item.pathName = pathName === 'resources' ? `${pathName}/${getTypeSlug(item.type as string)}` : `${pathName}`
                        }
                    })
                    return RenderItem({ items })
                })}
                {pagination && (
                    <Pagination
                        currPage={currPage}
                        category={filterCategory}
                        type={filterType}
                        itemsPerPage={itemsPerPage}
                        getItemsCount={getItemsCount}
                        pathName={pathName}
                    />
                )}
            </div>
        </>
    )
}
