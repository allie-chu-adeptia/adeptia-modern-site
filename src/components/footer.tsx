import { PlusGrid, PlusGridItem, PlusGridRow } from '@/components/plus-grid'
import { Container } from './container'
import { Gradient } from './gradient'
import { Link } from './link'
import { Logo } from './logo'

/* eslint prefer-const: 0 */

function SitemapHeading({ children, className }: { children: React.ReactNode, className?: string }) {
  return <h3 className={`text-sm/6 font-bold text-gray-800 ${className}`}>{children}</h3>
}

function SitemapLinks({ children }: { children: React.ReactNode }) {
  return <ul className="mt-4 space-y-4 text-sm/tight">{children}</ul>
}

function SitemapLink(props: React.ComponentPropsWithoutRef<typeof Link>) {
  return (
    <li>
      <Link
        {...props}
        className="font-medium text-gray-800 data-[hover]:text-gray-800/75"
      />
    </li>
  )
}

function Sitemap() {
  return (
    <>
      <div>
        <SitemapHeading>Platform</SitemapHeading>
        <SitemapLinks>
          <SitemapLink href="/products/how-it-works">How it Works</SitemapLink>
          <SitemapLink href="/products/why-adeptia-connect">Why Adeptia Connect</SitemapLink>
        </SitemapLinks>
        <SitemapHeading className="mt-8">Connection</SitemapHeading>
        <SitemapLinks>
          <SitemapLink href="/products/connect">Connect</SitemapLink>
          <SitemapLink href="/connectors">App Connectors</SitemapLink>
        </SitemapLinks>
        <SitemapHeading className="mt-8">Capabilities</SitemapHeading>
        <SitemapLinks>
          <SitemapLink href="/products/artificial-intelligence-mapping">AI Data Mapping</SitemapLink>
          <SitemapLink href="/products/pre-built-automations">Pre-Built Automations</SitemapLink>
          <SitemapLink href="/products/ai-business-rules">AI Business Rules</SitemapLink>
          <SitemapLink href="/products/idp">Intelligent Document Processing</SitemapLink>
          <SitemapLink href="/products/no-code-automation-builder">No-Code Automation Builder</SitemapLink>
          <SitemapLink href="/products/manage-and-monitor">Manage and Monitor</SitemapLink>
        </SitemapLinks>
      </div>
      <div>
        <SitemapHeading>Solutions by Industry</SitemapHeading>
        <SitemapLinks>
          <SitemapLink href="/solutions/industry/insurance-integration">Insurance</SitemapLink>
          <SitemapLink href="/solutions/industry/financial-data-integration">Financial Services</SitemapLink>
          <SitemapLink href="/solutions/industry/supply-chain-logistics">Manufacturing and Distribution</SitemapLink>
        </SitemapLinks>
        <SitemapHeading className="mt-8">Solutions by Capability</SitemapHeading>
        <SitemapLinks>
          <SitemapLink href="/products/idp">Intelligent Document Processing</SitemapLink>
          <SitemapLink href="/products/artificial-intelligence-mapping">AI Data Mapping</SitemapLink>
          <SitemapLink href="/products/no-code-automation-builder">No-Code Integrations and Automations</SitemapLink>
        </SitemapLinks>
      </div>
      <div>
        <SitemapHeading>Solutions by Initative</SitemapHeading>
        <SitemapLinks>
          <SitemapLink href="/solutions/by-initiative#id-digital-transformation">Digital Transformation</SitemapLink>
          <SitemapLink href="/solutions/by-initiative#id-business-process-automation">Business Process Automation</SitemapLink>
          <SitemapLink href="/solutions/by-initiative#id-ai-data-readiness">AI Data Readiness</SitemapLink>
        </SitemapLinks>
        <SitemapHeading className="mt-8">Solutions by Application</SitemapHeading>
        <SitemapLinks>
          <SitemapLink href="/connectors/sap-integration-accelerator">SAP</SitemapLink>
          <SitemapLink href="/connectors/salesforce-integration-accelerator">Salesforce</SitemapLink>
          <SitemapLink href="/connectors/netsuite-integration-accelerator">Netsuite</SitemapLink>
          <SitemapLink href="/connectors">See All Integrations</SitemapLink>
        </SitemapLinks>
      </div>
      <div>
        <SitemapHeading>Resources</SitemapHeading>
        <SitemapLinks>
          <SitemapLink href="/blog">Blog</SitemapLink>
          <SitemapLink href="/resources">Resources</SitemapLink>
          <SitemapLink href="/products/product-support">Product Support</SitemapLink>
          <SitemapLink href="https://docs.adeptia.com/home/en-us/">Product Documentation</SitemapLink>
        </SitemapLinks>
        <SitemapHeading className="mt-8">Company</SitemapHeading>
        <SitemapLinks>
          <SitemapLink href="/about">About Adeptia</SitemapLink>
          <SitemapLink href="/about#id-leadership">Leadership</SitemapLink>
          <SitemapLink href="/careers">Careers</SitemapLink>
          <SitemapLink href="/about/contact-us">Contact Us</SitemapLink>
          <SitemapLink href="/terms-of-service">Terms of service</SitemapLink>
          <SitemapLink href="/privacy-policy">Privacy policy</SitemapLink>
        </SitemapLinks>
      </div>
    </>
  )
}

