import styles from "../form.module.scss";
import Select from "../../FormComponents/Select/Select.tsx";

import * as React from "react";
import {Button} from "../../FormComponents/Button/Button.tsx";
import clsx from "clsx";
import DateRange from "../../FormComponents/RangeDate/RangeDate.tsx";
import {useState} from "react";
import Form from "../Form.tsx";
import Loading from "../../Loading/Loading.tsx";
import Input from "../../FormComponents/Input/Input.tsx";



type FilterProps = {
    filters: any;
    setFilters: any;
    setIsOpenModal: any;
    isOpenModal: boolean;
    setInitToReload?: any;
    isLoading?: boolean;
    withDaysInStatus?: boolean;
}

export default function FilterTask({filters, setFilters, isLoading, setIsOpenModal, isOpenModal, setInitToReload, withDaysInStatus}: FilterProps) {
    const [error, setError] = useState("");
    const handleResetClick = (e) => {
        e.preventDefault();

        setFilters({
            ...filters,
            selects: filters.selects.map((select) => ({...select, selectedOptions: []})),
            start: null,
            end: null,
            // page: 1
        });
        setNeedToR(true);
        setIsOpenModal(false);
        setInitToReload(true);

    }
    const handleSubmit = (e) => {
        e.preventDefault();
        if (filters.start && filters.end && filters.start > filters.end) {
            setError("Дата начала не может быть больше даты окончания");
            return;
        }
        if (filters.daysInStatus && filters.daysInStatus < 1) {
            setError("Количество дней должно быть больше 0");
            return;
        }
        setError("");
        // setFilters({...filters, page: 1});
        setIsOpenModal(false);
        setInitToReload(true);
    }
    // console.log("start: " + filters.start+" end: "+filters.end);
    const [needToR, setNeedToR] = useState(false);
    return (
        <Form
                key={"1"}
                isOpen={isOpenModal}
                                  title={"Фильтр"}
                                  needScroll={false}
                                  onClose={() => {
                                      // setFilters({
                                      //     ...filters,
                                      //     selects: filters.selects.map((select) => ({...select, selectedOptions: []})),
                                      //     start: null,
                                      //     end: null
                                      // });
                                      // onClickWhiteButton();
                                      // setInitToReload(true);
                                      //   setNeedToR(true);
                                      setIsOpenModal(false);
                                  }}
                                  classNameContent={styles.form}
                                    errMessage={error}
                                  isDropDown={false}
                                  footer={
                                      <>
                                          <Button stylizedAs="white"
                                                  key={"reset"}
                                                  onClick={handleResetClick}>
                                              Сбросить
                                          </Button>
                                          <Button stylizedAs={"blue-dark"}
                                                    key={"submit"}
                                                  onClick={handleSubmit}>
                                                Применить
                                          </Button>

                                      </>
                                  }>


                {!isLoading && filters.selects && Array.isArray(filters.selects)
                    ? filters.selects.map((item, index) => (<>
                        {(index === 1  || filters.selects.length === 1)
                            &&
                            <label className={styles.labelDate}>
                                <span className={clsx(styles.span)}>Дата создания</span>


                            <DateRange
                            inputStyle={styles.inputDate_}
                            range={{start: filters.start, end: filters.end}}
                            key={"date"}
                            setRange={(date) => setFilters({...filters, start: date.start, end: date.end})}
                            iconPosition={"right"}
                            oneCalendar={true}
                            withTime={false}
                            needToReset={needToR}
                            setNeedToReset={setNeedToR}
                            />

                            </label>
                    }
                            {item &&
                <Select
                    isLastSelect={index === filters.selects.length - 1 || filters.selects.length === 1}
                    multiple={false}
                            name={item.name}
                            title={item.title}
                            options={item.options}
                            key={index} selected={item.selectedOptions}
                            onChange={(selected) =>
                                setFilters({
                                ...filters,
                                selects: filters.selects.map((select) => select.name === item.name
                                    ? {...select, selectedOptions: selected}
                                    : select)
                            })}
                        />
                            }
                        </>
                    )) :
                    <Loading/>
                }
            {withDaysInStatus &&
                <label className={styles.label}>
                    <span className={clsx(styles.span)}>Дней в статусе</span>

                    <Input
                        maxLength={3}

                        min={1}
                        placeholder={"Количество дней"}
                        className={styles.input}
                        type="number"
                        value={filters.daysInStatus}
                        onChange={(e) =>
                            setFilters({...filters, daysInStatus: e.target.value})}
                        isValid={filters.daysInStatus >= 1}
                    />
                </label>

            }

            </Form>

    )
}