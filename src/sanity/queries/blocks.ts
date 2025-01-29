import { defineQuery } from "next-sanity";
// import { 
//     BentoSection, 
//     CaseStudy, 
//     ContentSection, 
//     CtaSection, 
//     Faq, 
//     HeaderSection, 
//     LogoSection, 
//     Pricing, 
//     RelatedConnector, 
//     RelatedResource, 
//     StatSection, 
//     Testimonial 
// } from "../types/sanity.types";

// Fetches Bento Block data from Sanity
export const BENTO_QUERY = defineQuery(/* groq */ `*[
  _type == "page" 
  && metadata.slug.current == $slug
].block[_type == "bentoSection"][] {
    _type,
    header {
        eyebrow,
        header,
        subheader
    },
    styleAndLayout {
        layout,
        background
    },
    content[] {
        image {
            asset->,
            altText,
            hotspot,
            crop
        },
        eyebrow,
        header,
        text,
        link-> {
            _id,
            metadata {
                slug {
                    current
                }
            }
        }
    }
}`)

// Fetches Case Study data
export const CASE_STUDY_QUERY = defineQuery(/* groq */ `{
    ...,
    customer[]-> {
        _id,
        title,
        logo
    }
}`)

// Fetches content section data
export const CONTENT_SECTION_QUERY = defineQuery(/* groq */ `{
    ..., 
}`)

// Fetches CTA section data
export const CTA_QUERY = defineQuery(/* groq */ `{
    ...,
    cta[]-> {
        _id,
        campaignTitle,
        buttonText,
        pageReference-> {
            metadata {
                slug
            }
        }
    }
}`)

// Fetches FAQ section data
export const FAQ_QUERY = defineQuery(/* groq */ `{
    ...,
}`)

// Fetched header section data
export const HEADER_QUERY = defineQuery(/* groq */ `{
    ...,
}`)

// Fetches Logo cluster data
export const LOGO_CLUSTER_QUERY = defineQuery(/* groq */ `{
    logo[] {
        asset->,
        altText,
        _type
    }
}`)

// Fetches Pricing Block data
export const PRICING_QUERY = defineQuery(/* groq */ `{
    ...,
    productPricing[]-> {
        _id,
        name,
        button,
        description,
        content[]-> {
            header,
            subheader,
            icon
        }
    }
}`)

// Fetched related connector block data
export const RELATED_CONNECTOR_QUERY = defineQuery(/* groq */ `{
    ...,
    connector[]-> {
        _id,
        name,
        logo,
        slug
    }
}`)

// Fetches resource block data
export const RELATED_RESOURCE_QUERY = defineQuery(/* groq */ `{
    ...,
    resource[]-> {
        _id,
        title,
        metadata {
            slug
        }
    }
}`)

// Fetches stats block data
export const STAT_QUERY = defineQuery(/* groq */ `{
    ...,
}`)

// Fetches testimonial block data
export const TESTIMONIAL_QUERY = defineQuery(/* groq */ `{
    ...,
}`)
