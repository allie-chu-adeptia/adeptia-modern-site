export default function cleanString(string: string) {
    if (!string) return ''
    return string.replace(/[\u200B-\u200D\uFEFF]/g, '').trim()
}