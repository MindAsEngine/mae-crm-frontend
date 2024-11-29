import styles from "./filter-task.module.scss";
import Select from "../../FormComponents/Select/Select.tsx";
import Modal from "../../Modal/Modal.tsx";
import * as React from "react";
import {Button} from "../../FormComponents/Button/Button.tsx";



type FilterProps = {
    filters: any;
    setFilters: any;
    setIsOpenModal: any;
    isOpenModal: boolean;
    onClickWhiteButton?: any;
    onClickDarkBlueButton?: any;
}
// todo right type input
export default function FilterTask({filters, setFilters, onClickWhiteButton, onClickDarkBlueButton, setIsOpenModal, isOpenModal}: FilterProps) {
    const countBadge = () => {
        let count = 0;
        filters.forEach(filter => {
            if (filter.selectedOptions?.length > 0 || filter.entred) {
                count += 1;
                // console.log(filter.selected)
            }
        });
        return count;
    };
    return (
        <Button
            as={'div'}
            badge={countBadge() !== 0 ? countBadge().toString() : undefined}
            stylizedAs={'white'}
            filterButton={true}
            // loading={chosenData.length === 0}

            onClick={() => setIsOpenModal(true)}
        >
            Фильтр
        <Modal isOpen={isOpenModal}
               setIsOpen={setIsOpenModal}
               title={"Фильтр"}

               needScroll={true}

               onClickWhiteButton={onClickWhiteButton}
               // argWhiteButton={argWhiteButton}
               onClickDarkBlueButton={onClickDarkBlueButton}
               classNameModal={styles.modal}
               classNameContent={styles.modalContent}
               classNameWindow={styles.modalWindow}
               isDropDown={false}
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
        </Button>
    )
}