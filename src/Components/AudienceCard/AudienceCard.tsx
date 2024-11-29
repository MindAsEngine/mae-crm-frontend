import { format } from "date-fns";
import React, { useEffect } from "react";
import styles from './card.module.scss';
import { Button } from "../FormComponents/Button/Button.tsx";
import clsx from "clsx";
import Checkbox from "../FormComponents/Checkbox/Checkbox.tsx";
import Confirmed from "../Forms/Confirmed/Confirmed.tsx";

type AudienceCardProps = {
    id: number;
    title: string;
    duration: string;
    created: Date;
    updated: Date;
    connected: {
        title: string;
        url?: string;
    }[];
    chosen?: [];
    setChosen?: (nevers: never[]) => void;
};

export default function AudienceCard({ ...audienceData }: AudienceCardProps) {
    const { id, title, duration, created, updated, connected, chosen, setChosen } = audienceData;
    const [isOptionsOpen, setIsOptionsOpen] = React.useState(false);
    const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = React.useState(false);
    const [isConfirmDisconnectOpen, setIsConfirmDisconnectOpen] = React.useState(false);
    const [isModalConnectOpen, setIsModalConnectOpen] = React.useState(false);

    useEffect(() => {
        const handleClick = (event: MouseEvent) => {
            const actionListElement = document.getElementById('actionList');
            if (actionListElement && !event.composedPath().includes(actionListElement)) {
                // console.log(event.composedPath());
                setIsOptionsOpen(false);
            }
        };
        document.addEventListener('click', handleClick);
        return () => {
            document.removeEventListener('click', handleClick);
        };
    }, []);

    return (
        <div className={styles.card}>
            <div className={styles.header}>
                <div className={styles.title}>
                    <Checkbox name={title}
                                checked={chosen.filter((item) => item === id).length > 0}
                                disabled={false}
                                onChange={(e) => {
                                    if (typeof setChosen !== 'function') return;
                                    if (e.target.checked && !chosen.includes(id)) {
                                        setChosen(prev => [...prev, id]);
                                    } else if (!e.target.checked && chosen.includes(id)) {
                                        setChosen(prev => prev.filter((item) => item !== id));
                                    }
                                    // console.log('Выбрано', id)

                                }}
                    />
                    <div className={styles.text}>
                        {title}
                    </div>
                </div>
                <Confirmed description={"Вы уверены, что хотите удалить аудиторию?"}
                           isOpen={isConfirmDeleteOpen}
                           onConfirm={() => console.log('Удалить', id)}
                           setIsOpen={setIsConfirmDeleteOpen}
                           title={"Удалить"}/>
                <Confirmed description={"Вы уверены, что хотите отключить рекламу?"}
                           isOpen={isConfirmDisconnectOpen}
                           onConfirm={() => console.log('Отключить рекламу', id)}
                           setIsOpen={setIsConfirmDisconnectOpen}
                           title={"Отключить рекламу"}/>

                <Button
                    as={'div'}
                    className={clsx(styles.settingButton, isOptionsOpen && styles.opened)}
                    stylizedAs={'white'}
                    onClick={() => {
                        setIsOptionsOpen(!isOptionsOpen);
                    }}
                >
                    <span className={styles.icon} />
                    <div className={styles.settingArea}>
                        <ul className={clsx(styles.actionsList)} id={"actionList"}>
                            <li className={clsx(styles.item, styles.options)}>
                                Опции
                            </li>
                            <a className={styles.item} onClick={() => console.log('Подключить рекламу', id)}>
                                Подключить рекламу
                            </a>
                            <a className={styles.item} onClick={() => {setIsConfirmDisconnectOpen(true);}}>Отключить рекламу</a>
                            <span className={styles.divider} />
                            <a className={clsx(styles.item, styles.delete)} onClick={() => setIsConfirmDeleteOpen(true)}>Удалить</a>
                        </ul>
                    </div>
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
                        <span key={index} className={clsx(styles.item, item.title && styles[item.title])} />
                    ))}
                </div>
            </div>
        </div>
    );
}
