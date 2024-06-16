import {useCallback, useEffect, useState} from "react";

import styles from './App.module.scss';
import {MeetingCategory, ReviewState} from "./types.ts";
import {EventsList} from "./components/EventsList.tsx";
import {Modal} from "./components/Modal.tsx";
import {Header} from "./components/Header.tsx";
import {isLive} from "./utils/utils.tsx";
import {Content} from "./components/Content.tsx";

interface BasicEvent {
    id: number,
    summary: string,
    url: string,
    start: Date,
    end: Date
}

export interface Meeting extends BasicEvent	{
    category: MeetingCategory,
}

export interface Review extends BasicEvent{
    state: ReviewState
}

export type Event = Review | Meeting;

export const App = () => {

    const [events, setEvents] = useState<Event[]>([])
    const [selectedId, setSelectedId] = useState<number | undefined>(undefined)

    const getSortedEvents = useCallback(
        (events: Event[]) => events.sort((a, b) => {
            const aStart = new Date(a.start);
            const bStart = new Date(b.start);
            return aStart.getTime() - bStart.getTime()
        }),
        []
    );

    const fetchEvents = useCallback(() => {
        Promise.all([fetch('./meetings.json'), fetch('./reviews.json')])
            .then( ([res1, res2]) => {
                return Promise.all([res1.json(), res2.json()])
            })
            .then( ([meetingsJSON, reviewsJSON]) => {
                const events = [...meetingsJSON, ...reviewsJSON];
                const sortedEvents = getSortedEvents(events)
                setEvents(sortedEvents)
            })
            .catch((e) => console.warn(e))
    }, [getSortedEvents])

    useEffect(() => {
        fetchEvents();

        let interval = null;
        interval = setInterval(() => {
            fetchEvents()
        }, 1000 * 60 * 5);

        return () => clearInterval(interval);
    }, [fetchEvents]);

    const selectEventHandler = (eventId: number) => {
        setSelectedId(eventId)
    }

    const closeModal = () => {
        setSelectedId(undefined);
    }

    const selectedEvent = events.find((event) => event.id === selectedId);

    const liveEvent = events.find((event) => {
        return isLive(event.start, event.end)
    });

  return (
      <>
          <div className={styles.container}>
              <Header event={liveEvent}/>
              <EventsList events={events} onSelectEvent={selectEventHandler}/>
              <Content/>
          </div>
          {selectedEvent && <Modal event={selectedEvent} closeModal={closeModal}/>}
      </>

  )
}

