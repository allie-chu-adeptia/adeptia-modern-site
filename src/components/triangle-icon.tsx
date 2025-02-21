import clsx from "clsx";

// export function TriangleIcon({
//     size
// } : {
//     size: number
// }) {
//     return (
//         <svg width="100" height="100" viewBox={`0 0 ${size} ${size}`}>
//             <polygon points="50,15 90,85 10,85" />
//         </svg>
//     )
// }

export function TriangleIcon({
    className = '',
    rotation,
    dark = false
}: {
    className?: string
    rotation: number
    dark?: boolean
}) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="8"
            height="10" 
            viewBox="0 0 8 10"
            aria-hidden="true"
            style={{
                transform: `rotate(${rotation}deg)`
            }}
            className={clsx(
                className,
                'size-[15px]',
                'transform',
            )}
            fill="none"
        >
            <path 
                d="M0.75 1.10289L7.5 5L0.75 8.89712L0.75 1.10289Z" 
                stroke={dark ? "#ffffff" : "var(--primary-blue)"}
                strokeOpacity={0.15} 
                strokeWidth={0.85}
            />
        </svg>
    )
}