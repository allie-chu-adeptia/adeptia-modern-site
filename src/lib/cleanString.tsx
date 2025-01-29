export default function cleanString(string: string) {
    return string.replace(/[\u200B-\u200D\uFEFF]/g, '').trim()
}