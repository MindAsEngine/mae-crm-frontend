import styles from "./custom.module.scss";
import Modal from "../../Modal/Modal.tsx";
import Checkbox from "../../FormComponents/Checkbox/Checkbox.tsx";
import {Button} from "../../FormComponents/Button/Button.tsx";
import * as React from "react";
import {useCallback} from "react";

type ModalCustomProps = {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    customSettings: any;
    header: any;
    setDefaultCustomSettings: (header: any) => void;
    onCustomSettingApplied: () => void;
    onCheckboxChanged: (name: string) => void;
}

export default function ModalCustom({

                                        customSettings,
                                        onCheckboxChanged,
                                        header, setDefaultCustomSettings,
                                        onCustomSettingApplied}: ModalCustomProps) {
    const [isOpen, setIsOpen] = React.useState(false);
    const onClose = useCallback(() => {
        setIsOpen(false);
    }, []);
    return (
        <Button
            as={'div'}
            stylizedAs={'white'}
            className={styles.additional}
            filterButton={true}
            onClick={() => setIsOpen(true)}>Кастом<Modal isOpen={isOpen}

                   onClose={onClose}
                   title={"Кастом"}
                   onClickWhiteButton={() => {setDefaultCustomSettings(header)}}
                   onClickDarkBlueButton={onCustomSettingApplied}
                   classNameModal={styles.modal}
                   classNameContent={styles.modalContent}
                   classNameWindow={styles.modalWindow}
                   isDropDown={true}>
                {customSettings.map((item, index) => (
                    <div key={index} className={styles.label}
                         onClick={() => {onCheckboxChanged(item.name)}}
                    >
                        {item.title}
                        <Checkbox
                            checked={item.applied_visible}
                            onChange={() => onCheckboxChanged(item.name)}
                        />
                    </div>
                ))}


            </Modal>
        </Button>
    )
}