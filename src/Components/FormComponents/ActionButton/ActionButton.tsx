import * as React from "react";
import {Button} from "../Button/Button.tsx";
import styles from "./action.module.scss";
import clsx from "clsx";

export default function ActionButton({onClick, stylizedAs, disabled, name}) {
    return (
        <Button
            onClick={onClick}
            stylizedAs={stylizedAs}
            disabled={disabled}
            className={styles.actionButton}
        >
            <span className={clsx( name === 'delete' && styles.delete,
                name === 'edit' && styles.edit,
                name === 'view' && styles.view,)}/>
        </Button>
    )
}