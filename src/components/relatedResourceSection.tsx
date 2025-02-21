import { HeaderStyle as HeaderStyleType } from "@/sanity/types/sanity.types"
import { HeaderStyle } from "@/lib/headerStyle"
import { ExpandedCategory, ExpandedPost } from "@/sanity/types/local.types"
import { RenderItem } from "@/aggregators/renderItem"
import cleanString from "@/lib/cleanString"
import { getFallbackResources, getRelatedResources } from "@/sanity/queries/page"
import { getTypeSlug } from "@/aggregators/renderItem"

const RelatedResourcesHeader: HeaderStyleType = {
    _type: "headerStyle",
    eyebrow: "Resources",
    header: "Related Resources",
    layout: "left-aligned"
}

export async function RelatedResourceSection({
    type,
    resourceTypes,
    resources,
    pageCategory,
    pageID
}: {
    type: string,
    resourceTypes: string[],
    resources: ExpandedPost[],
    pageCategory: ExpandedCategory[],
    pageID: string
}) {
    console.log("Resource Information -------------------------------")
    console.log(type)
    console.log(resourceTypes)
    console.log(resources)
    console.log(pageCategory)
    console.log(pageID)
    console.log("-----------------------------------------------------")
    let displayResources = resources;

    if (cleanString(type) === 'latest') {
        let relatedResources;
        if (pageCategory && pageCategory[0] && pageCategory[0].name) {
            relatedResources = await getRelatedResources(pageCategory[0].slug || '', pageID, resourceTypes);
            if (relatedResources.length != 3) {
                relatedResources = await getFallbackResources(resourceTypes);
            }
        } else {
            relatedResources = await getFallbackResources(resourceTypes);
        }

        displayResources = relatedResources;
    }

    displayResources.map((resource: ExpandedPost) => {
        resource.pathName = resource.type != 'News' && resource.type != 'Blog' ? `resources/${getTypeSlug(resource.type as string)}` : `${resource.type?.toLowerCase()}`
    });
    
    console.log(displayResources)

    return (
        <div>
            <HeaderStyle header={RelatedResourcesHeader} className="mb-12"/>
            <RenderItem items={displayResources} />
        </div>
    )
}