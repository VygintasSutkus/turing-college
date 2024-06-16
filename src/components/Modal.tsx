import React, {useEffect, useRef, useState} from "react";
import {Event} from "../App.tsx";
import {classNames, getRemainingTime, getTimeText, isLive, isToday, isTomorrow} from "../utils/utils.tsx";
import styles from "./Modal.module.scss";

type ModalProps = {
    event: Event;
    closeModal: () => void;
}
export const Modal: React.FC<ModalProps> = (props) => {
    const {closeModal, event} = props;

    const WAITING_TIME = 1000 * 60 * 15; // 15min

    const [now, setNow] = useState(Date.now());

    const ref = useRef<HTMLDialogElement>(null);

    useEffect(() => {
        ref.current?.showModal();
    }, []);

    useEffect(() => {
        let interval = null;
        interval = setInterval(() => {
            setNow(Date.now());
            }, 1000 * 60);

        return () => clearInterval(interval);
    }, [now]);

    const isEnded = now > new Date(event.end).getTime();
    const canJoin = (new Date(event.start).getTime() - now) < WAITING_TIME;
    const isLiveNow = isLive(event.start, event.end);

    const getTodayText = () => {
        if (isToday(event.start)) {
            return "Today"
        } else if (isTomorrow(event.start)) {
            return "Tomorrow"
        }
    }

    const timeText = `${getTodayText()} ${getTimeText(event.start)}-${getTimeText(event.end)}`;

    const startsInText = () => {
        const startDate = new Date(event.start).getTime();
        const endDate = new Date(event.end).getTime();

        const startDiff = startDate - now;
        const endDiff = now - endDate;

        if (endDiff > 0) {
            return "Event already happened";
        }

        if (startDiff < 0 && endDiff < 0) {
            return "Event is happening! Quick, join, join, join!"
        }

        if (startDiff > 0) {
            return `Starts in: ${getRemainingTime(startDiff)}`;
        }
    };

    const openInNewTab = () => {
        window.open(event.url, "_blank", "noreferrer");
    };

    const startTextClasses = classNames({
        [styles.startText]: true,
        [styles.live]: isLiveNow
    });

    return (
        <dialog
            ref={ref}
            onCancel={closeModal}
        >
            <div className={styles.close} onClick={closeModal}>x</div>
            <h2>{event.summary}</h2>
            <div className={styles.eventTime}>{timeText}</div>
            <div className={startTextClasses}>{startsInText()}</div>
            {!isEnded && <button disabled={!canJoin} className={"button"} onClick={openInNewTab}>
                Join meeting
            </button>}
        </dialog>
    );

}