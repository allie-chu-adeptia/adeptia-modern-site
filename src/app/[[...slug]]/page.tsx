import { notFound } from 'next/navigation'
import { getPage } from '@/sanity/queries/page'
import type { Page, TextSection } from '@/sanity/types/sanity.types'
import { ExpandedBentoSection, BentoSectionComponent } from '@/components/bentoSection'
import { ExpandedLogoSection, LogoSectionComponent } from '@/components/logoSection'
import { StatSectionComponent } from '@/components/statSection'
import { FaqComponent } from '@/components/faq'
import { ExpandedCtaSection, CtaSectionComponent } from '@/components/ctaSection'
import { HeaderSectionComponent } from '@/components/headerSection'
import { ExpandedContentSection, ContentSectionComponent } from '@/components/contentSection'
import { RelatedResourceSection } from '@/components/relatedResourceSection'
import TextSectionComponent from '@/components/textSection'
import { 
    Faq, 
    HeaderSection, 
    StatSection, 
    BackgroundStyle
} from "@/sanity/types/sanity.types";
import { ExpandedCategory, ExpandedPage, ExpandedPost } from "@/sanity/types/local.types";
import { BackgroundColor } from '@/lib/backgroundColorWrapper'
import { Container } from '@/components/container'
import { getPagePath } from '@/lib/buildPagePath'

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
                    {block._type === 'relatedResource' && (
                        <Container className="py-8 sm:py-16 lg:py-24">
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
                            <Container className="py-8 sm:py-16 lg:py-24">
                                <StatSectionComponent statSection={block as StatSection} />
                            </Container>
                        </BackgroundColor>
                    )}
                    {block._type === 'textSection' && (
                        <Container className="py-8 sm:py-16 lg:py-24">
                            <TextSectionComponent textSection={block as TextSection} />
                        </Container>
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