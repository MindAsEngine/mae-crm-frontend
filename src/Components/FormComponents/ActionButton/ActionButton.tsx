import React from "react";
import { Button } from "../Button/Button.tsx";
import styles from "./action.module.scss";
import clsx from "clsx";

type ActionButtonProps = {
    onClick: () => void; // Функция, вызываемая при клике
    stylizedAs: "blue-dark" | "white" | "blue-light"; // Ограничение возможных значений для стиля
    disabled?: boolean; // Кнопка может быть отключена
    name: "delete" | "edit" | "view"; // Ограничение возможных значений для имени
};

export default function ActionButton({
                                         onClick,
                                         stylizedAs,
                                         disabled = false, // Значение по умолчанию
                                         name
                                     }: ActionButtonProps) {
    const actions = name.split("|");
    return (
        <Button
            onClick={onClick}
            stylizedAs={stylizedAs}
            disabled={disabled}
            className={styles.actionButton}
        >
            <span
                className={clsx(
                    actions.map((action) => styles[action]),

                )}
            />
        </Button>
    );
}
