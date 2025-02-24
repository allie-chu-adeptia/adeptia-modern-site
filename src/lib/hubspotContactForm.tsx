'use client'

import { useEffect, useState } from "react";

export default function HubspotContactForm(
    { formID, sfdcCampaignId }: { formID: string, sfdcCampaignId: string }) {

    const [isFormReady, setIsFormReady] = useState(false);

    useEffect(() => {
        console.log('Component mounted. Checking for HubSpot...', {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            hbsptExists: !!window.hbspt,
            formID,
            sfdcCampaignId
        });

        // Create a function to initialize the form
        const createForm = () => {
            console.log('Attempting to create form...');
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            if (window.hbspt) {
                console.log('HubSpot found, creating form...');
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                window.hbspt.forms.create({
                    region: "na1",
                    portalId: "456732",
                    formId: formID,
                    sfdcCampaignId: sfdcCampaignId,
                    target: '#hubspotForm',
                    onFormReady: () => {
                        console.log('Form ready callback triggered');
                        setIsFormReady(true);
                    }
                });
            } else {
                console.log('HubSpot not found yet');
            }
        };

        // Try to create form immediately if script is already loaded
        createForm();

        // Also listen for the script to load
        const handleScriptLoad = () => {
            console.log('HubSpot script load event received');
            createForm();
        };
 
        // Add event listener for script load
        window.addEventListener('hsFormReady', handleScriptLoad);
        console.log('Added hsFormReady event listener');

        return () => {
            console.log('Cleaning up event listener');
            window.removeEventListener('hsFormReady', handleScriptLoad);
        };
    }, [formID, sfdcCampaignId]);

    return (
        <div className="my-8">
            <div id="hubspotForm"></div>
            {!isFormReady && <div>Loading form...</div>}
        </div>
    );
};