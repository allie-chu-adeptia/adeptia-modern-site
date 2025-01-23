import {
    PortableText,
    type PortableTextComponents,
    type PortableTextBlock,
  } from "next-sanity";
import { image } from '@/sanity/image'
import { Link } from '@/components/link'

export default function StylePortableText({
    className,
    styleOverride,
    value,
}: {
    className?: string;
    styleOverride?: string;
    value: PortableTextBlock[];
}) {
    const components: PortableTextComponents = {
        block: {
            normal: ({ children }) => (
              <p className={styleOverride || "my-4 text-base/8 first:mt-0 last:mb-0"}>
                {children}
              </p>
            ),
            h2: ({ children }) => (
              <h2 className={styleOverride || "mb-2 mt-10 text-2xl/8 font-bold tracking-tight text-gray-950 first:mt-0 last:mb-0"}>
                {children}
              </h2>
            ),
            h3: ({ children }) => (
              <h3 className={styleOverride || "mb-2 mt-10 text-xl/8 font-semibold tracking-tight text-gray-950 first:mt-0 last:mb-0"}>
                {children}
              </h3>
            ),
            h4: ({ children }) => (
              <h4 className={styleOverride || "mb-2 mt-10 text-lg/8 font-semibold tracking-tight text-gray-950 first:mt-0 last:mb-0"}>
                {children}
              </h4>
            ),
            h5: ({ children }) => (
              <h5 className={styleOverride || "mb-2 mt-10 text-base/8 font-semibold tracking-tight text-gray-950 first:mt-0 last:mb-0"}>
                {children}
              </h5>
            ),
            blockquote: ({ children }) => (
              <blockquote className={styleOverride || "my-10 border-l-2 border-l-gray-300 pl-6 text-base/8 text-gray-950 first:mt-0 last:mb-0"}>
                {children}
              </blockquote>
            ),
          },
          types: {
            image: ({ value }) => (
              <img
                alt={value.alt || ''}
                src={image(value).width(2000).url()}
                className="w-full rounded-2xl my-5"
              />
            ),
            separator: ({ value }) => {
              switch (value.style) {
                case 'line':
                  return <hr className="my-8 border-t border-gray-200" />
                case 'space':
                  return <div className="my-8" />
                default:
                  return null
              }
            },
          },
          list: {
            bullet: ({ children }) => (
              <ul className="list-disc pl-4 text-base/8 marker:text-gray-400">
                {children}
              </ul>
            ),
            number: ({ children }) => (
              <ol className="list-decimal pl-4 text-base/8 marker:text-gray-400">
                {children}
              </ol>
            ),
          },
          listItem: {
            bullet: ({ children }) => (
              <li className="my-2 pl-2 has-[br]:mb-8">{children}</li>
            ),
            number: ({ children }) => (
              <li className="my-2 pl-2 has-[br]:mb-8">{children}</li>
            ),
          },
          marks: {
            strong: ({ children }) => (
              <strong className="font-semibold text-gray-950">{children}</strong>
            ),
            code: ({ children }) => (
              <>
                <span aria-hidden>`</span>
                <code className="text-[15px]/8 font-semibold text-gray-950">
                  {children}
                </code>
                <span aria-hidden>`</span>
              </>
            ),
            link: ({ value, children }) => (
              <Link
                href={value.href}
                className="font-medium text-gray-950 underline decoration-gray-400 underline-offset-4 data-[hover]:decoration-gray-600"
              >
                {children}
              </Link>
            ),
            internalLink: ({value, children}) => {
              const {slug = {}} = value
              const href = `/${slug.current}`
              return <a href={href}>{children}</a>
            },
          },
    }

    return (
        <div className={["prose", className].filter(Boolean).join(" ")}>
          <PortableText components={components} value={value} />
        </div>
      );
}