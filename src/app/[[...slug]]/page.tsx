// Next.js imports
import { notFound } from 'next/navigation'

// Sanity types and queries
import { getPage } from '@/sanity/queries/page'
import type { Page, TextSection, Faq, StatSection, BackgroundStyle, ContentSectionCarousel } from '@/sanity/types/sanity.types'
import { ExpandedCategory, ExpandedPage, ExpandedPost } from "@/sanity/types/local.types"

// Components
import { Container } from '@/components/container'
import { FaqComponent } from '@/components/faq'
import TextSectionComponent from '@/components/textSection'
import { RelatedResourceSection } from '@/components/relatedResourceSection'
import { StatSectionComponent } from '@/components/statSection'
import { ContentSectionCarouselComponent } from '@/components/contentSectionCarousel'

// Section Components with their types
import { ExpandedBentoSection, BentoSectionComponent } from '@/components/bentoSection'
import { ExpandedLogoSection, LogoSectionComponent } from '@/components/logoSection'
import { ExpandedCtaSection, CtaSectionComponent } from '@/components/ctaSection'
import { ExpandedHeaderSection, HeaderSectionComponent } from '@/components/headerSection'
import { ExpandedContentSection, ContentSectionComponent } from '@/components/contentSection'
import { ExpandedTestimonialSection, TestimonialSectionComponent } from '@/components/testimonialSection'

// Utilities
import { BackgroundColor } from '@/lib/backgroundColorWrapper'
import { getPath } from '@/lib/routing'
import { BackgroundMotion } from '@/lib/backgroundMotion'

function PageContent({ page }: { page: ExpandedPage }) {
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
                            <Container paddingLvl="md">
                                <BentoSectionComponent bentoSection={block as ExpandedBentoSection} />
                            </Container>
                        </BackgroundColor>
                    )}
                    {/* block._type === 'caseStudy' && (
                        // TODO: Implement CaseStudy component
                        null
                    ) */}
                    {block._type === 'contentSection' && (
                        <BackgroundColor color={block.styleAndLayout?.background ?? lightBackground}>
                            <Container paddingLvl="md">
                                <ContentSectionComponent contentSection={block as ExpandedContentSection} />
                            </Container>
                        </BackgroundColor>
                    )}
                    {block._type === 'ctaSection' && (
                        <Container paddingLvl="md">
                            <CtaSectionComponent ctaSection={block as ExpandedCtaSection} />
                        </Container>
                    )}
                    {block._type === 'faq' && (
                        <Container className="py-8 sm:py-16 lg:py-24">
                            <FaqComponent faq={block as Faq} />
                        </Container>
                    )}
                    {block._type === 'headerSection' && (
                        <BackgroundColor color={block.background ?? lightBackground} className="relative overflow-hidden">
                            <div className="relative z-10">
                                <Container paddingLvl="md">
                                    <HeaderSectionComponent headerSection={block as ExpandedHeaderSection} />
                                </Container>
                            </div>
                            <BackgroundMotion color={block.background ?? lightBackground} />
                        </BackgroundColor>
                    )}
                    {block._type === 'logoSection' && (
                        <Container paddingLvl="sm">
                            <LogoSectionComponent logoSection={block as ExpandedLogoSection} />
                        </Container>
                    )}
                    {/* block._type === 'relatedConnector' && (
                        // TODO: Implement RelatedConnector component
                        null
                    ) */}
                    {block._type === 'relatedResource' && (
                        <Container paddingLvl="md">
                            <RelatedResourceSection
                                type={block.type ?? 'latest'}
                                resourceTypes={block.resourceTypes as string[]}
                                resources={block.resource as unknown as ExpandedPost[]}
                                pageCategory={page.category as ExpandedCategory[]}
                                pageID={page._id}
                            />
                        </Container>
                    )}
                    {block._type === 'statSection' && (
                        <BackgroundColor color={block.background ?? lightBackground}>
                            <Container paddingLvl="md">
                                <StatSectionComponent statSection={block as StatSection} />
                            </Container>
                        </BackgroundColor>
                    )}
                    {block._type === 'textSection' && (
                        <Container paddingLvl="md">
                            <TextSectionComponent textSection={block as TextSection} />
                        </Container>
                    )}
                    {block._type === 'testimonialSection' && (
                        <Container paddingLvl="md">
                            <TestimonialSectionComponent testimonialSection={block as ExpandedTestimonialSection} />
                        </Container>
                    )}
                    {block._type === 'contentSectionCarousel' && (
                        <Container paddingLvl="md">
                            <ContentSectionCarouselComponent contentSectionCarousel={block as ContentSectionCarousel    } />
                        </Container>
                    )}
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

    try {

        const actualPath = await getPath(lastSlug)
        if (!actualPath) {
            return notFound()
        }
        const requestedPath = params.slug.join('/')
        const computedPath = Array.isArray(actualPath) ? actualPath.join('/') : ''

        if (!computedPath || computedPath !== requestedPath) {
            return notFound()
        }
    } catch (err) {
        console.log({ err })
        return notFound()
    }

    return <PageContent page={page} />
}