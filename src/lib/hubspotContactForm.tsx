"use client"

import { useEffect, useState, useRef } from 'react';
import cleanString from '@/lib/cleanString';
import { FileDownload } from '@/lib/displayDownload';

const HubSpotForm = ({
    portalId,
    formId,
    region = 'na1',
    slug,
    thankYouMessage
}: {
    portalId: string,
    formId: string,
    region: string
    slug: string,
    thankYouMessage: string
}) => {
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
                    onFormReady: () => {
                        setIsLoading(false); // Set loading to false when form is ready
                    },
                    onFormSubmit: () => {
                        setIsSubmitted(true);
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
    }, [portalId, cleanFormId, region]);

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
                    background: 'linear-gradient(276deg, #D8E5FC 0%, #CEDBF5 50%, #D2D8F7 100%)',
                    padding: '2rem',
                    borderRadius: '1rem',
                    boxShadow: '0 0 20px 0 rgba(0, 0, 0, 0.15)',
                }}
            ></div>
            {isSubmitted && <FileDownload slug={slug} message={thankYouMessage}/>}
        </div>
    );
};

export default HubSpotForm;