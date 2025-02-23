'use client'

import { useEffect, useState } from "react";
import Script from 'next/script';

export default function HubspotContactForm(
    { formID, sfdcCampaignId }: { formID: string, sfdcCampaignId: string }) {

    const [isFormReady, setIsFormReady] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        if (window.hbspt && !isFormReady) {
            try {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                window.hbspt.forms.create({
                    region: "na1",
                    portalId: "456732",
                    formId: formID,
                    sfdcCampaignId: sfdcCampaignId,
                    target: '#hubspotForm',
                    onFormReady: () => setIsFormReady(true)
                });
            } catch (err) {
                setError('Failed to load form');
                console.error(err);
            }
        }
    }, [formID, sfdcCampaignId, isFormReady]);

    return (
        <>
            <Script
                src="https://js.hsforms.net/forms/shell.js"
                strategy="afterInteractive"
                onError={() => setError('Failed to load HubSpot script')}
            />
            {error && <div className="text-red-500">{error}</div>}
            {!isFormReady && !error && <div>Loading form...</div>}
            <div className="my-8">
                <div id="hubspotForm"></div>
            </div>
        </>
    );
};