
import { Link } from '@/components/link'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import {
  CheckIcon,
  ChevronUpDownIcon,
} from '@heroicons/react/16/solid'

// Renders type dropdown menu with all available blog types
export async function TypesFilter({ 
    selected, 
    category, 
    pathName 
}: { 
    selected?: string; 
    category?: string; 
    pathName: string 
}) {
  const types = ['Datasheet', 'White Paper', 'Video', 'eBook', 'Infographic']

  function getTypeUrl(type?: string) {
    const params = new URLSearchParams()
    if (type) params.set('type', type)
    if (category) params.set('category', category)
    return `/${pathName}${params.toString() ? `?${params.toString()}` : ''}`
  }

  return (
    <div className="flex flex-wrap items-center justify-between gap-2">
      <Menu>
        <MenuButton className="flex items-center justify-between gap-2 font-medium">
          {types.find((type: string) => type === selected) || 'All types'}
          <ChevronUpDownIcon className="size-4 fill-slate-900" />
        </MenuButton>
        <MenuItems
          anchor="bottom start"
          className="min-w-40 rounded-lg bg-white p-1 shadow-lg ring-1 ring-gray-200 [--anchor-gap:6px] [--anchor-offset:-4px] [--anchor-padding:10px]"
          key="types-menu"
        >
          <MenuItem key="all-types">
            <Link
              href={getTypeUrl()}
              data-selected={selected === undefined ? true : undefined}
              className="group grid grid-cols-[1rem,1fr] items-center gap-2 rounded-md px-2 py-1 data-[focus]:bg-gray-950/5"
            >
              <CheckIcon className="hidden size-4 group-data-[selected]:block" />
              <p className="col-start-2 text-sm/6">All Types</p>
            </Link>
          </MenuItem>
          {types.map((type: string) => (
            <MenuItem key={type}>
              <Link
                href={getTypeUrl(type)}
                data-selected={type === selected ? true : undefined}
                className="group grid grid-cols-[16px,1fr] items-center gap-2 rounded-md px-2 py-1 data-[focus]:bg-gray-950/5"
              >
                <CheckIcon className="hidden size-4 group-data-[selected]:block" />
                <p className="col-start-2 text-sm/6">{type}</p>
              </Link>
            </MenuItem>
          ))}
        </MenuItems>
      </Menu>
    </div>
  )
}