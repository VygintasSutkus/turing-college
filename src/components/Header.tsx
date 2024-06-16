import React from "react";
import {Event} from "../App.tsx";
import styles from "../App.module.scss"
import {getTimeText} from "../utils/utils.tsx";

type HeaderProps = {
    event?: Event;
}

export const Header: React.FC<HeaderProps> = (props) => {
   const {event} = props;

    const openInNewTab = () => {
        window.open(event?.url, "_blank", "noreferrer");
    };

    return (
        <div className={styles.header}>
            {event && <button onClick={openInNewTab} className="button">
                {`${event.summary} at ${getTimeText(event.start)}`}
            </button>}
        </div>
    )
}