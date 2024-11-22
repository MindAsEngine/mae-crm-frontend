import * as React from 'react';
import styles from "./checkbox.module.scss"
import clsx from "clsx";
type CheckboxProps = {
    checked?: boolean;
    disabled?: boolean;
    onChange?: () => void;
    allCheckbox?: boolean;
    isAllUnchecked?: boolean;
    isAllChecked?: boolean;
}
export default function Checkbox({checked, disabled, onChange, allCheckbox=false, isAllUnchecked=true, isAllChecked}: CheckboxProps){
    if(allCheckbox) console.log(isAllChecked, isAllUnchecked, "all");
    return (
        <label className={
            clsx(
                styles.checkbox,
                allCheckbox && styles.all,
                checked && !allCheckbox && styles.checked,
                (isAllChecked || !isAllUnchecked) && allCheckbox && styles.checked,
                (allCheckbox && !isAllUnchecked && !isAllChecked) && styles.notAllChecked,
            )}>
            <input type={'checkbox'}
                   className={styles.hidden}
                   checked={checked}
                   onChange={onChange}
                   disabled={disabled}/>
        </label>
    )
}