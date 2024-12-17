import React from 'react';
import styles from "./error.module.scss";
const ErrorComponent = ({title="Ошибка загрузки данных"}) => {
    return(
    <div className={styles.error}>

        {title}...

                    </div>
    )}
export default ErrorComponent;