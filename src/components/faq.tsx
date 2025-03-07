import { Faq } from "@/sanity/types/sanity.types"
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react'
import { MinusSmallIcon, PlusSmallIcon } from '@heroicons/react/24/outline'
import { HeaderStyle } from "../lib/headerStyle"
import clsx from 'clsx'
const textAlignment: { [key: string]: string } = {
    'centered': 'flex flex-col items-center',
    'left-aligned': 'flex flex-col items-start',
    'right-aligned': 'flex flex-col items-end',
  }


export function FaqComponent({
    faq
}: {
    faq: Faq
}) {
    
    if (String(faq.displayStyle) === 'inline') {
        return (
            <div className="bg-white">
                <div className="mx-auto max-w-7xl">
                    <div className={clsx(
                        "mx-auto max-w-4xl",
                        textAlignment[faq.header?.layout || 'centered']
                    )}>
                        <HeaderStyle header={faq.header} />
                        <dl className="mt-10 space-y-8 divide-y divide-gray-900/10">
                            {faq.content?.map((item, index) => (
                                <div key={`faq-${index}`} className="pt-8 lg:grid lg:grid-cols-12 lg:gap-8">
                                    <dt className="text-base/7 font-semibold text-gray-900 lg:col-span-5">{item.question}</dt>
                                    <dd className="mt-4 lg:col-span-7 lg:mt-0">
                                        <p className="text-base/7 text-gray-600">{item.answer}</p>
                                    </dd>
                                </div>
                            ))}
                        </dl>
                    </div>
                </div>
            </div>
        )
    }

    // Default accordion style
    return (
        <div className="bg-white">
            <div className="mx-auto max-w-7xl">
                <div className={clsx(
                    "mx-auto max-w-4xl",
                    textAlignment[faq.header?.layout || 'centered']
                )}>
                    <HeaderStyle header={faq.header} />
                </div>
                <div className="mx-auto max-w-4xl divide-gray-900/10">
                    <dl className="mt-10 space-y-6 divide-y divide-gray-900/10">
                        {faq.content?.map((item, index) => (
                            <Disclosure key={`faq-${index}`} as="div" className="pt-6">
                                <dt>
                                    <DisclosureButton className="group flex w-full items-start justify-between text-left text-gray-900">
                                        <span className="text-base/7 font-semibold">{item.question}</span>
                                        <span className="ml-6 flex h-7 items-center">
                                            <PlusSmallIcon aria-hidden="true" className="size-6 group-data-[open]:hidden" />
                                            <MinusSmallIcon aria-hidden="true" className="size-6 group-[&:not([data-open])]:hidden" />
                                        </span>
                                    </DisclosureButton>
                                </dt>
                                <DisclosurePanel as="dd" className="mt-2 pr-12">
                                    <p className="text-base/7 text-gray-600">{item.answer}</p>
                                </DisclosurePanel>
                            </Disclosure>
                        ))}
                    </dl>
                </div>
            </div>
        </div>
    )
}