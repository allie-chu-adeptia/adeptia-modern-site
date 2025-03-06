import { Aggregator } from "@/aggregators/aggregator";
import { Container } from "@/components/container";
import { DefaultHeaderSection } from "@/components/headerSection";
import { getCustomersCount, getCustomers } from "@/sanity/queries/customer";
import { HeaderStyle as HeaderStyleType } from "@/sanity/types/sanity.types"
import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Customer Stories on B2B Integration Success',
    description:
        'Download free case studies below to get innovative ideas on data integration, application integration, B2B integration, and more.',
    alternates: {
        canonical: 'https://www.adeptia.com/customers',
    },
}

const CustomersHeader: HeaderStyleType = {
    _type: "headerStyle",
    header: "Customer Stories",
    subheader: "Learn how Adeptia has helped our customers make big changes in their data integration strategy.",
    layout: "left-aligned"
}

export default async function CustomerPage(
    props: {
        searchParams: Promise<{ [key: string]: string | string[] | undefined }>
    }
) {
    const searchParams = await props.searchParams;
    const page = Number(searchParams.page) || 1
    const itemsPerPage = 20

    return (
        <>
            <DefaultHeaderSection header={CustomersHeader} />
            <Container paddingLvl="md">
                <Aggregator
                    getItems={getCustomers}
                    getItemsCount={getCustomersCount}
                    itemsPerPage={itemsPerPage}
                    currPage={page}
                    pathName={"customers"}
                />
            </Container>
        </>
    )
}