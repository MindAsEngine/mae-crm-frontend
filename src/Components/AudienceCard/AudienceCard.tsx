import {format, parseISO} from "date-fns";
import React, {useEffect, useState} from "react";
import styles from './card.module.scss';
import { Button } from "../FormComponents/Button/Button.tsx";
import clsx from "clsx";
import Checkbox from "../FormComponents/Checkbox/Checkbox.tsx";
import Confirmed from "../Forms/Confirmed/Confirmed.tsx";

type AudienceCardProps = {
    id: number;
    name: string;
    duration: string;
    created_at: Date;
    updated_at: Date;
    integrations: {
        cabinet_name: string
    }[];
    chosen?: [];
    setChosen?: (nevers: never[]) => void;
    setInitToReload?: () => void;
    setIsModalConnectOpen: (id) => void;
};
const apiUrl = import.meta.env.VITE_API_URL;


export default function AudienceCard({ ...audienceData }: AudienceCardProps) {
    const { id, name, updated_at, created_at, integrations, chosen, setChosen,setInitToReload, setIsModalConnectOpen} = audienceData;

    const [created_, setCreated_] = React.useState(created_at);
    const [updated_, setUpdated_] = React.useState(updated_at);

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
        setCreated_(format(parseISO(created_at), 'dd.MM.yyyy') + ' в ' + format(parseISO(created_at), 'HH:mm'));
        setUpdated_(format(parseISO(updated_at), 'dd.MM.yyyy') + ' в ' + format(parseISO(updated_at), 'HH:mm'));
        } catch (e) {
            console.log(e);
            setCreated_(created_at);
            setUpdated_(updated_at);}
    }, [created_at, updated_at]);
    const handleDelete = () => {
        fetch(apiUrl+`/audiences/${id}`, {
            method: 'DELETE',
            headers: {
                // 'Content-Type': 'application/json'
            },
            }
        ).then((res) => {
            if (res.ok) {
                setInitToReload(true);
                setIsConfirmDeleteOpen(false);
            }

            }
        ).catch((err) => {
            console.log(err);
            setIsConfirmDeleteOpen(false);

            })
    };


const handleDisconnect = () => {
    fetch(apiUrl+`/audiences/${id}/disconnect`,{
        method: 'DELETE',
        headers: {
            // 'Content-Type': 'application/json'
        },
    }).then((res) => {
        if (res.ok) {
            setInitToReload(true);
            setIsConfirmDisconnectOpen(false);
        }
    }).
        catch((err) => {
            console.log(err);
        setIsConfirmDeleteOpen(false);
            })
        }
    const [exportClicked, setExportClicked] = useState(false);

    const handleExportClick = () => {
        setExportClicked(true);
    }

    useEffect(() => {

        const handleExport = async () => {
            await fetch(apiUrl+`/audiences/${id}/export`, {
                method: 'GET',

            }).then(res => {
                // console.log(res);
                if (!res.ok) {
                    throw new Error('Ошибка при получении файла');
                }
                return res.blob();
            }).then((blob) => {
                const url = window.URL.createObjectURL(new Blob([blob]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', `audiences_${format(new Date(), "yyyy-MM-dd")}.xlsx`);
                document.body.appendChild(link);
                link.click();
                link?.parentNode?.removeChild(link);
                window.URL.revokeObjectURL(url);
            }).catch(err => {
                    console.log(err)
                }
            ).finally(() => {
                setExportClicked(false);
            });
        }
        if (exportClicked) {
            handleExport();
        }
    }, [exportClicked]);

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
                            <a className={styles.item} onClick={() => {
                                handleExportClick()
                            }}>
                            Экспорт аудитории
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
                    Время последней отправки: {updated_}
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
                    {Array.isArray(integrations) && integrations.map((item, index) => (
                        <span key={index} className={clsx(styles.item, item.cabinet_name && styles[item.cabinet_name])} />
                    ))}
                </div>
            </div>
        </div>
    );
}
