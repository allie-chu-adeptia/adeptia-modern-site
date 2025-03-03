import { Fragment } from 'react'
import { CheckIcon, MinusIcon } from '@heroicons/react/16/solid'
import { CurrencyDollarIcon } from '@heroicons/react/24/outline'
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react'
import { Eyebrow } from '@/components/text'
import { Button } from '@/components/button'
import { DefaultHeaderSection } from '@/components/headerSection'
import { Metadata } from 'next'
import { HeaderStyle as HeaderStyleType } from '@/sanity/types/sanity.types'

const tiers = [
  {
    name: 'Professional',
    description: 'Everything you need to get started.',
    // priceMonthly: '$19',
    href: '/about/contact-us',
    // highlights: [
    //   { description: 'Custom domains' },
    //   { description: 'Edge content delivery' },
    //   { description: 'Advanced analytics' },
    //   { description: 'Quarterly workshops', disabled: true },
    //   { description: 'Single sign-on (SSO)', disabled: true },
    //   { description: 'Priority phone support', disabled: true },
    // ],
  },
  {
    name: 'Premier',
    description: 'Everything in Professional, plus expanded features to scale.',
    // priceMonthly: '$49',
    href: '/about/contact-us',
    // highlights: [
    //   { description: 'Custom domains' },
    //   { description: 'Edge content delivery' },
    //   { description: 'Advanced analytics' },
    //   { description: 'Quarterly workshops' },
    //   { description: 'Single sign-on (SSO)', disabled: true },
    //   { description: 'Priority phone support', disabled: true },
    // ],
  },
  {
    name: 'Enterprise',
    description: 'Built for ultimate flexibility and scalability.',
    // priceMonthly: '$99',
    href: '/about/contact-us',
    // highlights: [
    //   { description: 'Custom domains' },
    //   { description: 'Edge content delivery' },
    //   { description: 'Advanced analytics' },
    //   { description: 'Quarterly workshops' },
    //   { description: 'Single sign-on (SSO)' },
    //   { description: 'Priority phone support' },
    // ],
  },
]
const sections = [
  {
    name: 'Features',
    features: [
      { name: 'No-Code Automation Wizard', tiers: { Professional: true, Premier: true, Enterprise: true } },
      { name: 'Marketplace, Connectors and Pre-Built Automations', tiers: { Professional: true, Premier: true, Enterprise: true } },
      { name: 'AI Mapping', tiers: { Professional: true, Premier: true, Enterprise: true } },
      { name: 'AI Docs (Intelligent Document Processing)', tiers: { Professional: true, Premier: true, Enterprise: true } },
      { name: 'EDI Capabilities', tiers: { Professional: true, Premier: true, Enterprise: true } },
      { name: 'Alerts & Notifications', tiers: { Professional: true, Premier: true, Enterprise: true } },
      { name: 'Dashboards & Logs', tiers: { Professional: true, Premier: true, Enterprise: true } },
      { name: 'Usage Reporting', tiers: { Professional: true, Premier: true, Enterprise: true } },
      { name: 'Custom Dashboards', tiers: { Professional: false, Premier: true, Enterprise: true } },
      { name: 'Process Designer', tiers: { Professional: false, Premier: true, Enterprise: true } },
      { name: 'VPN In Adeptia\'s Cloud', tiers: { Professional: false, Premier: "$", Enterprise: "$" } },
      { name: 'External Identity Management / SSO', tiers: { Professional: false, Premier: false, Enterprise: true } },
      { name: 'External App Credentials / Secrets Management', tiers: { Professional: true, Premier: true, Enterprise: true } },
      { name: 'High Availability with Microservices', tiers: { Professional: false, Premier: "$", Enterprise: "$" } },
      { name: 'Run-Time Isolation to Meet SLAs', tiers: { Professional: false, Premier: false, Enterprise: true } },
      { name: 'Non-US Region Availability', tiers: { Professional: false, Premier: "$", Enterprise: "$" } },
    ],
  },
  {
    name: 'Deployment',
    features: [
      { name: 'Multi Tenant', tiers: { Professional: true, Premier: false, Enterprise: false } },
      { name: 'Adeptia Cloud Hosted', tiers: { Professional: false, Premier: true, Enterprise: true } },
      { name: 'On Premise', tiers: { Professional: false, Premier: true, Enterprise: true } },
    ],
  },
  {
    name: 'Services',
    features: [
      { name: 'Product Support', tiers: { Professional: true, Premier: true, Enterprise: true } },
      { name: 'Implementation Services', tiers: { Professional: "$", Premier: "$", Enterprise: "$" } },
      { name: 'Managed Services', tiers: { Professional: "$", Premier: "$", Enterprise: "$" } },
      { name: 'Infrastructure Services', tiers: { Professional: "$", Premier: "$", Enterprise: "$" } },
    ],
  },
]

