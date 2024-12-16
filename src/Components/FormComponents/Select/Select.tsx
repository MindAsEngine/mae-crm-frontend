import * as React from "react";
import style from "./select.module.scss";
import {switchEnum} from "../../Table/switchEnum.tsx";
import {useEffect} from "react";
import clsx from "clsx";

type OptionProps = {
    title: string;
    name: string;
};

type SelectProps = {
    name: string;
    title: string;
    options: OptionProps[];
    selected: OptionProps[]; // Updated type
    onChange?: (selected: OptionProps[]) => void; // Callback for parent
    multiple?: boolean; // Allow single/multiple select
    isValid?: boolean;
    required?: boolean;
    isTouchedDefault?: boolean
};


export default function Select({required=false, name, title, options, isTouchedDefault=false,selected, onChange, multiple = false, isValid=true }: SelectProps) {
    const [isOpen, setIsOpen] = React.useState(false);
    const [isTouched, setIsTouched] = React.useState(isTouchedDefault);
    const toggleDropdown = () => setIsOpen(!isOpen);
    const handleOptionClick = (option: OptionProps) => {
        let newSelected: OptionProps[];
        if (multiple) {
            // Toggle selection in multiple mode
            newSelected = selected.some((s) => s.name === option.name)
                ? selected.filter((s) => s.name !== option.name)
                : [...selected, option];
        } else {
            // Replace selection in single-select mode
            newSelected = [option];
            setIsOpen(false); // Close dropdown after selection
        }
        onChange && onChange(newSelected);
    };
    const handleUnselectOne = (option: OptionProps) => {
        onChange && onChange(selected.filter((s) => s.name !== option.name));
    }
    const isSelected = (option: OptionProps) => selected?.some((s) => s.name === option.name);
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            const select = document.getElementById("select" + name);
            if (select && !select.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);

    }, [name]);
    // console.log(selected, "se")
    return (
        <div className={style.container} id={"select" + name}
                onClick={() => setIsTouched(true)}>
            <div className={clsx(style.label, required && style.required)}>
                {title}
            </div>
            {/*<div className={style.dropdown}>*/}
                <div
                    className={clsx(style.toggle, !isValid && (isTouched || isTouchedDefault)  && style.invalid, isOpen && style.active)}
                    onClick={toggleDropdown}
                >
                    {selected?.length > 0
                        ? selected.map((s, index) =>
                            <span className={style.elemInToggle} key={index}>
                                {switchEnum(name === "process" ? s.name : s.title, name === "process" ? name : "notenum", true,
                                    () => handleUnselectOne(s)
                                )}
                            </span>)
                        : `Выберите ${title.toLowerCase()}`}

                {isOpen && (
                    <ul className={style.menu}>
                        {options.map((option) => (
                            <li
                                key={option.name}
                                className={`${style.option} ${
                                    isSelected(option) ? style.selected : ""
                                }`}
                                onClick={() => handleOptionClick(option)}
                            >
                                {option.title}
                            </li>
                        ))}
                    </ul>
                )}
                </div>
            {/*</div>*/}
        </div>
    );
}

