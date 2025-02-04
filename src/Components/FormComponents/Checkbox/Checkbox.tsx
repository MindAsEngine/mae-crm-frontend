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
    name?: string;
}
export default function Checkbox({checked, name, disabled, onChange, allCheckbox=false, isAllUnchecked=true, isAllChecked}: CheckboxProps){
    // if(allCheckbox) console.log(isAllChecked, isAllUnchecked, "all");
    const [isFocused, setIsFocused] = React.useState(false);
    return (
        <label
            className={
            clsx(
                styles.checkbox,
                allCheckbox && styles.all,
                checked && !allCheckbox && styles.checked,
                (isAllChecked || !isAllUnchecked) && allCheckbox && styles.checked,
                (allCheckbox && !isAllUnchecked && !isAllChecked) && styles.notAllChecked,
                isFocused && styles.focused,
            )}
               >
            <input

                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                name={name}
                type={'checkbox'}
                className={styles.hidden}
                   checked={checked}
                   onChange={onChange}
                   disabled={disabled}/>
        </label>
    )
}