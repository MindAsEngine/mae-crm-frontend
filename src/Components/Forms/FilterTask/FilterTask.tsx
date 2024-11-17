import styles from "./filter-task.module.scss";
import Select from "../../FormComponents/Select/Select.tsx";
import Modal from "../../Modal/Modal.tsx";
import * as React from "react";



type FilterProps = {
    filters: any;
    setFilters: any;
    setIsOpenModal: any;
    isOpenModal: boolean;
    onClickWhiteButton?: any;
    // argWhiteButton?: any;
    onClickDarkBlueButton?: any;
}
export default function FilterTask({filters, setFilters, onClickWhiteButton, onClickDarkBlueButton, setIsOpenModal, isOpenModal}: FilterProps) {
    return (
        <Modal isOpen={isOpenModal}
               setIsOpen={setIsOpenModal}
               title={"Фильтр"}
               onClickWhiteButton={onClickWhiteButton}
               // argWhiteButton={argWhiteButton}
               onClickDarkBlueButton={onClickDarkBlueButton}
               classNameModal={styles.modal}
               classNameContent={styles.modalContent}
               classNameWindow={styles.modalWindow}
               isDropDown={true}
        >
            {filters.map((item, index) => (
                <Select
                    multiple={true}
                    name={item.name}
                    title={item.title}
                    options={item.options}
                    key={index} selected={item.selectedOptions}
                    onChange={(selected) => {
                        setFilters(filters.map(filter => {
                            if (filter.name === item.name) {
                                return {
                                    ...filter,
                                    selectedOptions: selected
                                };
                            }
                            return filter;
                        }));
                    }}
                />
            ))}
        </Modal>
    )
}