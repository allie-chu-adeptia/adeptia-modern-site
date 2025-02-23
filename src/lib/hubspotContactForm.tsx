'use client'

import { useEffect, useState } from "react";

export default function HubspotContactForm(
    { formID, sfdcCampaignId }: { formID: string, sfdcCampaignId: string }) {

    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        console.log("try loading script")
        const script = document.createElement('script');
        script.src = 'https://js.hsforms.net/forms/shell.js';
        document.body.appendChild(script);

        script.addEventListener('load', () => {
            try {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                if (window.hbspt) {
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    window.hbspt.forms.create({
                        region: "na1",
                        portalId: "456732",
                        formId: formID,
                        sfdcCampaignId: sfdcCampaignId,
                        target: '#hubspotForm',
                        onFormReady: () => setIsLoading(false)
                    })
                }
            } catch (err) {
                setError('Failed to load form');
                console.log({ err })
                setIsLoading(false);
            }
        });
        script.addEventListener('error', () => {
            setError('Failed to load HubSpot script');
            setIsLoading(false);
        });

        document.body.appendChild(script);

        // Cleanup function
        return () => {
            document.body.removeChild(script);
        };
    }, [formID, sfdcCampaignId]);

    if (error) return <div className="text-red-500">{error}</div>;
    if (isLoading) return <div>Loading form...</div>;

    return (
        <div className="my-8">
            <div id="hubspotForm"></div>
        </div>
    );
};