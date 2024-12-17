import {format, parseISO} from "date-fns";
import React, { useEffect } from "react";
import styles from './card.module.scss';
import { Button } from "../FormComponents/Button/Button.tsx";
import clsx from "clsx";
import Checkbox from "../FormComponents/Checkbox/Checkbox.tsx";
import Confirmed from "../Forms/Confirmed/Confirmed.tsx";
import AdvertCreate from "../Forms/Advert/AdvertCreate.tsx";

type AudienceCardProps = {
    id: number;
    name: string;
    duration: string;
    created: Date;
    updated: Date;
    integrated: {
        cabinet: {
            title: string;
            id: number;
        }
    }[];
    chosen?: [];
    setChosen?: (nevers: never[]) => void;
    setInitToReload?: () => void;
    setIsModalConnectOpen: (id) => void;
};
const apiUrl = import.meta.env.VITE_API_URL;


export default function AudienceCard({ ...audienceData }: AudienceCardProps) {
    const { id, name, duration, created, updated, integrated, chosen, setChosen,setInitToReload, setIsModalConnectOpen} = audienceData;

    const [created_, setCreated_] = React.useState(created);
    const [updated_, setUpdated_] = React.useState(updated);

    const [isOptionsOpen, setIsOptionsOpen] = React.useState(false);
    const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = React.useState(false);
    const [isConfirmDisconnectOpen, setIsConfirmDisconnectOpen] = React.useState(false);

    useEffect(() => {
        const handleClick = (event: MouseEvent) => {
            const actionListElement = document.getElementById('actionList');
            if (actionListElement && !event.composedPath().includes(actionListElement)) {
                setIsOptionsOpen(false);
            }
        };
        document.addEventListener('click', handleClick);
        return () => {
            document.removeEventListener('click', handleClick);
        };
    }, []);
    useEffect(() => {
        try{
        setCreated_(format(parseISO(created), 'dd.MM.yyyy') + ' в ' + format(parseISO(created), 'HH:mm'));
        setUpdated_(format(parseISO(updated), 'dd.MM.yyyy') + ' в ' + format(parseISO(updated), 'HH:mm'));
        } catch (e) {
            console.log(e);
            setCreated_(created);
            setUpdated_(updated);}
    }, [created, updated]);
    const handleDelete = () => {
        fetch(apiUrl+`/audiences/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            }
        ).then((res) => {
            console.log(res);
            console.log('Удалить', id)
            setInitToReload(true);
            }
        ).catch((err) => {
            console.log(err);
            })
    };


const handleDisconnect = () => {
    fetch(apiUrl+`/audiences/${id}/disconnect`,{
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
    }).then((res) => {
            console.log(res);
            console.log('Отключить', id)
            setInitToReload(true);
            }).
        catch((err) => {
            console.log(err);
            })
        }

    return (
        <div className={styles.card}>
            <div className={styles.header}>
                <div className={styles.title}>
                    <Checkbox name={name}
                                checked={chosen.filter((item => item.name === id))?.length > 0 }
                                disabled={false}
                                onChange={(e) => {
                                    if (typeof setChosen !== 'function') return;
                                    if (e.target.checked && chosen?.filter((item => item.name === id))) {
                                        setChosen(prev => [...prev, {"title": name, "name": id}]);
                                    }
                                    else if (!e.target.checked && chosen?.filter((item => item.name !== id))) {
                                        setChosen(prev => prev.filter(item => item.name !== id));
                                    }
                                }}
                    />
                    <div className={styles.text}>
                        {name}
                    </div>
                </div>
                <Confirmed description={"Вы уверены, что хотите удалить аудиторию?"}
                           isOpen={isConfirmDeleteOpen}
                           onConfirm={() => handleDelete() }
                           setIsOpen={setIsConfirmDeleteOpen}
                           title={"Удалить"}/>
                <Confirmed description={"Вы уверены, что хотите отключить рекламу?"}
                           isOpen={isConfirmDisconnectOpen}
                           onConfirm={() => handleDisconnect()}
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
                            <a className={styles.item} onClick={() => {
                                setChosen([{"title": name, "name": id}]);
                                setIsModalConnectOpen(true);}
                            }>
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
                        Создано: {created_}
                    </div>
                    <div className={styles.item}>
                        Обновлено: {updated_}
                    </div>
                </div>
                <div className={styles.connections}>
                    {integrated.map((item, index) => (
                        <span key={index} className={clsx(styles.item, item.cabinet.title && styles[item.cabinet.title])} />
                    ))}
                </div>
            </div>
        </div>
    );
}
