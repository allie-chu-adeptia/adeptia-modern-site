import { Button } from "@/components/button";
import { LinkedHomepageConnectorLogo } from "@/components/linkedConnectorLogo";
import StylePortableText from "@/components/stylePortableText";
import { image } from "@/sanity/image";
import { getCustomer } from "@/sanity/queries/customer"
import { ExpandedCustomer } from "@/sanity/types/local.types";
import { PortableTextBlock } from "@portabletext/react";
import { notFound } from "next/navigation";
import { ChevronLeftIcon } from '@heroicons/react/16/solid'

  type sParams = Promise<{ slug: string }>;

  export default async function CustomerPage(props: { params: Promise<sParams> }) {
    const { slug } = await props.params
    const customer = (await getCustomer(slug) as ExpandedCustomer) || notFound()

    return (
      <div className="relative isolate overflow-hidden bg-white px-6 py-24 sm:py-32 lg:overflow-visible lg:px-0">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto grid max-w-2xl grid-cols-1 items-start gap-x-8 gap-y-16 sm:gap-y-24 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            <div className="lg:sticky lg:top-28 lg:pr-4">
              <div className="relative overflow-hidden rounded-3xl bg-gray-200 px-6 pb-8 pt-8 shadow-lg sm:px-12 lg:max-w-lg lg:px-8 lg:pb-8 xl:px-10 xl:pb-10">
                {customer.logo && (
                    <img
                        alt={customer.logo.altText || ''}
                        src={image(customer.logo).url()}
                        className="px-8 py-4 rounded-xl bg-white mb-10 h-auto w-[300px] object-contain"
                    />
                )}
                {customer.description && (
                  <p className="mb-5 text-base/7 font-regular text-gray-700">
                    {customer.description}
                  </p>
                )}
                {customer.size && (
                  <div className="mb-5">
                    <p className="text-sm font-regular text-gray-400 uppercase">Company Size</p>
                    <p className="text-base font-regular text-gray-700">
                      {customer.size}
                    </p>
                  </div>
                )}
                {customer.industry && (
                    <div className="mb-5">
                        <p className="text-sm font-regular text-gray-400 uppercase">Industry</p>
                        <p className="text-base font-regular text-gray-700">
                            {customer.industry}
                        </p>
                    </div>
                )}
                {customer.connector && (
                    <div className="mb-5">
                        <p className="text-sm font-regular text-gray-500 uppercase">Connectors</p>
                        <div className="flex flex-wrap gap-2 mt-2">
                            {customer.connector.map((connector, index) => (
                                connector.logo && (
                                    <div key={index} className="h-[50px] w-[50px] bg-white rounded-lg p-1 border border-gray-300">
                                        <LinkedHomepageConnectorLogo connector={connector} size={50} />
                                    </div>
                                )
                            ))}
                        </div>
                    </div>
                )}
              </div>
            </div>
            <div className="col-span-2">
              <div className="text-base/7 text-gray-700 max-w-3xl">
                <p className="text-base/7 font-semibold text-[var(--primary-blue)]">Customer Stories</p>
                <h1 className="mt-2 mb-10 text-pretty text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
                  {customer.title}
                </h1>
                <StylePortableText value={customer.body as PortableTextBlock[]} />
                <div className="mt-10">
                    <Button variant="outline" href="/customers">
                        <ChevronLeftIcon className="size-4" />
                        Back to all customer stories
                    </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
  