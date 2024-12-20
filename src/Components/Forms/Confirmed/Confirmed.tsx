import Modal from "../../Modal/Modal.tsx";
import React from "react";
import styles from './confirmed.module.scss';

type ConfirmedProps = {
    title: string;
    description: string;
    onConfirm: () => void;
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;

}
export default function Confirmed({ title, description, onConfirm, setIsOpen, isOpen }: ConfirmedProps) {
    return (
        <Modal
            title={""}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            onClickWhiteButton={() => setIsOpen(false)}
            onClickDarkBlueButton={() => {
                onConfirm();
                // console.log(title + ' confirmed');
                // setIsOpen(false);
            }}
            stylizedAs="red"
            darkBlueButtonText={"Удалить"}
            whiteButtonText={"Отмена"}
            isDropDown={false}
            classNameFooter={styles.footer}
            classNameWindow={styles.window}
            classNameContent={styles.content}
            classNameHeader={styles.header}
           >
                <div className={styles.icon}/>
                <h2 className={styles.title}>{title}</h2>
                <p className={styles.description}>{description}</p>

        </Modal>

    );
}