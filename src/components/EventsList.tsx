import React, {useMemo} from "react";
import {Event} from "../App.tsx";
import {EventItem} from "./EventItem.tsx";
import {isOverdue} from "../utils/utils.tsx";

import styles from "./EventsList.module.scss";

type EventsListProps = {
    events: Event[];
    onSelectEvent: (eventId: number) => void;
}

export const EventsList: React.FC<EventsListProps> = (props) => {

    const events = props.events;

    const filteredEvents = useMemo(
        (): Event[][] => {
            const today = new Date().setHours(0, 0, 0, 0);
            const tomorrow = today + 1000 * 60 * 60 * 24;

            const overdueEvents: Event[] = [];
            const todayEvents: Event[] = [];
            const tomorrowEvents: Event[] = [];

            events.map((event) => {
                const startDate = new Date(event.start).getTime();

                if (isOverdue(event)) {
                    overdueEvents.push(event);
                }
                if (startDate > today &&
                    startDate < tomorrow &&
                    !isOverdue(event)) {
                    todayEvents.push(event);
                }
                if (startDate > tomorrow) {
                    tomorrowEvents.push(event);
                }
            })

            return [overdueEvents, todayEvents, tomorrowEvents];
        }, [events])

    const getTodayTitle = (): string => {
        const today = new Date();
        return `${today.getMonth() + 1}-${today.getDate()}, Today`
    }

    const getTomorrowTitle = (): string => {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        return `${tomorrow.getMonth() + 1}-${tomorrow.getDate()}, Tomorrow`
    }

    return (
        <div className={styles.eventsList}>
            <div className={styles.container}>
                <h2>My schedule</h2>
                <div className={styles.block}>
                    <div className={styles.subtitle}>Overdue</div>
                    {filteredEvents[0].length === 0 && <div>You have no overdue events 🙌</div>}
                    {filteredEvents[0].length > 0 &&
                        filteredEvents[0].map((event) => (
                            <EventItem key={event.id} event={event} onSelectEvent={props.onSelectEvent}/>
                        ))
                    }
                </div>

                <div className={styles.block}>
                    <div className={styles.subtitle}>{getTodayTitle()}</div>
                    {filteredEvents[1].length === 0 && <div>No events today. 🎉</div>}
                    {filteredEvents[1].length > 0 &&
                        filteredEvents[1].map((event) => (
                            <EventItem key={event.id} event={event} onSelectEvent={props.onSelectEvent}/>
                        ))
                    }
                </div>

                <div className={styles.block}>
                    <div className={styles.subtitle}>{getTomorrowTitle()}</div>
                    {filteredEvents[2].length === 0 && <div>No events tomorrow. 🎉</div>}
                    {filteredEvents[2].length > 0 &&
                        filteredEvents[2].map((event) => (
                            <EventItem key={event.id} event={event} onSelectEvent={props.onSelectEvent}/>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}