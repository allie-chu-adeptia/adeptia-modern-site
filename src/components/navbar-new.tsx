'use client'

import { Container } from "@/components/container";
import { ClientLink } from "@/components/clientLink";
import { LogoLight } from "@/components/logo";
import { Button } from "@/components/button";
import { Disclosure, DisclosureButton, DisclosurePanel, Popover, PopoverButton, PopoverPanel } from '@headlessui/react'
import { PlayCircleIcon, PhoneIcon, RectangleGroupIcon, ChevronRightIcon, Bars2Icon, XMarkIcon } from '@heroicons/react/20/solid'
import clsx from "clsx";
import { useState } from "react";
import { motion } from "framer-motion";

import {
    TruckIcon,
    CurrencyDollarIcon,
    BuildingOfficeIcon,
} from '@heroicons/react/20/solid'

type Page = {
    name: string
    href: string
    description?: string
    icon?: React.ElementType
}

type SubMenu = {
    name: string
    items: (Page)[]
}

type TopLevelMenu = {
    header: string
    submenus: SubMenu[]
}

const PlatformMenu: TopLevelMenu = {
    header: 'Platform',
    submenus: [
        {
            name: 'Platform', items: [
                { name: 'How it Works', href: '/products/how-it-works' },
                { name: 'Why Adeptia Connect', href: '/products/why-adeptia-connect' },
                { name: 'Pricing', href: '/pricing' },
            ]
        },
        {
            name: 'Connection', items: [
                { name: 'API', href: '/products/connect/#id-api' },
                { name: 'EDI', href: '/products/connect/#id-edi' },
                { name: 'ETL/ELT', href: '/products/connect/#id-etl' },
                { name: 'iPaaS', href: '/products/connect/#id-ipaas' },
                { name: 'Files', href: '/products/connect/#id-files' },
                { name: 'App Connectors', href: '/connectors' },
                { name: 'See All', href: '/products/connect' }
            ]
        },
        {
            name: 'Mapping & Alignment', items: [
                { name: 'AI Data Mapping', href: '/products/artificial-intelligence-mapping' },
                { name: 'Pre-Built Automations', href: '/products/pre-built-automations' },
                // { name: 'Agentic Connectors', href: '#' },
            ]
        },
        {
            name: 'Workflows & Orchestration', items: [
                { name: 'AI Business Rules', href: '/products/ai-business-rules' },
                { name: 'Intelligent Document Processing', href: '/products/idp' },
                { name: 'No-Code Automation Builder', href: '/products/no-code-automation-builder' },
            ]
        },
        {
            name: 'Monitoring & Management', items: [
                { name: 'Custom Notifications', href: '/products/manage-and-monitor/#id-custom-notifications' },
                { name: 'Error Monitoring and RCA', href: '/products/manage-and-monitor/#id-error-monitoring-rca' },
                { name: 'Data Observability', href: '/products/manage-and-monitor/#id-observability' },
                { name: 'Audit Trail', href: '/products/manage-and-monitor/#id-audit-trail' },
                { name: 'See All', href: '/products/manage-and-monitor' }
            ]
        },
    ]
}

