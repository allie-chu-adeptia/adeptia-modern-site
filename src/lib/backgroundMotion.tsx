'use client'

import { BackgroundStyle } from "@/sanity/types/sanity.types";
import { motion } from "framer-motion";
import { TriangleIcon } from "@/components/triangle-icon";
import cleanString from "@/lib/cleanString";

function calculateLine({
    x1,
    y1,
    length,
    angle
}: {
    x1: number,
    y1: number,
    length: number,
    angle: number
}) {
    const angleInRadians = (angle * Math.PI) / 180;
    const x2 = x1 + length * Math.cos(angleInRadians);
    const y2 = y1 + length * Math.sin(angleInRadians);
    return { x2, y2 };
}

function AngledLine({
    x1,
    y1,
    length,
    angle,
    color,
    opacity,
    dashArray
}: {
    x1: number,
    y1: number,
    length: number,
    angle: number,
    color: string,
    opacity: number,
    dashArray: string
}) {
    const line = calculateLine({ x1, y1, length, angle });

    return (
        <path
            d={`M${x1} ${y1} L${line.x2} ${line.y2}`}
            stroke={color}
            strokeOpacity={opacity}
            strokeDasharray={dashArray}
        />
    )
}

function AnimationPath({
    x1,
    y1,
    length,
    angle,
    delay,
    triangleAngle = 0,
    reverse = false,
    duration = 30,
    dark = false
}: {
    x1: number,
    y1: number,
    length: number,
    angle: number,
    delay: number,
    triangleAngle?: number,
    reverse?: boolean,
    duration?: number,
    dark?: boolean
}) {
    const line = calculateLine({ x1, y1, length, angle });

    return (
        <motion.div
            initial={{ x: reverse ? line.x2 : x1, y: reverse ? line.y2 : y1 }}
            animate={{ x: reverse ? x1 : line.x2, y: reverse ? y1 : line.y2 }}
            transition={{
                duration: duration,
                repeat: Infinity,
                ease: "linear",
                delay: delay
            }}
        >
            <TriangleIcon rotation={triangleAngle} dark={dark} />
        </motion.div>
    )
}

export function BackgroundMotion({
    color,
}: {
    color: BackgroundStyle
}) {
    const cleanStyle = cleanString(color.style || '')
    const dark = cleanStyle === 'dark' || cleanStyle === 'dark-accent' ? true : false

    return (
        <div className="pointer-events-none absolute top-0 left-[-200px]">
            <div>
                {/* <svg width="100%" height="100%" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
                {[0, 200, 400, 600].map((offset) => (
                    <AngledLine
                        key={offset}
                        x1={offset}
                        y1={0}
                        length={400}
                        angle={30}
                        color="red"
                        opacity={1}
                        dashArray="4.62 4.62"
                    />
                ))}
            </svg> */}
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="3020"
                    height="621"
                    viewBox="0 0 3020 621"
                    fill="none"
                >
                    {[0, 200, 400, 600, 800, 1000, 1200, 1400, 1600, 1800, 2000, 2200, 2400, 2600, 2800, 3000].map((offset) => (
                        <AngledLine
                            key={offset}
                            x1={offset}
                            y1={-100}
                            length={800}
                            angle={60}
                            color={dark ? "#ffffff" : "var(--primary-blue)"}
                            opacity={0.1}
                            dashArray="4.62 4.62"
                        />
                    ))}
                    {/* 120 degree angle */}
                    {[400, 600, 800, 1000, 1200, 1400, 1600, 1800, 2000, 2200, 2400, 2600, 2800, 3000].map((offset) => (
                        <AngledLine
                            key={offset}
                            x1={offset}
                            y1={-100}
                            length={800}
                            angle={120}
                            color={dark ? "#ffffff" : "var(--primary-blue)"}
                            opacity={0.1}
                            dashArray="4.62 4.62"
                        />
                    ))}

                    {/* 180 degree angle */}
                    {[72, 243, 417].map((offset) => (
                        <AngledLine
                            key={offset}
                            x1={100}
                            y1={offset}
                            length={3000}
                            angle={0}
                            color={dark ? "#ffffff" : "var(--primary-blue)"}
                            opacity={0.1}
                            dashArray="4.62 4.62"
                        />
                    ))}
                </svg>
            </div>
            <div className="absolute top-0 left-[-200px]">
                <AnimationPath
                    x1={597}
                    y1={-100}
                    length={800}
                    angle={60}
                    delay={10}
                    triangleAngle={60}
                    dark={dark}
                />
                <AnimationPath
                    x1={1005}
                    y1={-100}
                    length={800}
                    angle={60}
                    delay={2}
                    triangleAngle={60}
                    dark={dark}
                />
                <AnimationPath
                    x1={2014}
                    y1={-100}
                    length={800}
                    angle={60}
                    delay={6}
                    triangleAngle={60}
                    dark={dark}
                />

                <AnimationPath
                    x1={1422}
                    y1={-100}
                    length={800}
                    angle={60}
                    delay={10}
                    reverse={true}
                    triangleAngle={120}
                    dark={dark}
                />

                <AnimationPath
                    x1={955}
                    y1={-100}
                    length={800}
                    angle={120}
                    delay={8}
                    triangleAngle={60}
                    reverse={true}
                    dark={dark}
                />
                <AnimationPath
                    x1={1746}
                    y1={-100}
                    length={800}
                    angle={120}
                    delay={3}
                    triangleAngle={60}
                    reverse={true}
                    dark={dark}
                />
                <AnimationPath
                    x1={1937}
                    y1={-100}
                    length={800}
                    angle={120}
                    delay={3}
                    triangleAngle={120}
                    dark={dark}
                />

                <AnimationPath
                    x1={0}
                    y1={-40}
                    length={3200}
                    angle={0}
                    delay={0}
                    triangleAngle={60}
                    reverse={true}
                    duration={50}
                    dark={dark}
                />

                <AnimationPath
                    x1={200}
                    y1={117}
                    length={4200}
                    angle={0}
                    delay={0}
                    triangleAngle={0}
                    duration={60}
                    dark={dark}
                />
            </div>
        </div>
    )
}