import {useEffect, useRef} from "react";
import * as React from "react";
import styles from './modal.module.scss'
import clsx from "clsx";
import {Button} from "../FormComponents/Button/Button.tsx";
type ModalProps = {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    title: string;
    children: React.ReactNode;
    whiteButtonText?: string;
    onClickWhiteButton?: () => void;
    // argWhiteButton: any;
    darkBlueButtonText?: string;
    onClickDarkBlueButton?: () => void;
    classNameModal?: string;
    classNameContent?: string;
    classNameWindow?: string;
    classNameFooter?: string;
    classNameHeader?: string;
    isDropDown?: boolean;
    as?: any;
    needScroll?:boolean;
    handleSubmit?: () => void;
    onClose?: () => void;
    stylizedAs?: "red" | "blue-dark" | "blue-light" | "white",


}
export default function Modal({
                                  isOpen,
                                  handleSubmit,
                                  as: Component = "div",
                                  needScroll = false,
                                  classNameWindow,
                                  classNameModal,
                                  classNameContent,
                                  setIsOpen,
                                  title,
                                  children,
                                  isDropDown = true,
                                  whiteButtonText = "Отменить",
                                  darkBlueButtonText = "Применить",
                                  onClickWhiteButton,
                                  onClickDarkBlueButton,
                                  onClose,
                                  classNameHeader,
                                  classNameFooter,
                                  stylizedAs="blue-dark"
                              }: ModalProps) {
    const formRef = useRef<HTMLFormElement>(null);

    const handleButtonClick = () => {
        if (typeof onClickDarkBlueButton === "function") {
            onClickDarkBlueButton();

        }
        if (formRef.current) {
            formRef.current.requestSubmit(); // Триггерит событие onSubmit формы
        }
        if (typeof onClose === "function") {
            onClose();
        }
    };

    const handleEscape = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
            setIsOpen(false);
        }
        if (typeof onClose === "function") {
            onClose();
        }
    };

    const handleClickOut = (e: MouseEvent) => {
        const dialog = document.getElementById("modal" + title);
        if (dialog && !dialog.contains(e.target as Node)) {
            setIsOpen(false);
            if (typeof onClose === "function") {
                onClose();
            }

        }

    };

    useEffect(() => {
        document.addEventListener("keydown", handleEscape);
        document.addEventListener("mouseup", handleClickOut);

        return () => {
            document.removeEventListener("keydown", handleEscape);
            document.removeEventListener("mouseup", handleClickOut);
        };
    });

    return (
        <dialog
            open={isOpen}
            className={clsx(
                styles.modal,
                isOpen && styles.isOpen,
                isDropDown ? styles.dropDown : styles.windowMode,
                classNameModal
            )}
            onClose={onClose}
        >
            <div className={clsx(needScroll && styles.forScroll)}>
                <Component
                    ref={Component==="form" ? formRef : null}
                    className={clsx(styles.window, classNameWindow)}
                    id={"modal" + title}
                    onSubmit={handleSubmit} // Используется handleSubmit
                    onClick={(e) => e.stopPropagation()}
                >
                    <header className={clsx(styles.header, classNameHeader)}>
                        <h2 className={styles.title}>{title}</h2>
                        <span
                            className={styles.close}
                            onClick={() => {
                                setIsOpen(false);
                                if (typeof onClose === "function") {
                                    onClose();
                                }}
                            }
                        />
                    </header>

                    <div className={clsx(styles.content, classNameContent)}>
                        {children}
                    </div>
                    <footer className={clsx(styles.footer, classNameFooter)}>
                        <Button stylizedAs="white" onClick={() => {
                            if (typeof onClickWhiteButton === "function") {
                                onClickWhiteButton();
                            }
                            if (typeof onClose === "function") {
                                onClose();
                            }
                        }}>
                            {whiteButtonText}
                        </Button>
                        <Button
                            stylizedAs={stylizedAs || "blue-dark"}
                            onClick={handleButtonClick}
                        >
                            {darkBlueButtonText}
                        </Button>
                    </footer>
                </Component>
            </div>
        </dialog>
    );
}
