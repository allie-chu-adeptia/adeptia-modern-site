import { Testimonial as TestimonialType, TestimonialSection } from "@/sanity/types/sanity.types";
import { image } from "@/sanity/image";
import cleanString from "@/lib/cleanString";

interface Testimonial extends Omit<TestimonialType, 'picture' | 'companyLogo'> {
    picture?: {
        asset?: {
            _ref: string
            _type: 'reference'
            _weak?: boolean
        }
        altText?: string
        _type: 'image'
    }
    companyLogo?: {
        asset?: {
            _ref: string
            _type: 'reference'
            _weak?: boolean
        }
        altText?: string
        _type: 'image'
    }
}

export interface ExpandedTestimonialSection extends Omit<TestimonialSection, 'testimonial'> {
    testimonial?: Testimonial
}

export async function TestimonialSectionComponent({
    testimonialSection
}: {
    testimonialSection: ExpandedTestimonialSection
}) {
    if (cleanString(testimonialSection.layout || '') === 'simpleCentered') {
        return (
            <section className="relative isolate overflow-hidden bg-white px-6 py-24 sm:py-32 lg:px-8">
                <div className="mx-auto max-w-2xl lg:max-w-4xl">
                    {testimonialSection.testimonial?.companyLogo && (
                        <img
                            alt={testimonialSection.testimonial.companyLogo.altText}
                            src={image(testimonialSection.testimonial.companyLogo).url()}
                            className="mx-auto h-[200px]"
                        />
                    )}
                    <figure className="mt-2">
                        <blockquote className="text-center text-xl/8 font-regular text-gray-800 sm:text-2xl/9">
                            <p>
                                {testimonialSection.testimonial?.quote}
                            </p>
                        </blockquote>
                        <figcaption className="mt-10">
                            {testimonialSection.testimonial?.picture && (
                                <img
                                    alt={testimonialSection.testimonial.name}
                                    src={image(testimonialSection.testimonial.picture).size(100, 100).url()}
                                    className="mx-auto size-10 rounded-full"
                                />
                            )}
                            <div className="mt-4 flex items-center justify-center space-x-3 text-base">
                                <div className="font-semibold text-gray-900">{testimonialSection.testimonial?.name}</div>
                                <svg width={3} height={3} viewBox="0 0 2 2" aria-hidden="true" className="fill-gray-900">
                                    <circle r={1} cx={1} cy={1} />
                                </svg>
                                <div className="text-gray-600">{testimonialSection.testimonial?.title}</div>
                            </div>
                        </figcaption>
                    </figure>
                </div>
            </section>
        )
    } else {
        return (
            <section className="isolate overflow-hidden bg-white px-6 lg:px-8">
                <div className="relative mx-auto max-w-2xl py-24 sm:py-32 lg:max-w-4xl">
                    <figure className="grid grid-cols-1 items-center gap-x-6 gap-y-8 lg:gap-x-10">
                        <div className="relative col-span-2 lg:col-start-1 lg:row-start-2">
                            <blockquote className="text-xl/8 font-regular text-gray-800 sm:text-2xl/9">
                                <p>
                                    {testimonialSection.testimonial?.quote}
                                </p>
                            </blockquote>
                        </div>
                        <div className="col-end-1 w-16 lg:row-span-4 lg:w-72">
                            {testimonialSection.testimonial?.picture && (
                                <img
                                    alt={testimonialSection.testimonial.name}
                                    src={image(testimonialSection.testimonial.picture).size(576, 576).url()}
                                    className="rounded-xl bg-indigo-50 lg:rounded-3xl"
                                />
                            )}
                        </div>
                        <figcaption className="text-base lg:col-start-1 lg:row-start-3">
                            <div className="font-semibold text-gray-900">{testimonialSection.testimonial?.name}</div>
                            <div className="mt-1 text-gray-500">{testimonialSection.testimonial?.title}</div>
                        </figcaption>
                    </figure>
                </div>
            </section>
        )
    }
}