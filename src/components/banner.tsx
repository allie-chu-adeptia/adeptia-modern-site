import { ClientLink } from "./clientLink";

export default function Banner() {
    return (
        <div className="flex items-center justify-center gap-x-6 bg-[#060B23] px-6 py-2.5 sm:px-3.5">
            <p className="text-sm/6 text-white">
                <ClientLink href="/solutions/industry/insurance-integration" className="flex items-center gap-x-2">
                    <strong className="font-semibold">LIMRA 2025</strong>
                    <svg xmlns="http://www.w3.org/2000/svg" width="2" height="2" fill="none" viewBox="0 0 2 2">
                        <circle cx="1" cy="1" r="1" fill="#fff" />
                    </svg>
                    <span>Join us in Boston from April 23 - 25</span>
                    <span aria-hidden="true">&rarr;</span>
                </ClientLink>
            </p>
        </div>
    )
}
