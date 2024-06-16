import React from "react";
import styles from "../App.module.scss"

export const Content: React.FC = () => {
    return (
        <div className={styles.content}>
            <div className={styles.box}>
                <div className={styles.inner}>
                    <h1>
                        The standard Lorem Ipsum passage, used since the 1500s
                    </h1>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
                        ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                        ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit
                        in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                        cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        ipisci velit, sequaerat voluptullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur?
                        Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel
                        ui dolorem eum fugiat quo voluptas nulla pariatur?
                    </p>
                </div>
            </div>
        </div>
    )
}