import { PlusGrid, PlusGridItem, PlusGridRow } from '@/components/plus-grid'
import { Container } from './container'
import { Gradient } from './gradient'
import { Link } from './link'
import { Logo } from './logo'

/* eslint prefer-const: 0 */

// function CallToAction() {
//   return (
//     <div className="relative pb-16 pt-20 text-center sm:py-24">
//       <hgroup>
//         <Subheading>Get started</Subheading>
//         <p className="mt-6 text-3xl font-medium tracking-tight text-gray-950 sm:text-5xl">
//           Ready to dive in?
//           <br />
//           Start your free trial today.
//         </p>
//       </hgroup>
//       <p className="mx-auto mt-6 max-w-xs text-sm/6 text-gray-500">
//         Get the cheat codes for selling and unlock your team&apos;s revenue
//         potential.
//       </p>
//       <div className="mt-6">
//         <Button className="w-full sm:w-auto" href="#">
//           Get started
//         </Button>
//       </div>
//     </div>
//   )
// }

function SitemapHeading({ children, className }: { children: React.ReactNode, className?: string }) {
  return <h3 className={`text-sm/6 font-medium text-gray-950/50 ${className}`}>{children}</h3>
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
          <SitemapLink href="/products/artificial-intelligence-mapping">AI Business Rules</SitemapLink>
          <SitemapLink href="/products/idp">Intelligent Document Processing</SitemapLink>
          <SitemapLink href="/products/no-code-automation-builder">No-Code Automation Builder</SitemapLink>
          <SitemapLink href="/products/manage-and-monitor">Manage and Monitor</SitemapLink>
        </SitemapLinks>
      </div>
      <div>
        <SitemapHeading>Solutions by Industry</SitemapHeading>
        <SitemapLinks>
          <SitemapLink href="#">Insurance</SitemapLink>
          <SitemapLink href="#">Financial Services</SitemapLink>
          <SitemapLink href="#">Specialty Manufacturing and Distribution</SitemapLink>
          <SitemapLink href="#">Software and Service Providers</SitemapLink>
        </SitemapLinks>
        <SitemapHeading className="mt-8">Solutions by Capability</SitemapHeading>
        <SitemapLinks>
          <SitemapLink href="#">Intelligent Document Processing</SitemapLink>
          <SitemapLink href="#">AI Data Mapping</SitemapLink>
          <SitemapLink href="#">Low-Code Integrations and Automations</SitemapLink>
        </SitemapLinks>
      </div>
      <div>
        <SitemapHeading>Solutions by Initiative</SitemapHeading>
        <SitemapLinks>
          <SitemapLink href="#">Digital Transformation</SitemapLink>
          <SitemapLink href="#">Business Process Automation</SitemapLink>
          <SitemapLink href="#">AI Data Readiness</SitemapLink>
          <SitemapLink href="#">First Mile Data Problems</SitemapLink>
        </SitemapLinks>
        <SitemapHeading className="mt-8">Solutions by Application</SitemapHeading>
        <SitemapLinks>
          <SitemapLink href="#">SAP</SitemapLink>
          <SitemapLink href="#">Salesforce</SitemapLink>
          <SitemapLink href="#">Netsuite</SitemapLink>
          <SitemapLink href="#">Workday</SitemapLink>
          <SitemapLink href="#">ADP</SitemapLink>
          <SitemapLink href="#">See All Integrations</SitemapLink>
        </SitemapLinks>
      </div>      
      <div>
      <SitemapHeading>Resources</SitemapHeading>
        <SitemapLinks>
          <SitemapLink href="#">Blog</SitemapLink>
          <SitemapLink href="#">Resources</SitemapLink>
          <SitemapLink href="#">Product Support</SitemapLink>
        </SitemapLinks>
        <SitemapHeading className="mt-8">Company</SitemapHeading>
        <SitemapLinks>
          <SitemapLink href="#">About Adeptia</SitemapLink>
          <SitemapLink href="#">Leadership</SitemapLink>
          <SitemapLink href="#">Careers</SitemapLink>
          <SitemapLink href="#">Contact Us</SitemapLink>
          <SitemapLink href="#">Terms of service</SitemapLink>
          <SitemapLink href="#">Privacy policy</SitemapLink>
        </SitemapLinks>
      </div>
    </>
  )
}

function SocialIconX(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" {...props}>
      <path d="M12.6 0h2.454l-5.36 6.778L16 16h-4.937l-3.867-5.594L2.771 16H.316l5.733-7.25L0 0h5.063l3.495 5.114L12.6 0zm-.86 14.376h1.36L4.323 1.539H2.865l8.875 12.837z" />
    </svg>
  )
}

function SocialIconFacebook(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16 8.05C16 3.603 12.418 0 8 0S0 3.604 0 8.05c0 4.016 2.926 7.346 6.75 7.95v-5.624H4.718V8.05H6.75V6.276c0-2.017 1.194-3.131 3.022-3.131.875 0 1.79.157 1.79.157v1.98h-1.008c-.994 0-1.304.62-1.304 1.257v1.51h2.219l-.355 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.95z"
      />
    </svg>
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
        href="https://facebook.com"
        target="_blank"
        aria-label="Visit us on Facebook"
        className="text-gray-950 data-[hover]:text-gray-950/75"
      >
        <SocialIconFacebook className="size-4" />
      </Link>
      <Link
        href="https://x.com"
        target="_blank"
        aria-label="Visit us on X"
        className="text-gray-950 data-[hover]:text-gray-950/75"
      >
        <SocialIconX className="size-4" />
      </Link>
      <Link
        href="https://linkedin.com"
        target="_blank"
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
