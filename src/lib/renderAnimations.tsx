'use client'

// import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import clsx from 'clsx';
import cleanString from './cleanString';
import { FirstMileData } from "@/animations/firstMileData";

export default function AnimationRenderer({
    animation,
    lottieURL,
    animationClassName,
    dark
}: {
    animation?: string,
    lottieURL?: string,
    animationClassName?: string,
    dark?: boolean
}) {
    if (!animation) return null;
    console.log(animationClassName)

    return (
        <>
            {cleanString(animation) === 'lottieAnimation' ? (
                <div className={clsx(animationClassName)}>
                    {/* {lottieURL && <DotLottieReact
                        src={lottieURL}
                        autoplay
                        loop
                        style={{
                            borderRadius: '0.75rem', // rounded-xl
                            overflow: 'hidden',
                            width: '100%',
                            height: '100%',
                        }}
                    />} */}
                    {lottieURL &&
                        <video width="100%" height="100%" autoPlay loop muted playsInline preload="none" style={{ borderRadius: '0.75rem' }}>
                            <source src={lottieURL} type="video/webm" />
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