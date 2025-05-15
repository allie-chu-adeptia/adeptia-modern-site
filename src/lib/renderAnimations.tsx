'use client'

import clsx from 'clsx';
import cleanString from './cleanString';
import { FirstMileData } from "@/animations/firstMileData";

export default function AnimationRenderer({
    animation,
    videoURL,
    animationClassName,
    dark
}: {
    animation?: string,
    videoURL?: string,
    animationClassName?: string,
    dark?: boolean
}) {
    if (!animation) return null;
    console.log(videoURL)

    return (
        <>
            {cleanString(animation) === 'customAnimation' ? (
                <div className={clsx(animationClassName)}>
                    {videoURL &&
                        <video width="100%" height="100%" autoPlay loop muted playsInline preload="none" style={{ borderRadius: '0.75rem' }}>
                            <source src={videoURL} type="video/webm" />
                            Your browser does not support the video tag.
                        </video>
                    }
                </div>
            ) : cleanString(animation) === 'firstMileDataTypes' ? (
                <div className="mt-8 w-full">
                    <FirstMileData dark={dark || false} />
                </div>
            ) : null}
        </>
    );
}