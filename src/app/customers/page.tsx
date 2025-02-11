import { Aggregator } from "@/aggregators/aggregator";
import { Container } from "@/components/container";
import { HeaderSectionComponent } from "@/components/headerSection";
import { getCustomersCount, getCustomers } from "@/sanity/queries/customer";
import { HeaderSection, HeaderStyle as HeaderStyleType } from "@/sanity/types/sanity.types"


const CustomersHeader: HeaderStyleType = {
    _type: "headerStyle",
    header: "Customers",
    subheader: "Our customers are our partners",
    layout: "left-aligned"
}

const CustomersHeaderSection: HeaderSection = {
    _type: "headerSection",
    header: CustomersHeader
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
        <Container>
            <div className="py-24">
                <HeaderSectionComponent headerSection={CustomersHeaderSection} />
                <Aggregator
                    getItems={getCustomers}
                    getItemsCount={getCustomersCount}
                    itemsPerPage={itemsPerPage}
                    currPage={page}
                    pathName={"customers"}
                />
            </div>
        </Container>
    )
}