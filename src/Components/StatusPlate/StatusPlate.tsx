import styles from "./statusPlate.module.scss"
import {statusEnum} from "./data.ts";
import * as React from "react";
import clsx from "clsx";


type StatusPlateProps = {
    name: 'rejection' | 'completed' | 'terminated' | 'deferred' | 'no-purpose' | 'booked',
    inEdit: boolean,
    onClick: () => void
}
export default function StatusPlate({name, inEdit=false, onClick=()=>{}}: StatusPlateProps) {
    const statusInfo = statusEnum.find(stInfo => stInfo.name === name);
    const statusDefault = statusEnum.find(stInfo => stInfo.name === 'default');

    return (
        <div className={clsx(
            styles.container,
            styles[statusInfo?.color || statusDefault?.color || 'grey'],
        )}>

            <span className={styles.text}>{statusInfo?.title|| name || statusDefault?.title }</span>
            {inEdit && <span className={styles.close}
                onClick={onClick}
                />}
        </div>
    )
}