import { DefaultHeaderSection } from "@/components/headerSection";
import { HeaderStyle as HeaderStyleType } from "@/sanity/types/sanity.types";

export default function ThankYouPage(
    props: {
        header: string,
        message: string
    }
) {
    const ThankYouPageHeader: HeaderStyleType = {
        _type: "headerStyle",
        header: props.header,
        subheader: props.message,
        layout: "left-aligned",
    }

    return (
        <div>
            <DefaultHeaderSection header={ThankYouPageHeader} />
        </div>
    )
}