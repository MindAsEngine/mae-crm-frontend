import styles from "./statusPlate.module.scss"
import {statusEnum} from "./data.ts";
import * as React from "react";
import clsx from "clsx";


type StatusPlateProps = {
    name: 'rejection' | 'completed' | 'terminated' | 'deferred' | 'no-purpose' | 'booked',
    inEdit: boolean,
    onClick?: () => void,
    color?: 'red' | 'green' | 'grey' | 'yellow'
}
export default function StatusPlate({name, inEdit=false, color=undefined, onClick=()=>{}}: StatusPlateProps) {
    const statusInfo = statusEnum.find(stInfo => stInfo.title === name);
    // const statusDefault = statusEnum.find(stInfo => stInfo.name === 'default');

    return (
        <div className={clsx(
            styles.container,
            styles[statusInfo?.color || color || 'grey'],
        )}>

            <span className={styles.text}>{statusInfo?.title|| name || "" }</span>
            {inEdit && <span className={styles.close}
                onClick={onClick}
                />}
        </div>
    )
}