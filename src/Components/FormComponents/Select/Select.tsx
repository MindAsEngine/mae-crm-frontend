import * as React from "react";
import style from "./select.module.scss";

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
    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedOptions = Array.from(event.target.selectedOptions).map(opt => ({
            name: opt.value,
            title: opt.textContent || ""
        }));
        onChange && onChange(selectedOptions); // Trigger parent callback
    };

    return (
        <div className={style.container}>
            <label htmlFor={name} className={style.label}>
                {title}
            </label>
            <select
                name={name}
                id={name}
                className={style.select}
                multiple={multiple}

                onChange={handleChange}
                value={selected.map(s => s.name)}
            >
                {selected.length === 0 && !multiple && (
                    <option value="" disabled hidden selected={true}>
                        Выберите {title.toLowerCase()}
                    </option>
                )}
                {options.map((option, index) => (
                    <option key={index}
                            value={option.name}
                            className={style.option}
                            selected={selected.some(s => s.name === option.name)}
                    >
                        {option.title}
                    </option>
                ))}
            </select>
        </div>
    );
}
