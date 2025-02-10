import { Link } from '@/components/link'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import {
  CheckIcon,
  ChevronUpDownIcon,
} from '@heroicons/react/16/solid'
import { Category } from '@/sanity/types/sanity.types'

// Renders category dropdown menu with all available blog categories
export async function CategoriesFilter({ 
    selected, 
    type, 
    getCategories, 
    pathName 
}: { 
    selected?: string; 
    type?: string; 
    getCategories: () => Promise<Category[]>; 
    pathName: string; 
}) {
  const categories = await getCategories()

  function getCategoryUrl(category?: string) {
    const params = new URLSearchParams()
    if (category) params.set('category', category)
    if (type) params.set('type', type)
    return `/${pathName}${params.toString() ? `?${params.toString()}` : ''}`
  }

  if (categories.length === 0) {
    return
  }

  return (
    <div className="flex flex-wrap items-center justify-between gap-2">
      <Menu>
        <MenuButton className="flex items-center justify-between gap-2 font-medium">
          {categories.find((category: Category) => category.slug?.toString() === selected)?.name ||
            'All categories'}
          <ChevronUpDownIcon className="size-4 fill-slate-900" />
        </MenuButton>
        <MenuItems
          anchor="bottom start"
          className="min-w-40 rounded-lg bg-white p-1 shadow-lg ring-1 ring-gray-200 [--anchor-gap:6px] [--anchor-offset:-4px] [--anchor-padding:10px]"
          key="categories-menu"
        >
          <MenuItem key="all-categories">
            <Link
              href={getCategoryUrl()}
              data-selected={selected === undefined ? true : undefined}
              className="group grid grid-cols-[1rem,1fr] items-center gap-2 rounded-md px-2 py-1 data-[focus]:bg-gray-950/5"
            >
              <CheckIcon className="hidden size-4 group-data-[selected]:block" />
              <p className="col-start-2 text-sm/6">All categories</p>
            </Link>
          </MenuItem>
          {categories.map((category: Category) => (
            <MenuItem key={category._id}>
              <Link
                href={(() => {
                  return getCategoryUrl(category.slug?.toString());
                })()}
                data-selected={category.slug === selected ? true : undefined}
                className="group grid grid-cols-[16px,1fr] items-center gap-2 rounded-md px-2 py-1 data-[focus]:bg-gray-950/5"
              >
                <CheckIcon className="hidden size-4 group-data-[selected]:block" />
                <p className="col-start-2 text-sm/6">{category.name}</p>
              </Link>
            </MenuItem>
          ))}
        </MenuItems>
      </Menu>
    </div>
  )
}