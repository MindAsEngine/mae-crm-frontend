import React from 'react';
import styles from "./loading.module.scss"
const Loading = ({title="Загрузка"}) => {
    return(
    <div className={styles.loading}>
                            <span></span>
        {title}...

                    </div>
    )}
export default Loading;