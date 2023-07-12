export const getLastActive = (param: string) => {
    const lastActive: Date = new Date(param);
    const now: Date = new Date();
    const timeGapInMs: number = now.getTime() - lastActive.getTime();
    const secondsInMs: number = 1000;
    const minutesInMs: number = 60 * secondsInMs;
    const hoursInMs: number = 60 * minutesInMs;
    const daysInMs: number = 24 * hoursInMs;
    const monthsInMs: number = 30 * daysInMs;
    const yearsInMs: number = 12 * monthsInMs;

    if (!param) {
        return "Unidentified"
    } else if (timeGapInMs < secondsInMs) {
        return `less than a second`;
    } else if (timeGapInMs < minutesInMs) {
        const timeGapInSeconds: number = Math.floor(timeGapInMs / secondsInMs);
        return `${timeGapInSeconds} seconds ago`;
    } else if (timeGapInMs < hoursInMs) {
        const timeGapInMinutes: number = Math.floor(timeGapInMs / minutesInMs);
        return `${timeGapInMinutes} minutes ago`;
    } else if (timeGapInMs < daysInMs) {
        const timeGapInHours: number = Math.floor(timeGapInMs / hoursInMs);
        return `${timeGapInHours} hours ago`;
    } else if (timeGapInMs < monthsInMs) {
        const timeGapInDays: number = Math.floor(timeGapInMs / daysInMs);
        return `${timeGapInDays} days ago`;
    } else if (timeGapInMs < yearsInMs) {
        const timeGapInMonths: number = Math.floor(timeGapInMs / monthsInMs);
        return `${timeGapInMonths} months ago`;
    } else {
        const timeGapInYears: number = Math.floor(timeGapInMs / yearsInMs);
        return `${timeGapInYears} years ago`;
    }
}