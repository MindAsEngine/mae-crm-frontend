import styles from "./input.module.scss";
import React from "react";
import clsx from "clsx";

type InputProps = {
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    value: string,
    className: string,
    placeholder: string,
    type: string,
    before?: React.ReactNode,
    after?: React.ReactNode,
    readOnly?: boolean,
    props?: any,
    maxLength?: number,
    isValid?: boolean
}
export default function Input({
                                  onChange,
                                  props,
                                  readOnly,
                                  value,
                                  before,
                                  after,
                                  className,
                                  placeholder,
                                  type,
                                  maxLength,
                                    isValid
                              }: InputProps) {
    const [isFocused, setIsFocused] = React.useState(false);
    return (
        <div className={clsx(styles.inputContainer, isFocused && styles.focused,
            // isValid && styles.valid,
            isValid === false && styles.invalid,
            className)}>
            {before}
            <input
                {...props}
                // max={props?.maxValue}
                // min={props?.minValue}

                type={type}
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

                spellCheck={false}
                readOnly={readOnly}

            />
            {value?.length > 0 && after}
        </div>
    )
}