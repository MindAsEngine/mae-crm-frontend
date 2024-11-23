import React from 'react'
import styles from './switch.module.scss'
import {NavLink} from "react-router-dom";
import clsx from "clsx";
export default function Switch() {
    return (
        <div className={styles.container}>

            <NavLink
                className={({isActive}) => clsx(isActive && styles.active, styles.item, styles.itemLeft)}
                to={'/tasks'}>Заявки
            </NavLink>
            <NavLink
                className={({isActive}) => clsx(isActive && styles.active, styles.item, styles.itemRight)}
                to={'/audience'}>Аудитория

            </NavLink>
            <span className={styles.switch}></span>


        </div>
    )
}