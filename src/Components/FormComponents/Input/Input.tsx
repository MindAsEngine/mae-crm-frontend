import styles from "./input.module.scss";
import React, {Component} from "react";
import clsx from "clsx";
import {is} from "date-fns/locale";

type InputProps = {
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    value: string,
    className: string,
    placeholder: string,
    type?: string,
    before?: React.ReactNode,
    after?: React.ReactNode,
    readOnly?: boolean,
    props?: any,
    maxLength?: number,
    isValid?: boolean,
    as?: any,
    name?: string
    isTouchedDefault?: boolean
}
export default function Input({
                                  onChange,
                                  // props,
    name, isTouchedDefault=false,
                                  readOnly,
                                  value,
                                  before,
                                  after,
                                  className,
                                  placeholder,
                                  type,
                                  maxLength,
                                    isValid,
                                    as: Component='input'
                              }: InputProps) {
    const [isFocused, setIsFocused] = React.useState(false);
    const [isTouched, setIsTouched] = React.useState(isTouchedDefault);
    return (

        <div
            onClick={() => setIsTouched(true)}
            className={clsx(styles.inputContainer, isFocused && styles.focused,
            // isValid && styles.valid,
                (isTouched||isTouchedDefault) && isValid === false && styles.invalid,
            className)}>
            {before}
            <Component

                type={type || "text"}
                placeholder={placeholder}
                className={clsx(styles.input)}
                onChange={onChange}
                value={value}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                maxLength={maxLength || 50}
                autoComplete={"new-password"}
                autoCorrect={"off"}
                autoCapitalize={"off"}
                name={name}
                spellCheck={false}
                readOnly={readOnly}

            />
            {value?.length > 0 && after}
        </div>
    )
}