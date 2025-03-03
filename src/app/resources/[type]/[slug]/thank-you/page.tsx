import { FileDownload } from '@/lib/displayDownload';

export default function ThankYouPage() {
    return (
        <div className="flex justify-center flex-col items-center">
            <FileDownload slug="your-slug" message="Thank you message" />
        </div>
    );
}