import * as React from "react"
import styles from "./curtain.module.scss"
import clsx from "clsx";
import {useEffect} from "react";
import * as events from "node:events";
type CurtainProps = {
    children?: React.ReactNode,
    isCurtainOpen: boolean,
    setIsCurtainOpen: React.Dispatch<React.SetStateAction<boolean>>
}
export default function Curtain({children, isCurtainOpen, setIsCurtainOpen}: CurtainProps) {
    const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
            setIsCurtainOpen(false);
        }
    }
    const handleClickOut = (e: MouseEvent) => {
        const curtain = document.getElementById("curtain");
        if (!curtain.contains(e.target)) {
            setIsCurtainOpen(false);
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
        <div className={clsx(isCurtainOpen && styles.isCurtainOpen)}
        >
            <div className={styles.shadow}></div>
            <div className={clsx(styles.curtain, isCurtainOpen && styles.isOpen)}  id={"curtain"}>
                <div className={styles.content}>{children}</div>
            </div>
        </div>
    )
}