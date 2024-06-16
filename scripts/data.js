import { writeFileSync } from "fs";

const JSONToFile = (obj, filename) =>
    writeFileSync(`public/${filename}.json`, JSON.stringify(obj, null, 2));

const now = new Date();

export const MEETINGS = [
    {
        id: 1,
        summary: "Meeting 1",
        url: "url1",
        category: "meeting",
        start: new Date(now.getTime() + 1000 * 60 * 30),
        end: new Date(now.getTime() + 1000 * 60 * 90)
    },
    {
        id: 2,
        summary: "Meeting 2",
        url: "url2",
        category: "open_session",
        start: new Date(now.getTime() - 1000 * 60 * 30),
        end: new Date(now.getTime() + 1000 * 60 * 30)
    },
    {
        id: 3,
        summary: "Meeting 3",
        url: "url3",
        category: "meeting",
        start: new Date(now.getTime() - 1000 * 60 * 90),
        end: new Date(now.getTime() - 1000 * 60 * 30)
    }
];

export const REVIEWS = [
    {
        id: 4,
        summary: "Review 4",
        url: "url4",
        state: "pending",
        start: new Date(now.getTime() + 1000 * 60 * 10),
        end: new Date(now.getTime() + 1000 * 60 * 30)
    },
    {
        id: 5,
        summary: "Review 5",
        url: "url5",
        state: "in_progress",
        start: new Date(now.getTime() - 1000 * 60 * 30),
        end: new Date(now.getTime() - 1000 * 60 * 10)
    },
    {
        id: 6,
        summary: "Review 6",
        url: "url6",
        state: "completed",
        start: new Date(now.getTime() + 1000 * 60 * 30),
        end: new Date(now.getTime() + 1000 * 60 * 60)
    },
    {
        id: 7,
        summary: "Review 7",
        url: "url7",
        state: "in_progress",
        start: new Date(now.getTime() + 1000 * 60 * 60 * 26),
        end: new Date(now.getTime() + 1000 * 60 * 60 * 27)
    }
]

JSONToFile(MEETINGS, 'meetings');
JSONToFile(REVIEWS, 'reviews');