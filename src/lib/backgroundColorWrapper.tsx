import { BackgroundStyle } from "@/sanity/types/sanity.types";
import cleanString from "@/lib/cleanString";
import clsx from "clsx";

export function BackgroundColor({ 
    children, 
    color,
    className
}: { 
    children: React.ReactNode, 
    color: BackgroundStyle,
    className?: string
}) {
    const backgroundColors = {
        'light': 'bg-brand-backgroundLight',
        'medium': 'bg-brand-backgroundMedium',
        'dark': 'bg-brand-backgroundDark',
        'dark-accent': 'bg-gradient-to-r from-brand-gradientDark via-brand-gradientMedium to-brand-gradientLight',
        'light-accent': 'bg-gradient-to-b from-brand-backgroundLight to-brand-backgroundMedium'
    }

    const bgColor = backgroundColors[cleanString(color.style || 'light') as keyof typeof backgroundColors]

    return (
        <div className={clsx(bgColor, "w-full", className)}>
            {children}
        </div>
    )
}