export const metadata: Metadata = {
  title: 'Pricing',
  description:
    'Pricing for Adeptia Connect.',
  alternates: {
    canonical: 'https://www.adeptia.com/pricing',
  },
}

const PricingPageHeader: HeaderStyleType = {
  _type: "headerStyle",
  header: "Choose the Right Plan for your Business",
  subheader: "Adeptia offers three pricing plans to fit the needs of your business.",
  layout: "left-aligned",
}

export default function Example() {

  return (
    <>
      <DefaultHeaderSection header={PricingPageHeader} />
      <div className="bg-white py-24 sm:py-32">
        <div className="relative">
          {/* <div className="absolute inset-x-0 bottom-0 top-48 bg-[radial-gradient(circle_at_center_center,#7775D6,#592E71,#030712_70%)] lg:bg-[radial-gradient(circle_at_center_150%,#7775D6,#592E71,#030712_70%)]" /> */}
          <div className="relative mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8">
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
              {tiers.map((tier) => (
                <div
                  key={tier.name}
                  className="-m-2 grid grid-cols-1 rounded-[2rem] shadow-[inset_0_0_2px_1px_#ffffff4d] ring-1 ring-black/5 max-lg:mx-auto max-lg:w-full max-lg:max-w-md"
                >
                  <div className="grid grid-cols-1 rounded-[2rem] p-2 shadow-md shadow-black/5">
                    <div className="rounded-3xl bg-white p-10 pb-9 shadow-2xl ring-1 ring-black/5">
                      <Eyebrow>
                        {tier.name} <span className="sr-only">plan</span>
                      </Eyebrow>
                      <p className="mt-2 text-pretty text-md text-gray-600">{tier.description}</p>
                      {/* <div className="mt-8 flex items-center gap-4">
                        <div className="text-5xl font-semibold text-gray-950">{tier.priceMonthly}</div>
                        <div className="text-sm text-gray-600">
                          <p>USD</p>
                          <p>per month</p>
                        </div>
                      </div> */}
                      <div className="mt-8">
                        <Button
                          href={tier.href}
                          variant="primary"
                          aria-label={`Contact us to discuss the ${tier.name} plan`}
                        >
                          Contact Us
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="mx-auto max-w-2xl px-6 pt-16 sm:pt-24 lg:max-w-7xl lg:px-8">
          <table className="w-full text-left max-sm:hidden">
            <caption className="sr-only">Pricing plan comparison</caption>
            <colgroup>
              <col className="w-2/5" />
              <col className="w-1/5" />
              <col className="w-1/5" />
              <col className="w-1/5" />
            </colgroup>
            <thead>
              <tr>
                <td className="p-0" />
                {tiers.map((tier) => (
                  <th key={tier.name} scope="col" className="p-0">
                    <Eyebrow>
                      {tier.name}
                    </Eyebrow>
                  </th>
                ))}
              </tr>
            </thead>
            {sections.map((section) => (
              <tbody key={section.name} className="group">
                <tr>
                  <th scope="colgroup" colSpan={4} className="px-0 pb-0 pt-10 group-first-of-type:pt-5">
                    <div className="-mx-4 rounded-lg bg-gray-50 px-4 py-3 text-sm/6 font-semibold text-gray-950">
                      {section.name}
                    </div>
                  </th>
                </tr>
                {section.features.map((feature) => (
                  <tr key={feature.name} className="border-b border-gray-100 last:border-none">
                    <th scope="row" className="px-0 py-4 text-sm/6 font-normal text-gray-600">
                      {feature.name}
                    </th>
                    {tiers.map((tier) => (
                      <td key={tier.name} className="p-4 max-sm:text-center">
                        {typeof feature.tiers[tier.name as keyof typeof feature.tiers] === 'string' ? (
                          <>
                            <span className="sr-only">{tier.name} includes:</span>
                            {feature.tiers[tier.name as keyof typeof feature.tiers] === '$' ? (
                              <CurrencyDollarIcon aria-hidden="true" className="inline-block size-4 text-gray-600" />
                            ) : (
                              <span className="text-sm/6 text-gray-600">{feature.tiers[tier.name as keyof typeof feature.tiers]}</span>
                            )}
                          </>
                        ) : (
                          <>
                            {feature.tiers[tier.name as keyof typeof feature.tiers] === true ? (
                              <CheckIcon aria-hidden="true" className="inline-block size-4 fill-green-600" />
                            ) : (
                              <MinusIcon aria-hidden="true" className="inline-block size-4 fill-gray-400" />
                            )}

                            <span className="sr-only">
                              {feature.tiers[tier.name as keyof typeof feature.tiers] === true
                                ? `Included in ${tier.name}`
                                : `Not included in ${tier.name}`}
                            </span>
                          </>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            ))}
          </table>
          <TabGroup className="sm:hidden">
            <TabList className="flex">
              {tiers.map((tier) => (
                <Tab
                  key={tier.name}
                  className="w-1/3 border-b border-gray-100 py-4 text-base/8 font-medium text-[var(--primary-blue)] data-[selected]:border-[var(--primary-blue)] [&:not([data-focus])]:focus:outline-none"
                >
                  {tier.name}
                </Tab>
              ))}
            </TabList>
            <TabPanels as={Fragment}>
              {tiers.map((tier) => (
                <TabPanel key={tier.name}>
                  <a
                    href={tier.href}
                    className="mt-8 block rounded-md bg-white px-3.5 py-2.5 text-center text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                  >
                    Get started
                  </a>
                  {sections.map((section) => (
                    <Fragment key={section.name}>
                      <div className="-mx-6 mt-10 rounded-lg bg-gray-50 px-6 py-3 text-sm/6 font-semibold text-gray-950 group-first-of-type:mt-5">
                        {section.name}
                      </div>
                      <dl>
                        {section.features.map((feature) => (
                          <div
                            key={feature.name}
                            className="grid grid-cols-2 border-b border-gray-100 py-4 last:border-none"
                          >
                            <dt className="text-sm/6 font-normal text-gray-600">{feature.name}</dt>
                            <dd className="text-center">
                              {typeof feature.tiers[tier.name as keyof typeof feature.tiers] === 'string' ? (
                                <span className="text-sm/6 text-gray-950">{feature.tiers[tier.name as keyof typeof feature.tiers]}</span>
                              ) : (
                                <>
                                  {feature.tiers[tier.name as keyof typeof feature.tiers] === true ? (
                                    <CheckIcon aria-hidden="true" className="inline-block size-4 fill-green-600" />
                                  ) : (
                                    <MinusIcon aria-hidden="true" className="inline-block size-4 fill-gray-400" />
                                  )}

                                  <span className="sr-only">{feature.tiers[tier.name as keyof typeof feature.tiers] === true ? 'Yes' : 'No'}</span>
                                </>
                              )}
                            </dd>
                          </div>
                        ))}
                      </dl>
                    </Fragment>
                  ))}
                </TabPanel>
              ))}
            </TabPanels>
          </TabGroup>
        </div>
      </div>
    </>
  )
}
