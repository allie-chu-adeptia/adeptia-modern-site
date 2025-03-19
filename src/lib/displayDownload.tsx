'use client'

import { useEffect, useState } from 'react';
import { getDownloadFile } from '@/sanity/queries/resources';
import { Heading } from '@/components/text';
import { Button } from '@/components/button';

export const FileDownload = ({ 
    slug, 
    message 
}: { 
    slug: string, 
    message: string 
}) => {
    console.log("FileDownload", slug);
    const [fileURL, setFileURL] = useState<string | null>(null);
    
    useEffect(() => {
        // Only fetch once when component mounts
        const fetchFile = async () => {
            console.log("Fetching file", slug);
            const downloadedFile = await getDownloadFile(slug);
            if (!downloadedFile?.fileURL) {
                console.error("No file URL found for download");
            }
            setFileURL(downloadedFile?.fileURL || null);
        };
        
        fetchFile();
    }, [slug]); // Empty dependency array ensures this only runs once

    return (
        <div className="fileDownload max-w-[500px] min-w-[300px] w-full my-4 bg-[linear-gradient(276deg,var(--tw-gradient-stops))] from-[#D8E5FC] from-[-17.59%] via-[#CEDBF5] via-[29.8%] to-[#D2D8F7] to-[90.12%] p-4 rounded-lg shadow-md flex flex-col items-center justify-center">
            <Heading as="h3" className="my-4 text-center">{message}</Heading>
            {fileURL ? (
                <Button className="mb-4" variant="primary" href={fileURL} target="_blank" rel="noopener" download>
                    Download File
                </Button>
            ) : (
                <p className="text-red-600 mb-4">Sorry, the download file is not available.</p>
            )}
        </div>
    );
};

export const NoGateFileDownload = ({
    slug
} : {
    slug: string
}) => {
    const [fileURL, setFileURL] = useState<string | null>(null);
    
    useEffect(() => {
        // Only fetch once when component mounts
        const fetchFile = async () => {
            const downloadedFile = await getDownloadFile(slug);
            setFileURL(downloadedFile.fileURL);
        };
        
        fetchFile();
    }, [slug]); // Empty dependency array ensures this only runs once

    return (
        <div className="fileDownload min-w-[300px] w-full my-10 bg-[linear-gradient(276deg,var(--tw-gradient-stops))] from-[#D8E5FC] from-[-17.59%] via-[#CEDBF5] via-[29.8%] to-[#D2D8F7] to-[90.12%] p-10 rounded-lg shadow-md grid grid-cols-2 gap-8">
            <div className="flex flex-col items-start">
                <Heading as="h2">Download Now</Heading>
            </div>
            <div className="flex flex-col items-end justify-center">
                <Button variant="blue" href={fileURL || ''} target="_blank" rel="noopener" download>Read More</Button>
            </div>
        </div>
    );
}