import { ClientLink } from "./clientLink";

export default function Banner() {
    return (
        <div className="flex items-center justify-center gap-x-6 px-6 py-2.5 sm:px-3.5" 
             style={{
                background: "linear-gradient(90deg, #060B23, #1B0F71, #2B3A86)",
                backgroundSize: "400% 400%",
                animation: "gradient-animation 8s ease infinite"
             }}>
            <p className="text-md/6 text-white">
                <ClientLink href="/solutions/industry/insurance-integration#id-limra-signup" className="flex items-center gap-x-2">
                    <strong className="font-semibold text-[var(--flourescent)]">LIMRA 2025 Workplace Benefits Conference</strong>
                    <svg xmlns="http://www.w3.org/2000/svg" width="2" height="2" fill="none" viewBox="0 0 2 2">
                        <circle cx="1" cy="1" r="1" fill="#fff" />
                    </svg>
                    <span>Learn More</span>
                    <span aria-hidden="true">&rarr;</span>
                </ClientLink>
            </p>
            
            <style jsx>{`
                @keyframes gradient-animation {
                    0% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                    100% { background-position: 0% 50%; }
                }
            `}</style>
        </div>
    )
}