const SolutionsMenu: TopLevelMenu = {
    header: 'Use Cases',
    submenus: [
        {
            name: 'By Industry', items: [
                { name: 'Insurance', href: '/solutions/industry/insurance-integration', icon: BuildingOfficeIcon },
                { name: 'Financial Services', href: '/solutions/industry/financial-data-integration', icon: CurrencyDollarIcon },
                { name: 'Manufacturing and Distribution', href: '/solutions/industry/supply-chain-logistics', icon: TruckIcon },
                // { name: 'Software and Service Providers', href: '#', icon: CpuChipIcon },
            ]
        },
        {
            name: 'By Initiative', items: [
                { name: 'Digital Transformation', href: '/solutions/by-initiative#id-digital-transformation' },
                { name: 'Business Process Automation', href: '/solutions/by-initiative#id-business-process-automation' },
                { name: 'AI Data Readiness', href: '/solutions/by-initiative#id-ai-data-readiness' },
                { name: 'Regulatory Compliance', href: '/solutions/by-initiative#id-regulatory-compliance' },
                // { name: 'First Mile Data Problems', href: '/solutions/by-initiative#id-first-mile-data-problems' },
            ]
        },
        {
            name: 'By Capability', items: [
                { name: 'Intelligent Document Processing', href: '/products/idp' },
                { name: 'AI Data Mapping', href: '/products/artificial-intelligence-mapping' },
                { name: 'No-Code Integration and Automations', href: '/products/no-code-automation-builder' },
            ]
        },
        {
            name: 'By Application', items: [
                { name: 'SAP', href: '/connectors/sap-integration-accelerator' },
                { name: 'Salesforce', href: '/connectors/salesforce-integration-accelerator' },
                { name: 'Netsuite', href: '/connectors/netsuite-integration-accelerator' },
                // { name: 'Workday', href: '#' },
                // { name: 'ADP', href: '#' },
                { name: 'See All Integrations', href: '/connectors' },
            ]
        },
    ]
}

const ResourcesMenu: TopLevelMenu = {
    header: 'Resources',
    submenus: [
        {
            name: 'Resources', items: [
                { name: 'Blog', href: '/blog' },
                { name: 'Customer Stories', href: '/customers' },
                { name: 'All Resources', href: '/resources' },
            ]
        },
        {
            name: 'Support', items: [
                { name: 'Product Support', href: '/products/product-support' },
                { name: 'Product Documentation', href: 'https://docs.adeptia.com/' },
            ]
        }
    ]
}

const CompanyMenu: TopLevelMenu = {
    header: 'Company',
    submenus: [
        {
            name: 'Company', items: [
                { name: 'About', href: '/about' },
                { name: 'News', href: '/news' },
                { name: 'Leadership', href: '/about#id-leadership' },
                { name: 'Careers', href: '/careers' },
                { name: 'Contact', href: '/about/contact-us' },
            ]
        },
        {
            name: 'Legal', items: [
                { name: 'Privacy Policy', href: '/privacy-policy' },
                { name: 'Terms of Service', href: '/terms-of-service' },
            ]
        },
    ]
}

const menu = [PlatformMenu, SolutionsMenu, ResourcesMenu, CompanyMenu]

const callsToAction = [
    { name: 'Schedule a Demo', href: '/adeptia-connect-demo', icon: PlayCircleIcon },
    { name: 'Speak to Sales', href: '/about/contact-us', icon: PhoneIcon },
    { name: 'Begin Free Trial', href: '/free-trial', icon: RectangleGroupIcon },
]

const recentPosts = [
    {
        id: 1,
        title: 'Welcome to a New Era of Adeptia Connect',
        href: '/blog/new-era-adeptia-connect',
        date: 'Feb 12, 2025',
        datetime: '2025-02-12',
        category: { title: 'Adeptia Connect', href: '/blog' },
        imageUrl:
            'https://cdn.sanity.io/images/5ujtwa6a/production/6731fad91b61ed9829192e3ac8cac74901f8e88c-2048x1180.png',
        description:
            'Today, Adeptia launched the latest version of Adeptia Connect, which includes several exciting new enhancements! Hear from CTO and cofounder Deepak Singh what this means for our customers and prospects.',
    },
    {
        id: 2,
        title: 'What is Data Mapping?',
        href: '/blog/what-data-mapping',
        date: 'Dec 20, 2024',
        datetime: '2024-12-20',
        category: { title: 'AI', href: '/blog' },
        imageUrl:
            'https://cdn.sanity.io/images/5ujtwa6a/production/340e21ca0ea99dead0c085f7dd7c6822858912db-1000x589.jpg',
        description: 'Data mapping is a crucial design step in data migration, data integration, and data transformation projects. Modern-day data mapping solutions leverage artificial intelligence (AI) to map data fields from a source format to a target format.',
    },
]

