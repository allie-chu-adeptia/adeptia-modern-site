import { BackgroundStyle } from "@/sanity/types/sanity.types";
import cleanString from "@/lib/cleanString";
import clsx from "clsx";

export function BackgroundColor({ children, color }: { children: React.ReactNode, color: BackgroundStyle }) {
    const backgroundColors = {
        'light': 'bg-white',
        'medium': 'bg-[#E1ECFF]',
        'dark': 'bg-gray-800',
        'accent': 'bg-[linear-gradient(276deg,var(--tw-gradient-stops))] from-[#3C7BEF] from-[-17.59%] via-[#0A4ECD] via-[29.8%] to-[#3B25E0] to-[90.12%]'
    }

    const bgColor = backgroundColors[cleanString(color.style || 'light') as keyof typeof backgroundColors]

    return (
        <div className={clsx(bgColor, "w-full")}>
            {children}
        </div>
    )
}