import * as React from "react";
import style from "./select.module.scss";
import {switchEnum} from "../../Table/switchEnum.tsx";
import {useEffect} from "react";

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
};


export default function Select({ name, title, options, selected, onChange, multiple = false }: SelectProps) {
    const [isOpen, setIsOpen] = React.useState(false);

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

    const isSelected = (option: OptionProps) => selected.some((s) => s.name === option.name);
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
    return (
        <div className={style.container} id={"select" + name}>
            <div className={style.label}>
                {title}
            </div>
            <div className={style.dropdown}>
                <div
                    className={`${style.toggle} ${isOpen ? style.active : ""}`}
                    onClick={toggleDropdown}
                >
                    {selected.length > 0
                        ? selected.map((s) =>
                            <span className={style.elemInToggle}> {switchEnum(s.title, name === "process" ? name : "notenum", true)}</span>)
                        : `Выберите ${title.toLowerCase()}`}
                </div>
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
        </div>
    );
}

