"use client"

import { useEffect, useState, useRef } from 'react';
import cleanString from '@/lib/cleanString';
import { FileDownload } from '@/lib/displayDownload';
import { useRouter } from 'next/navigation';

const HubSpotForm = ({
    portalId,
    formId,
    region = 'na1',
    slug,
    sfdcCampaignId,
    thankYouMessage,
    dark
}: {
    portalId: string,
    formId: string,
    region: string,
    sfdcCampaignId?: string,
    slug?: string,
    thankYouMessage: string,
    dark?: boolean
}) => {
    const router = useRouter();
    const formContainer = useRef<HTMLDivElement>(null);
    const [isLoading, setIsLoading] = useState(true); // Add loading state
    const [isSubmitted, setIsSubmitted] = useState(false);
    const cleanFormId = cleanString(formId);

    useEffect(() => {

        const scriptV2 = document.createElement('script');
        scriptV2.src = 'https://js.hsforms.net/forms/embed/v2.js';
        // scriptV2.charset = 'utf-8';
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
                        setIsLoading(false); // Set loading to false when form is ready
                    },
                    onFormSubmit: () => {
                        setIsSubmitted(true);
                        const token = Math.random().toString(36).substring(2, 15);
                        sessionStorage.setItem("downloadToken", token);
                        sessionStorage.setItem("slug", slug || "No slug found");
                        router.push(`${window.location.pathname}/thank-you?token=${token}`);
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
    }, [portalId, cleanFormId, region, router, sfdcCampaignId, slug]);

    const generatedId = useRef(`hubspot-form-${cleanFormId}`).current;

    return (
        <div className="flex justify-center flex-col items-center">
            <div
                id={generatedId}
                ref={formContainer}
                style={{
                    display: isLoading || isSubmitted ? 'none' : 'flex',
                    maxWidth: '500px',
                    minWidth: '300px',
                    width: '100%',
                    margin: '2rem 0',
                    background: '#F8F7F7',
                    padding: '2rem',
                    borderRadius: '1rem',
                    boxShadow: '0 0 20px 0 rgba(0, 0, 0, 0.15)',
                    ...(dark && {
                        background: '#E1ECFF',
                        color: '#fff',
                    })
                }}
            ></div>
            {isSubmitted && slug && <FileDownload slug={slug} message={thankYouMessage} />}
            {isSubmitted && !slug && <div>{thankYouMessage}</div>}
        </div>
    );
};

export default HubSpotForm;