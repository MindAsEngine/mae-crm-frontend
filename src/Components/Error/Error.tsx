import React from 'react';
import styles from "./error.module.scss";
const Error = ({title="Ошибка загрузки данных"}) => {
    return(
    <div className={styles.error}>

        {title}...

                    </div>
    )}
export default Error;