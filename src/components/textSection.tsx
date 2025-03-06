import { PortableTextBlock } from "@portabletext/react";
import StylePortableText from '@/components/stylePortableText'
import { TextSection } from '@/sanity/types/sanity.types'
import { HeaderStyle } from "@/lib/headerStyle";

export default function TextSectionComponent(props: { textSection: TextSection }) {

    return (
        <div>
            <HeaderStyle header={props.textSection.header} />
            <StylePortableText className="mt-10" value={props.textSection.text as PortableTextBlock[]} />
        </div>
    )
}
