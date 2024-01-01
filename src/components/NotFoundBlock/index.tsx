import React from 'react'
import styles from "./index.module.scss"

const NotFoundBlock: React.FC = () => {
    return (
        <div className={styles.root}>
            <h1>
                <span>😕</span>
                <br />Страница не найдена :(
            </h1>
        </div>
    )
}
export default NotFoundBlock