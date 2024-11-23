import {useEffect} from "react";
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
    onClickWhiteButton: () => void;
    // argWhiteButton: any;
    darkBlueButtonText?: string;
    onClickDarkBlueButton: () => void;
    classNameModal?: string;
    classNameContent?: string;
    classNameWindow?: string;
    isDropDown?: boolean;
    //
}
export default function Modal({isOpen, classNameWindow, classNameModal, classNameContent,setIsOpen, title, children, isDropDown=true, whiteButtonText="Отменить", darkBlueButtonText="Применить", onClickWhiteButton, onClickDarkBlueButton}: ModalProps) {

    const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
            setIsOpen(false);
            // onClickWhiteButton(argWhiteButton);
        }
    }
    const handleClickOut = (e: MouseEvent) => {
        const dialog = document.getElementById("modal");

        if (!dialog.contains(e.target)) {
            setIsOpen(false);

            // onClickWhiteButton(argWhiteButton);
        }
    }
    useEffect(() => {
        // document.body.style.overflow = 'hidden';
        document.addEventListener('keydown', handleEscape);
        document.addEventListener('mouseup', handleClickOut );

        return () => {
            // document.body.style.overflow = 'auto';
            document.removeEventListener('keydown', handleEscape);
            document.removeEventListener('mouseup', handleClickOut);
        }
    });
    return (
        <dialog open={isOpen}

                className={clsx(
            styles.modal,
            isOpen && styles.isOpen,
            isDropDown ? styles.dropDown : styles.windowMode,
            classNameModal
            )}>
            <div className={clsx(styles.window, classNameWindow)}
                 id={"modal"}
                 onClick={(e) => e.stopPropagation()}>
                <header className={styles.header}>
                    <h2 className={styles.title}>{title}</h2>
                    <span className={styles.close} onClick={() => setIsOpen(false)}/>
                </header>

                <div className={clsx(styles.content, classNameContent)}
                >{children}</div>
                <footer className={styles.footer}>
                <Button stylizedAs={"white"}
                onClick={onClickWhiteButton}
                >
                    {whiteButtonText}
            </Button>
                <Button
                stylizedAs={'blue-dark'}
                onClick={onClickDarkBlueButton}
                    >
                    {darkBlueButtonText}
                </Button>
        </footer>
            </div>
        </dialog>

    )
}