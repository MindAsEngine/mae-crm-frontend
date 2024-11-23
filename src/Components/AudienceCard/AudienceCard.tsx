import {format, subMonths} from "date-fns";
import React from "react";
import styles from './card.module.scss'
import {Button} from "../FormComponents/Button/Button.tsx";
import clsx from "clsx";
import Checkbox from "../FormComponents/Checkbox/Checkbox.tsx";

type AudienceCardProps = {
    id: number;
    title: string;
    duration: string;
    created: Date;
    updated: Date;
    connected: {
        title: string;
        url?: string;
    }[]
}



export default function AudienceCard({...audienceData}: AudienceCardProps) {
const {id, title, duration, created, updated, connected} = audienceData;
return (
    <div className={styles.card}>
        <div className={styles.header}>
            <div className={styles.title}>
                <Checkbox/>
                <div className={styles.text}>
                        {title}
                </div>
                </div>
                <Button className={styles.settingButton}
                        stylizedAs={'white'}
                >
                    <span className={styles.icon}/>
                    <ul className={styles.actionsList}>
                        <li className={clsx(styles.item, styles.options)}>
                            Опции
                        </li>
                        <li className={styles.item} onClick={
                            () => {
                                console.log('Подключить рекламу', id)
                            }
                        }>
                            Подключить рекламу
                        </li>
                        <li className={styles.item}
                            onClick={
                                () => {
                                    console.log('Отключить рекламу', id)
                                }
                            }>
                            Отключить рекламу
                        </li>
                        <li className={clsx(styles.item, styles.delete)}
                            onClick={
                                () => {
                                    console.log('Удалить', id)
                                }
                            }>
                            Удалить
                        </li>
                    </ul>

                </Button>
            </div>
            <div className={styles.content}>
            <div className={styles.text}>
                Время отправки: {duration}
            </div>
        </div>
        <div className={styles.footer}>
            <div className={styles.info}>
                <div className={styles.item}>
                    Создано: {format(created, 'dd.MM.yyyy')} в {format(created, 'HH:mm')}
                </div>
                <div className={styles.item}>
                    Обновлено: {format(updated, 'dd.MM.yyyy')} в {format(updated, 'HH:mm')}
                </div>
            </div>
            <div className={styles.connections}>
                {connected.map((item, index) => (
                    <span key={index} className={styles.item}></span>

                ))}
            </div>
        </div>
    </div>

)
}