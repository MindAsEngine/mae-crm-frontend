import * as React from 'react';
import styles from "./checkbox.module.scss"
import clsx from "clsx";
type CheckboxProps = {
    checked?: boolean;
    disabled?: boolean;
    onChange?: () => void;
    allCheckbox?: boolean;
}
export default function Checkbox({checked, disabled, onChange, allCheckbox=false}: CheckboxProps){
    return (
        <label className={
            clsx(
                styles.checkbox,
                checked && styles.checked,
                allCheckbox && styles.all
            )}>
            <input type={'checkbox'}
                   className={styles.hidden}
                   checked={checked}
                   onChange={onChange}
                   disabled={disabled}/>
        </label>
    )
}