const recentReviews = [
    {
        id: 1,
        title: 'Gartner Peer Insights Reviews',
        href: 'https://www.gartner.com/reviews/market/data-integration-tools/vendor/adeptia?utm_source=adeptia&utm_medium=referral&utm_campaign=widget&utm_content=ZTY4YzdiMDItM2YyMS00MjEyLWJkMzUtNmRkNTBiNWI4NzE5',
        imageUrl:
            'https://cdn.sanity.io/images/5ujtwa6a/production/60e4b6bfa0e5bacc85a5c11859a8798de206cece-1872x2172.png',
    },
    {
        id: 2,
        title: 'G2 Reviews',
        href: 'https://www.g2.com/products/adeptia-connect/reviews?utm_source=review-widget',
        imageUrl:
            'https://cdn.sanity.io/images/5ujtwa6a/production/b05460e0c29abf9cfafe14631f0691576ba02c63-1872x2172.png',
    },
]

function renderPageItem(item: Page) {
    return (
        <div key={item.name} className="group relative py-2 flex gap-x-3 items-center">
            {item.icon &&
                <div className="mt-1 flex flex-none items-center justify-center">
                    <item.icon aria-hidden="true" className="flex items-center gap-x-1 size-6 text-gray-400 group-hover:text-gray-900" />
                </div>
            }
            <div>
                <a href={item.href} className="flex items-center gap-x-1 font-regular text-sm text-gray-700 group-hover:text-gray-900">
                    {item.name}
                    <span className="absolute inset-0" />
                    <ChevronRightIcon className="size-4 opacity-0 transform translate-x-2 transition-all duration-200 ease-in-out group-hover:opacity-100 group-hover:translate-x-0" />
                </a>
            </div>
        </div>
    )
}

function renderSubMenu(subMenu: SubMenu, className?: string) {
    return (
        <div>
            <h3 className={clsx("text-sm/6 font-semibold text-gray-800 uppercase", className)}>{subMenu.name}</h3>
            <div className="mt-3 flow-root">
                <div className="-my-2">
                    {subMenu.items.map((item) => (
                        renderPageItem(item)
                    ))}
                </div>
            </div>
        </div>
    )
}

function renderMobileSubMenu(subMenu: SubMenu, index: number, className?: string) {
    return (
        <div key={index} className="mb-1 bg-white/20 p-2 rounded-md">
            <h3 className={clsx("text-sm/6 font-semibold text-gray-200 uppercase", className)}>{subMenu.name}</h3>
            <div className="my-4 flow-root">
                <div className="-my-2">
                    {subMenu.items.map((item) => (
                        renderMobilePageItem(item)
                    ))}
                </div>
            </div>
        </div>
    )
}

function renderMobilePageItem(item: Page) {
    return (
        <div key={item.name} className="group relative py-2 flex gap-x-3 items-center text-white">
            {item.icon &&
                <div className="mt-1 flex flex-none items-center justify-center">
                    <item.icon aria-hidden="true" className="flex items-center gap-x-1 size-6" />
                </div>
            }
            <div>
                <a href={item.href} className="flex items-center gap-x-1 font-regular text-sm">
                    {item.name}
                    <span className="absolute inset-0" />
                </a>
            </div>
        </div>
    )
}


function popoverButton(text: string, onMouseEnter: () => void) {
    return (
        <PopoverButton
            onMouseEnter={onMouseEnter}
            className="inline-flex items-center gap-x-1 text-sm/6 font-bold text-white focus:outline-none"
        >
            {text}
        </PopoverButton>
    )
}

function footerPanel() {
    return (
        <div className="bg-gray-50">
            <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 divide-y divide-gray-900/5 sm:grid-cols-3 sm:divide-x sm:divide-y-0 sm:border-x sm:border-gray-900/5">
                    {callsToAction.map((item) => (
                        <a
                            key={item.name}
                            href={item.href}
                            className="flex items-center gap-x-2.5 p-3 px-6 text-sm/6 font-semibold text-gray-900 hover:bg-gray-100 sm:justify-center sm:px-0"
                        >
                            <item.icon aria-hidden="true" className="size-5 flex-none text-gray-400" />
                            {item.name}
                        </a>
                    ))}
                </div>
            </div>
        </div>
    )
}

