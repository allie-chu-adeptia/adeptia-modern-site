import {
    PortableText,
    type PortableTextComponents,
    type PortableTextBlock,
  } from "next-sanity";
import { image } from '@/sanity/image'
import { Link } from '@/components/link'
import { CheckCircleIcon } from '@heroicons/react/20/solid'
import { buildTable } from "../lib/buildTable";

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
              <p className={styleOverride || "mt-6 text-base/7 text-gray-700"}>
                {children}
              </p>
            ),
            h2: ({ children }) => (
              <h2 className={styleOverride || "mt-16 text-pretty text-3xl font-semibold tracking-tight text-gray-900"}>
                {children}
              </h2>
            ),
            h3: ({ children }) => (
              <h3 className={styleOverride || "mt-10 text-pretty text-2xl font-semibold tracking-tight text-gray-900"}>
                {children}
              </h3>
            ),
            h4: ({ children }) => (
              <h4 className={styleOverride || "mt-8 text-pretty text-xl font-semibold tracking-tight text-gray-900"}>
                {children}
              </h4>
            ),
            h5: ({ children }) => (
              <h5 className={styleOverride || "mt-6 text-pretty text-lg font-semibold tracking-tight text-gray-900"}>
                {children}
              </h5>
            ),
            blockquote: ({ children }) => (
              <figure className="mt-10 border-l border-indigo-600 pl-9">
                <blockquote className="font-semibold text-gray-900">
                  {children}
                </blockquote>
              </figure>
            ),
          },
          types: {
            image: ({ value }) => (
              <figure className="mt-16">
                <img
                  alt={value.alt || ''}
                  src={image(value).width(2000).url()}
                  className="aspect-video rounded-xl bg-gray-50 object-cover"
                />
                {value.alt && (
                  <figcaption className="mt-4 flex gap-x-2 text-sm/6 text-gray-500">
                    <CheckCircleIcon aria-hidden="true" className="mt-0.5 size-5 flex-none text-gray-300" />
                    {value.alt}
                  </figcaption>
                )}
              </figure>
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
            table: ({ value }) => {
              return buildTable(value)
            }
          },
          list: {
            bullet: ({ children }) => (
              <ul className="mt-8 max-w-2xl space-y-3 text-gray-600">
                {children}
              </ul>
            ),
            number: ({ children }) => (
              <ol className="mt-8 max-w-2xl space-y-3 text-gray-600">
                {children}
              </ol>
            ),
          },
          listItem: {
            bullet: ({ children }) => (
              <li className="flex gap-x-3">
                <span className="mt-2.5 size-1.5 flex-none rounded-full bg-gray-600" />
                <span>{children}</span>
              </li>
            ),
            number: ({ children, index }) => (
              <li className="flex gap-x-3">
                <span>{index + 1}.</span>
                <span>{children}</span>
              </li>
            ),
          },
          marks: {
            strong: ({ children }) => (
              <strong className="font-semibold text-gray-900">{children}</strong>
            ),
            code: ({ children }) => (
              <code className="rounded-md bg-gray-100 px-2 py-1 text-sm/6 font-medium text-gray-900">
                {children}
              </code>
            ),
            link: ({ value, children }) => (
              <Link
                href={value.href}
                className="font-medium text-indigo-600 hover:text-indigo-700"
                target={value.blank ? '_blank' : undefined}
              >
                {children}
              </Link>
            ),
            internalLink: ({value, children}) => {
              const {slug = {}} = value
              const href = `/${slug.current}`
              return (
                <Link
                  href={href}
                  className="font-medium text-indigo-600 hover:text-indigo-700"
                >
                  {children}
                </Link>
              )
            }
          },
    }

    return (
        <div className={["mx-auto max-w-3xl text-base/7 text-gray-700", className].filter(Boolean).join(" ")}>
          <PortableText components={components} value={value} />
        </div>
      );
}