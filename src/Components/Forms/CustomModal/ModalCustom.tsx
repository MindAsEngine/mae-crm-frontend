import styles from "./custom.module.scss";
import Modal from "../../Modal/Modal.tsx";
import Checkbox from "../../FormComponents/Checkbox/Checkbox.tsx";
import {Button} from "../../FormComponents/Button/Button.tsx";
import * as React from "react";

type ModalCustomProps = {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    customSettings: any;
    setCustomSettings: (customSettings: any) => void;
    header: any;
    setDefaultCustomSettings: (header: any) => void;
    onCustomSettingApplied: () => void;
    onCheckboxChanged: (name: string) => void;
}

export default function ModalCustom({isOpen, setIsOpen,
                                        customSettings, setCustomSettings,
                                        onCheckboxChanged,
                                        header, setDefaultCustomSettings,
                                        onCustomSettingApplied}: ModalCustomProps) {
    return (
        <Button
            as={'div'}
            stylizedAs={'white'}
            className={styles.additional}
            filterButton={true}
            onClick={() => setIsOpen(true)}
        >Кастом
            <Modal isOpen={isOpen}
                   setIsOpen={setIsOpen}
                   title={"Кастом"}
                   onClickWhiteButton={() => {
                       setDefaultCustomSettings(header);
                       setIsOpen(false);
                   }}
                // argWhiteButton={header}
                   onClickDarkBlueButton={()=> {
                       onCustomSettingApplied();
                       setIsOpen(false);}
                   }
                   classNameModal={styles.modal}
                   classNameContent={styles.modalContent}
                   classNameWindow={styles.modalWindow}
                   isDropDown={true}
            >
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