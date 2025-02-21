import { BackgroundStyle } from "@/sanity/types/sanity.types";
import cleanString from "./cleanString";

const lightBackground: BackgroundStyle = {
  _type: 'backgroundStyle',
  style: 'light'
}

export function DarkModeWrapper(
  { children, style = lightBackground, className }: 
  { children: React.ReactNode, style?: BackgroundStyle, className?: string }
) {
    const cleanStyle = cleanString(style.style || '')
    const dark = cleanStyle === 'dark' || cleanStyle === 'dark-accent' ? true : false
    return (
      <div data-dark={dark} className={className}>
        {children}
      </div>
    );
  }