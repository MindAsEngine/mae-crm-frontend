import styles from "./input.module.scss";
import React from "react";
import clsx from "clsx";

type InputProps = {
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    value: string
    className: string
    placeholder: string
    type: string,
    before?: React.ReactNode
    after?: React.ReactNode
    readOnly?: boolean

}
export default function Input({onChange, readOnly,value, before, after, className, placeholder, type}: InputProps) {
    const [isFocused, setIsFocused] = React.useState(false);
    return (
        <div className={clsx(styles.inputContainer, isFocused && styles.focused, className)}>
            {before}
            <input
                type={type}
                placeholder={placeholder}
                className={clsx(styles.input)}
                onChange={onChange}
                value={value}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                maxLength={50}
                autoComplete={"off"}
                spellCheck={false}
                readOnly={readOnly}
            />
            {value.length > 0 && after}
        </div>
    )
}