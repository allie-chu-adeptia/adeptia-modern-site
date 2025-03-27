export const trackUmamiEvent = async (eventName: string) => {
    try {
        window.umami.track(eventName, {
            hostname: window.location.hostname,
            language: navigator.language,
            referrer: document.referrer,
            screen: `${window.screen.width}x${window.screen.height}`,
            title: document.title,
            url: window.location.pathname,
            data: {}, // Optional custom data properties
        });
        console.log('Successfully tracked Hubspot form submission in Umami');
    } catch (error) {
        console.error('Error tracking Umami event:', error);
    }
};

declare global {
    interface Window {
        umami: {
            track: (event: string, data?: Record<string, unknown>) => void;
        };
    }
}