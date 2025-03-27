"use client"

import { useEffect, useState, useRef } from 'react';
import cleanString from '@/lib/cleanString';
import { useRouter } from 'next/navigation';
import { NoGateFileDownload } from './displayDownload';
import { trackUmamiEvent } from './trackUmamiEvent';
import { Heading } from '@/components/text';


const HubSpotForm = ({
    portalId,
    formId,
    region = 'na1',
    slug,
    sfdcCampaignId,
    dark,
    umamiEventName,
    thankYouMessage
}: {
    portalId: string,
    formId: string,
    region: string,
    sfdcCampaignId?: string,
    slug?: string,
    dark?: boolean,
    umamiEventName: string,
    thankYouMessage?: string
}) => {
    const router = useRouter();
    const formContainer = useRef<HTMLDivElement>(null);
    const [isLoading, setIsLoading] = useState(true); // Add loading state
    const [isSubmitted, setIsSubmitted] = useState(false);
    const cleanFormId = cleanString(formId);

    useEffect(() => {

        const scriptV2 = document.createElement('script');
        scriptV2.src = 'https://js.hsforms.net/forms/embed/v2.js';
        scriptV2.type = 'text/javascript';
        document.body.appendChild(scriptV2);

        scriptV2.onload = () => {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            if (window.hbspt) {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                window.hbspt.forms.create({
                    portalId: portalId,
                    formId: cleanFormId,
                    region: region,
                    target: `#${formContainer.current?.id}`,
                    sfdcCampaignId: sfdcCampaignId,
                    onFormReady: () => {
                        setIsLoading(false);
                    },
                    onFormSubmit: () => {
                        setIsSubmitted(true);
                        if (umamiEventName) {
                            trackUmamiEvent(umamiEventName);
                        }
                    }
                });
            }
        };

        return () => {
            const existingScript = document.querySelector(`script[src="${scriptV2.src}"]`);
            if (existingScript) {
                existingScript.remove();
            }
        };
    }, [portalId, cleanFormId, region, router, sfdcCampaignId, slug, umamiEventName]);

    const generatedId = useRef(`hubspot-form-${cleanFormId}`).current;

    return (
        <>
            {isSubmitted ? (
                <div className="flex justify-center flex-col items-center h-full">
                    {slug ? (
                        <NoGateFileDownload slug={slug} />
                    ) : (
                        <div className="min-w-[300px] w-full my-10 bg-[linear-gradient(276deg,var(--tw-gradient-stops))] from-[#D8E5FC] from-[-17.59%] via-[#CEDBF5] via-[29.8%] to-[#D2D8F7] to-[90.12%] p-10 rounded-lg shadow-md">
                            <div className="flex flex-col items-start">
                                <Heading as="h3">{thankYouMessage || 'Thank you for your submission!'}</Heading>
                            </div>
                        </div>
                    )}
                </div>
            ) : (
                <div
                    id={generatedId}
                    ref={formContainer}
                    style={{
                        display: isLoading || isSubmitted ? 'none' : 'flex',
                        minWidth: '300px',
                        width: '100%',
                        margin: '2rem 0',
                        background: '#F8F7F7',
                        padding: '2rem',
                        borderRadius: '1rem',
                        boxShadow: '0 0 20px 0 rgba(0, 0, 0, 0.15)',
                        ...(dark && {
                            background: '#E1ECFF',
                            color: '#fff'
                        })
                    }}
                />
            )}
        </>
    );
};

export default HubSpotForm;