function SocialIconLinkedIn(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" {...props}>
      <path d="M14.82 0H1.18A1.169 1.169 0 000 1.154v13.694A1.168 1.168 0 001.18 16h13.64A1.17 1.17 0 0016 14.845V1.15A1.171 1.171 0 0014.82 0zM4.744 13.64H2.369V5.996h2.375v7.644zm-1.18-8.684a1.377 1.377 0 11.52-.106 1.377 1.377 0 01-.527.103l.007.003zm10.075 8.683h-2.375V9.921c0-.885-.015-2.025-1.234-2.025-1.218 0-1.425.966-1.425 1.968v3.775H6.233V5.997H8.51v1.05h.032c.317-.601 1.09-1.235 2.246-1.235 2.405-.005 2.851 1.578 2.851 3.63v4.197z" />
    </svg>
  )
}

function SocialLinks() {
  return (
    <>
      <Link
        href="https://www.linkedin.com/company/adeptia/"
        target="_blank"
        rel="noopener"
        aria-label="Visit us on LinkedIn"
        className="text-gray-950 data-[hover]:text-gray-950/75"
      >
        <SocialIconLinkedIn className="size-4" />
      </Link>
    </>
  )
}

function Copyright() {
  return (
    <div className="text-sm/6 text-gray-950">
      &copy; {new Date().getFullYear()} Adeptia Inc.
    </div>
  )
}

export function Footer() {
  return (
    <footer>
      <Gradient className="relative">
        <div className="absolute inset-3 rounded-xl bg-[var(--brand-background-medium)]" />
        <Container>
          {/* <CallToAction /> */}
          <PlusGrid className="pt-16 pb-16">
            <PlusGridRow>
              <div className="grid grid-cols-2 gap-y-10 pb-6 lg:grid-cols-6 lg:gap-8">
                <div className="col-span-2 flex">
                  <PlusGridItem className="pt-6 lg:pb-6">
                    <Logo className="h-9" />
                  </PlusGridItem>
                </div>
                <div className="col-span-2 grid grid-cols-2 gap-x-8 gap-y-12 lg:col-span-4 lg:grid-cols-subgrid lg:pt-6 px-2">
                  <Sitemap />
                </div>
              </div>
            </PlusGridRow>
            <PlusGridRow className="flex justify-between">
              <div>
                <PlusGridItem className="py-3">
                  <Copyright />
                </PlusGridItem>
              </div>
              <div className="flex">
                <PlusGridItem className="flex items-center gap-8 py-3">
                  <SocialLinks />
                </PlusGridItem>
              </div>
            </PlusGridRow>
          </PlusGrid>
        </Container>
      </Gradient>
    </footer>
  )
}
