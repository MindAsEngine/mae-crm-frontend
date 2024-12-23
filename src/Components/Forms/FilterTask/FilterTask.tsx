import styles from "../form.module.scss";
import Select from "../../FormComponents/Select/Select.tsx";

import * as React from "react";
import {Button} from "../../FormComponents/Button/Button.tsx";
import clsx from "clsx";
import DateRange from "../../FormComponents/RangeDate/RangeDate.tsx";
import {useState} from "react";
import Form from "../Form.tsx";
import Loading from "../../Loading/Loading.tsx";



type FilterProps = {
    filters: any;
    setFilters: any;
    setIsOpenModal: any;
    isOpenModal: boolean;

    setInitToReload?: any;
    isLoading?: boolean;
}
// todo right type input
export default function FilterTask({filters, setFilters, isLoading, setIsOpenModal, isOpenModal, setInitToReload}: FilterProps) {
    const countBadge = () => {
        let count = 0;
        if (filters.selects && Array.isArray(filters.selects)) {
            count += filters.selects.reduce((acc, select) => acc + select.selectedOptions.length, 0);
        }
        if (filters.start&&filters.end) {
            count++;
        }

        return count;
    };
    const handleResetClick = (e) => {
        e.preventDefault();
        setFilters({
            ...filters,
            selects: filters.selects.map((select) => ({...select, selectedOptions: []})),
            start: null,
            end: null
        });
        setIsOpenModal(false);
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(filters);
        setInitToReload(true);
        setIsOpenModal(false);
    }
    const [needToR, setNeedToR] = useState(false);
    return (
        <Button
            as={'div'}
            badge={countBadge() !== 0 ? countBadge().toString() : undefined}
            stylizedAs={'white'}
            filterButton={true}
            onClick={() => setIsOpenModal(true)}
        >
            Фильтр
            {isOpenModal && <Form
                key={"filter"}
                isOpen={isOpenModal}
                                  title={"Фильтр"}
                                  needScroll={false}
                                  onClickWhiteButton={() => {
                                      setFilters({
                                          ...filters,
                                          selects: filters.selects.map((select) => ({...select, selectedOptions: []})),
                                          start: null,
                                          end: null
                                      });
                                      // onClickWhiteButton();
                                      setIsOpenModal(false);
                                  }}
                                  classNameContent={styles.form}

                                  isDropDown={false}
                                  footer={
                                      <>
                                          <Button stylizedAs="white" onClick={handleResetClick}>
                                              Отменить
                                          </Button>
                                          <Button stylizedAs={"blue-dark"} onClick={handleSubmit}>
                                              Создать
                                          </Button>

                                      </>
                                  }>

                {!isLoading && filters.selects && Array.isArray(filters.selects)
                    ? filters.selects.map((item, index) => (<>
                        {index === 1 &&
                            <label className={styles.labelDate}>
                                <span className={clsx(styles.span)}>Дата создания</span>


                            <DateRange
                            inputStyle={styles.inputDate_}
                            range={{start: filters.start, end: filters.end}}

                            setRange={(date) => setFilters({...filters, start: date.start, end: date.end})}
                            iconPosition={"right"}
                            oneCalendar={true}
                            withTime={false}
                            needToReset={needToR}
                            setNeedToReset={setNeedToR}
                            />

                            </label>
                    }
                <Select
                    isLastSelect={index === filters.selects.length - 1}
                    multiple={true}
                            name={item.name}
                            title={item.title}
                            options={item.options}
                            key={index} selected={item.selectedOptions}
                            onChange={(selected) => setFilters({
                                ...filters,
                                selects: filters.selects.map((select) => select.name === item.name
                                    ? {...select, selectedOptions: selected}
                                    : select)
                            })}
                        /></>
                    )) :
                    <Loading/>
                }

            </Form>}
        </Button>
    )
}