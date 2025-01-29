import { notFound } from 'next/navigation'
import { getPage } from '@/sanity/queries/page'
import type { Page } from '@/sanity/types/sanity.types'
import { ExpandedBentoSection, BentoSectionComponent } from '@/components/bentoSection'
import { ExpandedLogoSection, LogoSectionComponent } from '@/components/logoSection'
import { StatSectionComponent } from '@/components/statSection'
import { FaqComponent } from '@/components/faq'
import { ExpandedCtaSection, CtaSectionComponent } from '@/components/ctaSection'
import { HeaderSectionComponent } from '@/components/headerSection'
import { ExpandedContentSection, ContentSectionComponent } from '@/components/contentSection'
import { 
    Faq, 
    HeaderSection, 
    StatSection, 
    BackgroundStyle
} from "@/sanity/types/sanity.types";
import { BackgroundColor } from '@/lib/backgroundColorWrapper'
import { Container } from '@/components/container'



// Recursively builds an array of slugs representing the path from root to current page
async function getPagePath(page: Page): Promise<string[]> {
    console.log('Starting getPagePath for page:', page._id)

    // If page has no parent, it's a root level page
    if (!page.parent) {
        console.log('No parent found for page:', page._id)
        // If page has a slug, return it as single item array
        if (page.metadata?.slug?.current) {
            console.log('Returning root level slug:', page.metadata.slug.current)
            return [page.metadata.slug.current]
        } else {
            // Log error if page is missing required slug
            console.error('Page has no slug:', page._id)
            return []
        }
    }

    console.log('Fetching parent page with ID:', page.parent._ref)
    // Fetch the parent page document using its reference ID
    const parent = await getPage(page.parent._ref)
    
    // If parent fetch fails, treat current page as root
    if (!parent) {
        console.log('Parent fetch failed for ID:', page.parent._ref)
        // Return current page slug if it exists
        if (page.metadata?.slug?.current) {
            console.log('Returning current page slug as root:', page.metadata.slug.current)
            return [page.metadata.slug.current]
        } else {
            // Log error if parent page is missing slug
            console.error('Parent page has no slug:', page._id)
            return []
        }
    }

    console.log('Recursively getting path for parent:', parent._id)
    // Recursively get path array from parent
    const parentPath = await getPagePath(parent)
    
    if (!page.metadata?.slug?.current) {
        console.error('Page has no slug:', page._id)
        console.log('Returning parent path:', parentPath)
        return parentPath
    }

    const fullPath = [...parentPath, page.metadata.slug.current]
    console.log('Returning full path:', fullPath)
    return fullPath
}

function PageContent({ page }: { page: Page }) {
    const lightBackground: BackgroundStyle = {
        _type: 'backgroundStyle',
        style: 'light'
    }
    
    return (
        <main className="overflow-hidden">             
            {page.block?.map((block, index) => (
                <div 
                    key={index}
                >
                    {block._type === 'bentoSection' && (
                        <BackgroundColor color={block.styleAndLayout?.background ?? lightBackground}>
                            <Container className="py-8 sm:py-16 lg:py-24">
                                <BentoSectionComponent bentoSection={block as ExpandedBentoSection} />
                            </Container>
                        </BackgroundColor>
                    )}
                    {/* block._type === 'caseStudy' && (
                        // TODO: Implement CaseStudy component
                        null
                    ) */}
                    {block._type === 'contentSection' && (
                        console.log("displaying content section"),
                        console.log(block),
                        <BackgroundColor color={block.styleAndLayout?.background ?? lightBackground}>
                            <Container className="py-8 sm:py-16 lg:py-24">
                                <ContentSectionComponent contentSection={block as ExpandedContentSection} />
                            </Container>
                        </BackgroundColor>
                    )}
                    {block._type === 'ctaSection' && (
                        <Container className="py-8 sm:py-16 lg:py-24">
                            <CtaSectionComponent ctaSection={block as ExpandedCtaSection} />
                        </Container>
                    )}
                    {block._type === 'faq' && (
                        <Container className="py-8 sm:py-16 lg:py-24">  
                            <FaqComponent faq={block as Faq}/>
                        </Container>
                    )}
                    {block._type === 'headerSection' && (
                        <BackgroundColor color={block.background ?? lightBackground}>
                            <Container className="py-8 sm:py-16 lg:py-24">
                                <HeaderSectionComponent headerSection={block as HeaderSection} />
                            </Container>
                        </BackgroundColor>
                    )}
                    {block._type === 'logoSection' && (
                        <Container className="py-8 sm:py-16 lg:py-24">
                            <LogoSectionComponent logoSection={block as ExpandedLogoSection} />
                        </Container>
                    )}
                    {/* block._type === 'relatedConnector' && (
                        // TODO: Implement RelatedConnector component
                        null
                    ) */}
                    {/* block._type === 'relatedResource' && (
                        // TODO: Implement RelatedResource component
                        null
                    ) */}
                    {block._type === 'statSection' && (
                        <BackgroundColor color={block.background ?? lightBackground}>
                            <Container className="py-8 sm:py-16 lg:py-24">
                                <StatSectionComponent statSection={block as StatSection} />
                            </Container>
                        </BackgroundColor>
                    )}
                    {/* block._type === 'reference' && block._ref && block._ref.startsWith('testimonial') && (
                        // TODO: Implement Testimonial component
                        null
                    ) */}
                </div>
            ))}
        </main>
    )
}

export default async function Page(props: { params: Promise<{ slug?: string[] }> }) {
    const params = await props.params;

    if (!params.slug) {
        const homePage = await getPage('home')
        if (!homePage) {
            return notFound()
        }
        return <PageContent page={homePage} />
    }

    const lastSlug = params.slug[params.slug.length - 1]
    const page = await getPage(lastSlug)

    if (!page) {
        return notFound()
    }

    const actualPath = await getPagePath(page)
    const requestedPath = params.slug.join('/')

    if (actualPath.join('/') !== requestedPath) {
        return notFound()
    }

    return <PageContent page={page} />
}