export default function ClearColor(str: string): string {
    return str.replace(/\\[(\d*)m/img, '');
}