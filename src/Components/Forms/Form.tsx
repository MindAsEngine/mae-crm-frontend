import {useEffect} from "react";
import * as React from "react";
import styles from '../Modal/modal.module.scss'
import clsx from "clsx";
type ModalProps = {
    isOpen: boolean;
    title: string;
    children: React.ReactNode;
    whiteButtonText?: string;
    onClickWhiteButton?: () => void;
    darkBlueButtonText?: string;
    onClickDarkBlueButton?: () => void;
    classNameModal?: string;
    classNameContent?: string;
    classNameWindow?: string;
    classNameFooter?: string;
    classNameHeader?: string;
    isDropDown?: boolean;
    needScroll?:boolean;
    onClose?: () => void;
    stylizedAs?: "red" | "blue-dark" | "blue-light" | "white",
    footer?: React.ReactNode
}
export default function Form({
                                  isOpen,
                                  needScroll = true,
                                  classNameWindow,
                                  classNameModal,
                                  classNameContent,
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
    footer="",
                                  stylizedAs="blue-dark"
                              }: ModalProps) {

    const handleApplyClick = () => {
        if (typeof onClickDarkBlueButton === "function") {
            onClickDarkBlueButton();
        }
        if (typeof onClose === "function") {
            onClose();
        }
    };
    const handleResetClick = () => {
        if (typeof onClickWhiteButton === "function") {
            onClickWhiteButton();
        }
        if (typeof onClose === "function") {
            onClose();
        }
    }

    const handleEscape = (e: KeyboardEvent) => {
        if (e.key === "Escape" && typeof onClose === "function") {
            onClose();
        }
    };

    const handleClickOut = (e: MouseEvent) => {
        const dialog = document.getElementById("modal" + title);
        if (dialog && !dialog.contains(e.target as Node)) {
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
            onClick={(e) => e.stopPropagation()}
        >
            <div className={clsx(needScroll && styles.forScroll)}>
                <form
                    className={clsx(styles.window, classNameWindow)}
                    id={"modal" + title}>
                    <header className={clsx(styles.header, classNameHeader)}>
                        <h2 className={styles.title}>{title}</h2>
                        <span
                            className={styles.close}
                            onClick={handleResetClick}
                        />
                    </header>

                    <div className={clsx(styles.content, classNameContent)}>
                        {children}
                    </div>
                    <footer className={clsx(styles.footer, classNameFooter)}>
                        {footer}
                        {/*<Button stylizedAs="white" onClick={handleResetClick}>*/}
                        {/*    {whiteButtonText}*/}
                        {/*</Button>*/}
                        {/*<Button stylizedAs={stylizedAs || "blue-dark"} onClick={handleApplyClick}>*/}
                        {/*    {darkBlueButtonText}*/}
                        {/*</Button>*/}
                    </footer>
                </form>
            </div>
        </dialog>
    );
}
