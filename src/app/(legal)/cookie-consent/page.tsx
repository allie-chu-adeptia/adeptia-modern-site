import { Container } from "@/components/container"
import { HeaderStyle, HeaderStyleProps } from "@/lib/headerStyle"
import { PortableTextBlock } from "@portabletext/react"
import StylePortableText from "@/components/stylePortableText"
import { getCompanyCookieConsent } from "@/sanity/queries/company"
import type { Metadata } from 'next'
import { Heading } from "@/components/text"

// Define the type for cookie data
type CookieData = {
    id: string;
    domain: string;
    duration: string;
    description: string;
    category?: string;
}

// Cookie data array
const cookieData: CookieData[] = [
    {
        id: "_cfuvid",
        domain: ".zoominfo.com",
        duration: "session",
        description: "Calendly sets this cookie to track users across sessions to optimize user experience by maintaining session consistency and providing personalized services",
        category: "Necessary"
    },
    {
        id: "cookieyes-consent",
        domain: "www.adeptia.com",
        duration: "1 year",
        description: "CookieYes sets this cookie to remember users' consent preferences so that their preferences are respected on subsequent visits to this site. It does not collect or store any personal information about the site visitors.",
        category: "Necessary"
    },
    {
        id: "li_gc",
        domain: ".linkedin.com",
        duration: "6 months",
        description: "Linkedin set this cookie for storing visitor's consent regarding using cookies for non-essential purposes.",
        category: "Functional"
    },
    {
        id: "lidc",
        domain: ".linkedin.com",
        duration: "1 day",
        description: "LinkedIn sets the lidc cookie to facilitate data center selection.",
        category: "Functional"
    },
    {
        id: "CLID",
        domain: "www.clarity.ms",
        duration: "1 year",
        description: "Microsoft Clarity set this cookie to store information about how visitors interact with the website. The cookie helps to provide an analysis report. The data collection includes the number of visitors, where they visit the website, and the pages visited.",
        category: "Analytics"
    },
    {
        id: "_gd_visitor",
        domain: "www.adeptia.com",
        duration: "1 year 1 month 4 days",
        description: "This cookie is used for collecting information on the users visit such as number of visits, average time spent on the website and the pages loaded for displaying targeted ads.",
        category: "Analytics"
    },
    {
        id: "_gd_session",
        domain: "www.adeptia.com",
        duration: "4 hours",
        description: "This cookie is used for collecting information on users visit to the website. It collects data such as total number of visits, average time spent on the website and the pages loaded.",
        category: "Analytics"
    },
    {
        id: "SM",
        domain: "c.clarity.ms",
        duration: "session",
        description: "Microsoft Clarity cookie set this cookie for synchronizing the MUID across Microsoft domains.",
        category: "Analytics"
    },
    {
        id: "MR",
        domain: ".c.bing.com",
        duration: "7 days",
        description: "This cookie, set by Bing, is used to collect user information for analytics purposes.",
        category: "Analytics"
    },
    {
        id: "_clck",
        domain: ".adeptia.com",
        duration: "1 year",
        description: "Microsoft Clarity sets this cookie to retain the browser's Clarity User ID and settings exclusive to that website. This guarantees that actions taken during subsequent visits to the same website will be linked to the same user ID.",
        category: "Analytics"
    },
    {
        id: "_clsk",
        domain: ".adeptia.com",
        duration: "1 day",
        description: "Microsoft Clarity sets this cookie to store and consolidate a user's pageviews into a single session recording.",
        category: "Analytics"
    },
    {
        id: "_gcl_au",
        domain: ".adeptia.com",
        duration: "3 months",
        description: "Google Tag Manager sets the cookie to experiment advertisement efficiency of websites using their services.",
        category: "Analytics"
    },
    {
        id: "_ga",
        domain: ".adeptia.com",
        duration: "1 year 1 month 4 days",
        description: "Google Analytics sets this cookie to calculate visitor, session and campaign data and track site usage for the site's analytics report. The cookie stores information anonymously and assigns a randomly generated number to recognise unique visitors.",
        category: "Analytics"
    },
    {
        id: "_gid",
        domain: ".adeptia.com",
        duration: "1 day",
        description: "Google Analytics sets this cookie to store information on how visitors use a website while also creating an analytics report of the website's performance. Some of the collected data includes the number of visitors, their source, and the pages they visit anonymously.",
        category: "Analytics"
    },
    {
        id: "_gat_UA-*",
        domain: ".adeptia.com",
        duration: "1 minute",
        description: "Google Analytics sets this cookie for user behaviour tracking.",
        category: "Analytics"
    },
    {
        id: "_ga_*",
        domain: ".adeptia.com",
        duration: "1 year 1 month 4 days",
        description: "Google Analytics sets this cookie to store and count page views.",
        category: "Analytics"
    },
    {
        id: "SRM_B",
        domain: ".c.bing.com",
        duration: "1 year 24 days",
        description: "Used by Microsoft Advertising as a unique ID for visitors.",
        category: "Performance"
    },
    {
        id: "_uetsid",
        domain: ".adeptia.com",
        duration: "1 day",
        description: "Bing Ads sets this cookie to engage with a user that has previously visited the website.",
        category: "Performance"
    },
    {
        id: "_uetvid",
        domain: ".adeptia.com",
        duration: "1 year 24 days",
        description: "Bing Ads sets this cookie to engage with a user that has previously visited the website.",
        category: "Performance"
    },
    {
        id: "MUID",
        domain: ".clarity.ms",
        duration: "1 year 24 days",
        description: "Bing sets this cookie to recognise unique web browsers visiting Microsoft sites. This cookie is used for advertising, site analytics, and other operations.",
        category: "Advertisement"
    },
    {
        id: "bcookie",
        domain: ".linkedin.com",
        duration: "1 year",
        description: "LinkedIn sets this cookie from LinkedIn share buttons and ad tags to recognize browser IDs.",
        category: "Advertisement"
    },
    {
        id: "receive-cookie-deprecation",
        domain: ".adnxs.com",
        duration: "3 months",
        description: "Google sets this cookie to enable Privacy Sandbox testing and preview how site behaviour and functionality work without third-party cookies.",
        category: "Advertisement"
    },
    {
        id: "ANONCHK",
        domain: ".c.clarity.ms",
        duration: "10 minutes",
        description: "The ANONCHK cookie, set by Bing, is used to store a user's session ID and verify ads' clicks on the Bing search engine. The cookie helps in reporting and personalization as well.",
        category: "Advertisement"
    },
    {
        id: "test_cookie",
        domain: ".doubleclick.net",
        duration: "15 minutes",
        description: "doubleclick.net sets this cookie to determine if the user's browser supports cookies.",
        category: "Advertisement"
    },
    {
        id: "_an_uid",
        domain: "www.adeptia.com",
        duration: "7 days",
        description: "No description available.",
        category: "Uncategorized"
    },
    {
        id: "_zitok",
        domain: "www.adeptia.com",
        duration: "1 year",
        description: "No description available.",
        category: "Uncategorized"
    },
    {
        id: "MSPTC",
        domain: ".bing.com",
        duration: "1 year 24 days",
        description: "No description available.",
        category: "Uncategorized"
    }
];

