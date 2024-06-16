import {Event} from "../App.tsx";
import {ReviewState} from "../types.ts";

export function pad(n: number) {
    return n<10 ? "0"+n : n;
}

export function getTimeText (date: Date) {
    date = new Date(date);
    return `${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

export function isToday (date: Date) {
    const now = new Date()
    date = new Date(date);
    return date.getDate() === now.getDate() &&
        date.getMonth() === now.getMonth() &&
        date.getFullYear() === now.getFullYear()
}

export function isTomorrow (date: Date) {
    const now = new Date()
    date = new Date(date);
    const tomorrow = new Date(now.setDate(now.getDate() + 1));

    return date.getDate() === tomorrow.getDate() &&
        date.getMonth() === tomorrow.getMonth() &&
        date.getFullYear() === tomorrow.getFullYear()
}

export function isLive(start: Date, end: Date) {
    const now = Date.now();
    const startDate = new Date(start).getTime();
    const endDate = new Date(end).getTime();
    return startDate < now && now < endDate;
}

export function isOverdue(event: Event) {
    const now = Date.now();
    return (new Date(event.end).getTime() < now) && event.state && (event.state !== ReviewState.Completed)
}

export function getRemainingTime (time: number): string {
    const totalMinutes = Math.floor(time / (1000 * 60));

    const days = Math.floor(totalMinutes / (24 * 60));

    const hours = Math.floor((totalMinutes % (24 * 60)) / 60);

    const minutes = totalMinutes % 60;

    return `${days > 0 ? days + "d" : ""} 
    ${hours > 0 ? hours + "h" : ""} 
    ${minutes > 0 ? minutes + "min" : ""}`;
}

export function classNames(setup: {[className: string]: boolean}): string {
    const classes: string[] = [];

    for (const setupKey in setup) {
        if (setup[setupKey]) classes.push(setupKey);
    }

    return classes.join(" ");
}