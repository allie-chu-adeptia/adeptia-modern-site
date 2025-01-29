import { defineQuery } from "next-sanity";
import { sanityFetch } from '../client'
import { Page } from "../types/sanity.types";
import {
    // BENTO_QUERY,
    CASE_STUDY_QUERY,
    CONTENT_SECTION_QUERY,
    CTA_QUERY,
    FAQ_QUERY,
    HEADER_QUERY,
    LOGO_CLUSTER_QUERY,
    PRICING_QUERY,
    RELATED_CONNECTOR_QUERY,
    RELATED_RESOURCE_QUERY,
    STAT_QUERY,
    TESTIMONIAL_QUERY
} from './blocks'



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
    tag,
    category,
    "parent": parent->{
        _id,
        metadata,
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
              altText,
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
          altText,
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
        header,
        cta[]-> {
          _type,
          _id,
          campaignTitle,
          buttonText,
          displayStyle,
          "link": pageReference->metadata.slug.current
        },
        image {
          asset->,
          altText,
        }
      },
      _type == "headerSection" => {
        _type,
        header,
        background,
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
        image {
          asset->,
          altText,
          hotspot,
          crop
        },
        body,
        button {
          _id,
          title,
          url,
          "link": pageReference->metadata.slug.current
        },
        styleAndLayout {
          layout,
          background
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
    }
}`)

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