const header: HeaderStyleProps = {
    header: {
        header: "Cookie Consent",
        layout: 'centered'
    }
}

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: "Adeptia | Cookie Consent",
        description: "Cookie Consent for Adeptia",
        alternates: {
            canonical: "https://www.adeptia.com/cookie-consent",
        },
        robots: {
            index: true,
            follow: true,
        },
        openGraph: {
            title: "Cookie Consent",
            description: "Cookie Consent for Adeptia",
        }
    }
}

export default async function CookieConsent() {
    const cookieConsent = await getCompanyCookieConsent()
    return (
        <Container>
            <div className="bg-white py-16 md:py-24 lg:py-32">
                <HeaderStyle header={header.header} />
                <div className="mx-auto mt-10 max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-3xl text-base/7 text-gray-700">
                        <StylePortableText value={cookieConsent.cookieConsent as PortableTextBlock[]} />
                        <div className="mt-10">
                            <Heading as="h3">Types of Cookies We Use</Heading>
                            <div className="mt-6 overflow-x-auto">
                                <table className="table-fixed">
                                    <thead>
                                        <tr>
                                            <th className="w-1/6 text-left">Cookie ID</th>
                                            <th className="w-1/6 text-left">Domain</th>
                                            <th className="w-1/6 text-left">Duration</th>
                                            <th className="w-1/6 text-left">Category</th>
                                            <th className="w-2/6 text-left">Description</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200">
                                        {cookieData.map((cookie) => (
                                            <tr key={cookie.id}>
                                                <td className="w-1/6 py-4 pl-4 pr-3 text-sm font-medium text-gray-900">{cookie.id}</td>
                                                <td className="w-1/6 py-4 px-3 text-sm text-gray-500">{cookie.domain}</td>
                                                <td className="w-1/6 py-4 px-3 text-sm text-gray-500">{cookie.duration}</td>
                                                <td className="w-1/6 py-4 px-3 text-sm text-gray-500">{cookie.category || 'Uncategorized'}</td>
                                                <td className="w-2/6 py-4 px-3 text-sm text-gray-500">{cookie.description}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Container>  
    )
}