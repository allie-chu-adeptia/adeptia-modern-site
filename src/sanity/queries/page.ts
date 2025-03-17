import { defineQuery } from "next-sanity";
import { sanityFetch } from '../lib/client'

// Fetches a single page by its slug, including:
// - Basic page info (id, title, metadata)
// - Media (icon)
// - Classifications (tags, categories) 
// - Parent page reference with its parent
// - All blocks with resolved references
const PAGE_QUERY = defineQuery(/* groq */ `*[
  _type == "page"
  && metadata.slug.current == $slug
][0]{
    _id,
    title,
    metadata,
    icon,
    category[]->{
      _id,
      name,
      "slug": slug.current
    },
    "parent": parent->{
        _id,
        "link": metadata.slug.current,
        parent->
    },
    "block": block[]{ 
      _type == "bentoSection" => {
        _type,
        header,
        styleAndLayout {
            layout,
            background
        },
        content[] {
          image {
              asset->,
              "altText": asset->title,
              hotspot,
              crop
          },
          eyebrow,
          header,
          text,
          "link": link->metadata.slug.current
        }
      },
      _type == "logoSection" => {
        _type,
        logo[] {
          asset->,
          "altText": asset->title,
          _type
        }
      },
      _type == "faq" => {
        _type,
        header,
        displayStyle,
        content[] {
          question,
          answer
        }
      },
      _type == "statSection" => {
        _type,
        header,
        background,
        stats[] {
          statName,
          leadingUnit,
          statValue,
          trailingUnit
        }
      },
      _type == "ctaSection" => {
        _type,
        cta[]-> {
          _type,
          _id,
          header,
          buttonText,
          displayStyle,
          "link": pageReference->metadata.slug.current
        },
      },
      _type == "headerSection" => {
        _type,
        header,
        background,
        cta[]-> {
          _type,
          _id,
          header,
          campaignTitle,
          buttonText,
          displayStyle,
          "link": pageReference->metadata.slug.current
        },
        content[] {
          icon {
            asset->,
            hotspot,
            crop,
            _type
          },
          title,
          subhead
        }
      },
      _type == "contentSection" => {
        _type,
        header,
        content[] {
          ...,
          markDefs[]{
            ...,
            _type == "internalLink" => {
              ...,
              "reference": reference->
            }
          }
        },
        imageSize,
        image {
          asset->,
          "altText": asset->title,
          hotspot,
          crop
        },
        animation,
        button {
          _id,
          title,
          url,
          "link": link->metadata.slug.current
        },
        styleAndLayout {
          layout,
          background,
          spacing
        },
        subPoints[] {
          icon,
          header,
          subheader,
          button {
            _id,
            title,
            url,
            "link": link->metadata.slug.current
          }
        }
      },
      _type == "textSection" => {
        _type,
        header,
        text[] {
          ...,
          markDefs[]{
            ...,
            _type == "internalLink" => {
              ...,
              "reference": reference->
            }
          }
        }
      },
      _type == "relatedResource" => {
        _type,
        type,
        resourceTypes,
        resource[] -> {
          _type,
          type,
          title,
          publishDate,
          excerpt,
          "featuredImage": featuredImage{
            ...,
            "altText": asset->title,
          },
          "slug": metadata.slug.current
        },
      },
      _type == "testimonialSection" => {
        _type,
        layout,
        testimonial -> {
          _type,
          name,
          title,
          quote,
          picture {
            asset->,
          },
          companyLogo {
            asset->,
          }
        }
      },
      _type == "contentSectionCarousel" => {
        _type,
        header,
        carouselItems[] {
          header,
        image {
          asset->,
          "altText": asset->title,
          hotspot,
          crop
        },
        body,
        button {
          _id,
          title,
          url,
          "link": link->metadata.slug.current
        },
        styleAndLayout {
          layout,
          background,
        },
        subPoints[] {
          icon,
          header,
          subheader,
          button {
            _id,
            title,
            url,
              "link": link->metadata.slug.current
            }
          }
        }
      },
      _type == "careerSection" => {
        _type,
        header,
        button,
        careers
      },
      _type == "teamMemberSection" => {
        _type,
        header,
        teamMembers[] -> {
          _id,
          name,
          title,
          "profilePic": profilePic.asset->url,
          linkedIn,
          slug
        }
      },
      _type == "calloutSection" => {
        _type,
        header,
        background,
        calloutPoint[] {
          calloutHeader,
          calloutBody
        }
      }
    }
}`)

const RELATED_RESOURCES_QUERY = defineQuery(/* groq */ `*[
  _type == "resource" && 
  (count($resourceTypes) == 0 || type in $resourceTypes) &&
  $category in category[]->slug.current &&
  _id != $currentPageId
] | order(publishDate desc)[0...3] {
  _type,
  type,
  publishDate,
  title,
  excerpt,
  "featuredImage": featuredImage{
    ...,
    "altText": asset->title,
  },
  "slug": metadata.slug.current,
}`)

export async function getRelatedResources(category: string, currentPageId: string, resourceTypes: string[]) {
  const result = await sanityFetch({
    query: RELATED_RESOURCES_QUERY,
    params: {
      category,
      currentPageId,
      resourceTypes
    }
  });
  return result;
}

const FALLBACK_RESOURCES_QUERY = defineQuery(/* groq */ `*[
  _type == "resource"
  && (count($resourceTypes) == 0 || type in $resourceTypes)
] | order(publishDate desc)[0...3] {
  _type,
  type,
  publishDate,
  title,
  excerpt,
  "featuredImage": featuredImage{
    ...,
    "altText": asset->title,
  },
  "slug": metadata.slug.current,
}`)

export async function getFallbackResources(resourceTypes: string[]) {
  return await sanityFetch({
    query: FALLBACK_RESOURCES_QUERY,
    params: { resourceTypes }
  })
}

// Fetches a single page by its slug, including:
export async function getPage(slug: string) {
  return await sanityFetch({
    query: PAGE_QUERY,
    params: { slug }
  })
}

// Fetches a leaf page (one with no children) by its slug
// Returns basic page info and parent hierarchy
// Used for generating paths/breadcrumbs
const PATH_QUERY = defineQuery(/* groq */ `*[
  _type == "page"
  && metadata.slug.current == $lastSlug
  && count(
    *[_type == "page" && parent._ref == ^._id]
  ) == 0
][0]{
  _id,
  title,
  metadata,
  parent->{
    _id,
    metadata,
    parent->
  },
}`)

export async function getPath(lastSlug: string) {
  return await sanityFetch({
    query: PATH_QUERY,
    params: { lastSlug }
  })
}