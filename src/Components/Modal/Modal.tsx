import {useEffect} from "react";
import * as React from "react";
import styles from './modal.module.scss'

export default function Modal({children, isOpen, setIsOpen}: {children: React.ReactNode, isOpen: boolean, setIsOpen: (isOpen: boolean) => void}) {

    const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
            setIsOpen(false);
        }
    }
    useEffect(() => {
        // document.body.style.overflow = 'hidden';
        document.addEventListener('keydown', handleKeyDown);
        return () => {
            // document.body.style.overflow = 'auto';
            document.removeEventListener('keydown', handleKeyDown);
        }
    });
    return (
        <dialog open={isOpen} className={styles.modal}>
            <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
                {children}
            </div>
        </dialog>

    )
}