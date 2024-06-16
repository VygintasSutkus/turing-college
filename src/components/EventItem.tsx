import React from "react";
import {Event} from "../App.tsx";
import {MeetingCategory} from "../types.ts";
import {getTimeText, classNames, isLive, isOverdue} from "../utils/utils.tsx";
import styles from "./EventItem.module.scss"

type EventItemProps = {
    event: Event,
    onSelectEvent: (eventID: number) => void
}

export const EventItem: React.FC<EventItemProps> = (props) => {

    const {event, onSelectEvent} = props;

    const now = Date.now();
    const endDate = new Date(event.end).getTime();

    const isOverdueEvent: boolean = isOverdue(event)
    const isLiveEvent =  isLive(event.start, event.end);
    const isPast = now > endDate;

    const getEventTypeText = () => {
        if (event.category && event.category === MeetingCategory.Meeting) {
            return "MEETING";
        } else if (event.category && event.category === MeetingCategory.OpenSession) {
            return "SESSION";
        } else {
            return "CORRECTION";
        }
    }

    const eventClasses = classNames({
        [styles.event]: true,
        [styles.live]: isLiveEvent,
        [styles.past]: isPast && !isOverdueEvent
    });

    const typeClasses = classNames({
        [styles.type]: true,
        [styles.meeting]: event.category && event.category === MeetingCategory.Meeting,
        [styles.session]: event.category && event.category === MeetingCategory.OpenSession,
        [styles.review]: event.state,
    });

    const selectEventHandler = () => {
        if (!isOverdueEvent) {
            onSelectEvent(event.id);
        }
    }

    return (
        <div className={eventClasses} title={event.summary} onClick={selectEventHandler}>
            <div className={styles.summary}>
                <div className={styles.title}>{event.summary}</div>
                <div className={typeClasses}>{getEventTypeText()}</div>
            </div>
            {isLiveEvent && <div className={styles.liveTitle}>Live</div>}
            <div className={styles.date}>
                {isOverdueEvent && <div className={styles.overdueTitle}>Overdue</div>}
                {!isOverdueEvent && <>
                    <div className={styles.startTime}>{getTimeText(event.start)}</div>
                    <div className={styles.endTime}>{getTimeText(event.end)}</div>
                </>}
            </div>
        </div>
    )
}