function MobileNavButton() {
    return (
        <DisclosureButton
            className="flex size-12 items-center justify-center self-center rounded-lg text-white data-[hover]:bg-white/5 lg:hidden"
            aria-label="Open main menu"
        >
            <Bars2Icon className="size-6" />
        </DisclosureButton>
    )
}

function MobileNav() {
    const [openStates, setOpenStates] = useState(menu.map(() => false));

    return (
        <DisclosurePanel className="lg:hidden">
            <div className="fixed inset-0 z-50 overflow-hidden">
                <div className="absolute inset-0 bg-gray-900/50" />
                <div className="fixed inset-y-0 right-0 w-full max-w-sm flex flex-col bg-[linear-gradient(278deg,_#3C7BEF_13.25%,_#0A4ECD_67.5%,_#3B25E0_111.89%)]">
                    {/* Header */}
                    <div className="sticky top-0 z-10 h-[80px] p-4 flex items-center border-b border-white/20">
                        <DisclosureButton
                            className="flex items-center justify-between w-full text-white"
                            onClick={() => setOpenStates(menu.map(() => false))}
                        >
                            <LogoLight className="h-8 w-auto" />
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                        </DisclosureButton>
                    </div>

                    {/* Scrollable content */}
                    <div className="flex-1 overflow-y-auto">
                        <div className="flex flex-col gap-6 p-4">
                            {menu.map((submenu, index) => (
                                <motion.div
                                    initial={{ opacity: 0, rotateX: -90 }}
                                    animate={{ opacity: 1, rotateX: 0 }}
                                    transition={{
                                        duration: 0.15,
                                        ease: 'easeInOut',
                                        rotateX: { duration: 0.3, delay: index * 0.1 },
                                    }}
                                    key={index}
                                >
                                    <Disclosure>
                                        <DisclosureButton>
                                            <div
                                                className="flex flex-row gap-x-2 items-center font-regular text-white"
                                                onClick={() => setOpenStates(prev => ({ ...prev, [index]: !prev[index] }))}
                                            >
                                                {submenu.header}
                                                <ChevronRightIcon
                                                    className={`size-4 transition-transform duration-200 ${openStates[index] ? 'rotate-90' : ''}`}
                                                />
                                            </div>
                                        </DisclosureButton>
                                        <DisclosurePanel>
                                            <motion.div
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                exit={{ opacity: 0 }}
                                                transition={{
                                                    duration: 0.15,
                                                    ease: 'easeInOut',
                                                }}
                                            >
                                                {submenu.submenus.map((subMenu, index) =>
                                                    renderMobileSubMenu(subMenu, index)
                                                )}
                                            </motion.div>
                                        </DisclosurePanel>
                                    </Disclosure>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="sticky bottom-0 px-4 py-4 border-t border-white/20 bg-[linear-gradient(278deg,_#3C7BEF_13.25%,_#0A4ECD_67.5%,_#3B25E0_111.89%)]">
                        <Button variant="secondary" className="w-full" dark={true} href="/adeptia-connect-demo">
                            Schedule a Demo
                        </Button>
                    </div>
                </div>
            </div>
        </DisclosurePanel>
    )
}

// function MobileNav({ setOpen }: { setOpen: (open: boolean) => void }) {
//     return (
//         <DialogPanel
//             transition
//             className="pointer-events-auto w-screen max-w-md transform transition duration-500 ease-in-out data-[closed]:translate-x-full sm:duration-700"
//         >
//             <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
//                 <div className="px-4 sm:px-6">
//                     <div className="flex items-start justify-between">
//                     <DialogTitle className="text-base font-semibold text-gray-900">Panel title</DialogTitle>
//                     <div className="ml-3 flex h-7 items-center">
//                         <button
//                         type="button"
//                         onClick={() => setOpen(false)}
//                         className="relative rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
//                         >
//                         <span className="absolute -inset-2.5" />
//                         <span className="sr-only">Close panel</span>
//                         <XMarkIcon aria-hidden="true" className="size-6" />
//                         </button>
//                     </div>
//                     </div>
//                 </div>
//                 <div className="relative mt-6 flex-1 px-4 sm:px-6">{/* Your content */}</div>
//             </div>
//         </DialogPanel>
//     )
// }

function PlatformPopover({
    isOpen,
    onMouseEnter,
    onMouseLeave
}: {
    isOpen: boolean,
    onMouseEnter: () => void,
    onMouseLeave: () => void
}) {

    return (
        <Popover>
            {popoverButton('Platform', onMouseEnter)}
            <PopoverPanel static className="absolute inset-x-0 top-0 mt-[72px]">
                <div
                    className={`absolute left-0 right-0 transform transition-all duration-200 ease-out ${isOpen ? 'translate-y-0' : '-translate-y-2'
                        } ${!isOpen && 'hidden'}`}
                    onMouseLeave={onMouseLeave}
                >
                    <div className="relative bg-white shadow-lg ring-1 ring-gray-900/5 z-20">
                        <div className="relative mx-auto max-w-7xl grid grid-cols-5 p-6 gap-x-6 sm:gap-x-8">
                            <div>
                                {renderSubMenu(PlatformMenu.submenus[0])}
                            </div>

                            <div>
                                {renderSubMenu(PlatformMenu.submenus[1])}
                            </div>

                            <div>
                                {renderSubMenu(PlatformMenu.submenus[2])}
                            </div>

                            <div>
                                {renderSubMenu(PlatformMenu.submenus[3])}
                            </div>

                            <div>
                                {renderSubMenu(PlatformMenu.submenus[4])}
                            </div>
                        </div>
                        {footerPanel()}
                    </div>
                </div>
            </PopoverPanel>
        </Popover>
    )
}

function SolutionsPopover({
    isOpen,
    onMouseEnter,
    onMouseLeave
}: {
    isOpen: boolean,
    onMouseEnter: () => void,
    onMouseLeave: () => void
}) {
    return (
        <Popover>
            {popoverButton('Use Cases', onMouseEnter)}
            <PopoverPanel static className="absolute inset-x-0 top-0 mt-[72px]">
                <div
                    className={`absolute left-0 right-0 transform transition-all duration-200 ease-out ${isOpen ? 'translate-y-0' : '-translate-y-2'
                        } ${!isOpen && 'hidden'}`}
                    onMouseLeave={onMouseLeave}
                >
                    <div className="relative bg-white shadow-lg ring-1 ring-gray-900/5 z-20">
                        <div className="relative mx-auto max-w-7xl grid grid-cols-4 p-6 gap-x-6 sm:gap-x-8">
                            <div>
                                {renderSubMenu(SolutionsMenu.submenus[0])}
                            </div>

                            <div>
                                {renderSubMenu(SolutionsMenu.submenus[1])}
                            </div>

                            <div>
                                {renderSubMenu(SolutionsMenu.submenus[2])}
                            </div>

                            <div>
                                {renderSubMenu(SolutionsMenu.submenus[3])}
                            </div>
                        </div>
                        {footerPanel()}
                    </div>
                </div>
            </PopoverPanel>
        </Popover>
    )
}

function CompanyPopover({
    isOpen,
    onMouseEnter,
    onMouseLeave
}: {
    isOpen: boolean,
    onMouseEnter: () => void,
    onMouseLeave: () => void
}) {
    return (
        <Popover>
            {popoverButton('Company', onMouseEnter)}
            <PopoverPanel static className="absolute inset-x-0 top-0 mt-[72px]">
                <div
                    className={`absolute left-0 right-0 transform transition-all duration-200 ease-out ${isOpen ? 'translate-y-0' : '-translate-y-2'
                        } ${!isOpen && 'hidden'}`}
                    onMouseLeave={onMouseLeave}
                >
                    <div className="relative bg-white shadow-lg ring-1 ring-gray-900/5 z-20">
                        <div className="relative mx-auto max-w-7xl grid grid-cols-4 p-6 gap-x-6 sm:gap-x-8">
                            <div>
                                {renderSubMenu(CompanyMenu.submenus[0])}
                            </div>

                            <div>
                                {renderSubMenu(CompanyMenu.submenus[1])}
                            </div>

                            <div>
                                <article
                                    key={recentReviews[0].id}
                                    className="relative isolate flex max-w-2xl flex-col gap-x-4 gap-y-6 sm:flex-row sm:items-start lg:flex-col lg:items-stretch"
                                >
                                    <a href={recentReviews[0].href} target="_blank" rel="noopener">
                                        <div className="relative flex-none">
                                            <img
                                                alt="Adeptia Review Logo"
                                                src={recentReviews[0].imageUrl}
                                                className="aspect-[2/1] w-full rounded-lg px-8 bg-white object-cover sm:aspect-video sm:h-32 lg:h-auto"
                                        />
                                            <div className="absolute inset-0 rounded-lg ring-1 ring-inset ring-gray-900/10" />
                                        </div>
                                    </a>
                                </article>
                            </div>

                            <div>
                                <article
                                    key={recentReviews[1].id}
                                    className="relative isolate flex max-w-2xl flex-col gap-x-4 gap-y-6 sm:flex-row sm:items-start lg:flex-col lg:items-stretch"
                                >
                                    <a href={recentReviews[1].href} target="_blank" rel="noopener">
                                        <div className="relative flex-none">
                                            <img
                                                alt="Adeptia Review Logo"
                                                src={recentReviews[1].imageUrl}
                                                className="aspect-[2/1] w-full rounded-lg px-8 bg-white object-cover sm:aspect-video sm:h-32 lg:h-auto"
                                            />
                                            <div className="absolute inset-0 rounded-lg ring-1 ring-inset ring-gray-900/10" />
                                        </div>
                                    </a>
                                </article>
                            </div>
                        </div>
                        {footerPanel()}
                    </div>
                </div>
            </PopoverPanel>
        </Popover>
    )
}

function ResourcesPopover({
    isOpen,
    onMouseEnter,
    onMouseLeave
}: {
    isOpen: boolean,
    onMouseEnter: () => void,
    onMouseLeave: () => void
}) {
    return (
        <Popover>
            {popoverButton('Resources', onMouseEnter)}
            <PopoverPanel static className="absolute inset-x-0 top-0 mt-[72px]">
                <div
                    className={`absolute left-0 right-0 transform transition-all duration-200 ease-out ${isOpen ? 'translate-y-0' : '-translate-y-2'
                        } ${!isOpen && 'hidden'}`}
                    onMouseLeave={onMouseLeave}
                >
                    <div className="relative bg-white shadow-lg ring-1 ring-gray-900/5 z-20">
                        <div className="relative mx-auto max-w-7xl grid grid-cols-4 p-6 gap-x-6 sm:gap-x-8">
                            <div>
                                {renderSubMenu(ResourcesMenu.submenus[0])}
                            </div>

                            <div>
                                {renderSubMenu(ResourcesMenu.submenus[1])}
                            </div>

                            <div>
                                <article
                                    key={recentPosts[0].id}
                                    className="relative isolate flex max-w-2xl flex-col gap-x-8 gap-y-6 sm:flex-row sm:items-start lg:flex-col lg:items-stretch"
                                >
                                    <div className="relative flex-none">
                                        <img
                                            alt="Blog Cover Image"
                                            src={recentPosts[0].imageUrl}
                                            className="aspect-[2/1] w-full rounded-lg bg-gray-100 object-cover sm:aspect-video sm:h-32 lg:h-auto"
                                        />
                                        <div className="absolute inset-0 rounded-lg ring-1 ring-inset ring-gray-900/10" />
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-x-4">
                                            <time dateTime={recentPosts[0].datetime} className="text-sm/6 text-gray-600">
                                                {recentPosts[0].date}
                                            </time>
                                            <a
                                                href={recentPosts[0].category.href}
                                                className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-100"
                                            >
                                                {recentPosts[0].category.title}
                                            </a>
                                        </div>
                                        <h4 className="mt-2 text-sm/6 font-semibold text-gray-900">
                                            <a href={recentPosts[0].href}>
                                                <span className="absolute inset-0" />
                                                {recentPosts[0].title}
                                            </a>
                                        </h4>
                                        <p className="mt-2 text-sm/6 text-gray-600">{recentPosts[0].description}</p>
                                    </div>
                                </article>
                            </div>

                            <div>
                                <article
                                    key={recentPosts[1].id}
                                    className="relative isolate flex max-w-2xl flex-col gap-x-8 gap-y-6 sm:flex-row sm:items-start lg:flex-col lg:items-stretch"
                                >
                                    <div className="relative flex-none">
                                        <img
                                            alt="Blog Cover Image"
                                            src={recentPosts[1].imageUrl}
                                            className="aspect-[2/1] w-full rounded-lg bg-gray-100 object-cover sm:aspect-video sm:h-32 lg:h-auto"
                                        />
                                        <div className="absolute inset-0 rounded-lg ring-1 ring-inset ring-gray-900/10" />
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-x-4">
                                            <time dateTime={recentPosts[1].datetime} className="text-sm/6 text-gray-600">
                                                {recentPosts[1].date}
                                            </time>
                                            <a
                                                href={recentPosts[1].category.href}
                                                className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-100"
                                            >
                                                {recentPosts[1].category.title}
                                            </a>
                                        </div>
                                        <h4 className="mt-2 text-sm/6 font-semibold text-gray-900">
                                            <a href={recentPosts[1].href}>
                                                <span className="absolute inset-0" />
                                                {recentPosts[1].title}
                                            </a>
                                        </h4>
                                        <p className="mt-2 text-sm/6 text-gray-600">{recentPosts[1].description}</p>
                                    </div>
                                </article>
                            </div>
                        </div>
                        {footerPanel()}
                    </div>
                </div>
            </PopoverPanel>
        </Popover>
    )
}

type OpenMenu = 'platform' | 'solutions' | 'resources' | 'company' | null;

export function NavbarNew() {
    // const [open, setOpen] = useState(true)

    const [openMenu, setOpenMenu] = useState<OpenMenu>(null);

    const handleMouseEnter = (menu: OpenMenu) => {
        setOpenMenu(menu);
    };

    const handleMouseLeave = () => {
        setOpenMenu(null);
    };

    return (
        <Container paddingLvl="none" className="bg-[linear-gradient(278deg,_#3C7BEF_13.25%,_#0A4ECD_67.5%,_#3B25E0_111.89%)] sticky top-0 z-50 shadow-lg">
            <Disclosure>
                <div className="py-4 flex justify-between items-center">
                    <div className="flex items-center gap-x-10">
                        <ClientLink href="/">
                            <LogoLight className="h-8 w-auto lg:h-10" />
                        </ClientLink>
                        <div className="hidden lg:flex gap-8">
                            <PlatformPopover
                                isOpen={openMenu === 'platform'}
                                onMouseEnter={() => handleMouseEnter('platform')}
                                onMouseLeave={handleMouseLeave}
                            />
                            <SolutionsPopover
                                isOpen={openMenu === 'solutions'}
                                onMouseEnter={() => handleMouseEnter('solutions')}
                                onMouseLeave={handleMouseLeave}
                            />
                            <ResourcesPopover
                                isOpen={openMenu === 'resources'}
                                onMouseEnter={() => handleMouseEnter('resources')}
                                onMouseLeave={handleMouseLeave}
                            />
                            <CompanyPopover
                                isOpen={openMenu === 'company'}
                                onMouseEnter={() => handleMouseEnter('company')}
                                onMouseLeave={handleMouseLeave}
                            />
                        </div>
                    </div>
                    <Button className="hidden lg:block" variant="primary" dark={true} href="/adeptia-connect-demo">Schedule a Demo</Button>
                    <MobileNavButton />
                </div>
                <MobileNav />
            </Disclosure>
        </Container>
    )
}