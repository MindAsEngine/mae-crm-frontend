import React, { useState} from "react";
import Input from "../../FormComponents/Input/Input.tsx";
import styles from "../form.module.scss";
import Select from "../../FormComponents/Select/Select.tsx";
import DateRange from "../../FormComponents/RangeDate/RangeDate.tsx";
import clsx from "clsx";
import Form from "../Form.tsx";
import {Button} from "../../FormComponents/Button/Button.tsx";
import { format } from "date-fns";

class AudienceStatus {
    static New = "New";
    static InProgress = "InProgress";
    static Done = "Done";
    static Canceled = "Canceled";
}

class Audience {
    id: number;
    title: string;
    statuses: [];
    rejection_reasons:[];
    non_target_reasons: [];
    start: Date | null;
    end: Date | null;
}
type AudienceCreateProps = {
    isOpenCreateAudience: boolean;
    setIsOpenCreateAudience: any;
}
const apiUrl = import.meta.env.VITE_API_URL;
const AudienceCreate = ({ isOpenCreateAudience, setIsOpenCreateAudience }: AudienceCreateProps) => {
        const [audience, setAudience] = useState<Audience>({
            id: 0,
            title:'',
            statuses: [],
            rejection_reasons:[],
            non_target_reasons: [],
            start: null,
            end: null,
        });
    const [isTouched, setIsTouched] = useState(false);
    const [needToR, setNeedToR] = useState(false);


        const resetAudience = () => {
            setAudience({
                id: 0,
                title: "",
                statuses: [],
                rejection_reasons:[],
                non_target_reasons: [],
                start: null,
                end: null,
            });
            setNeedToR(true);
        };
        const handleDateFormat = (date) =>{
            const userInputDate = format(date, "yyyy-MM-dd")
            const [year, month, day] = userInputDate.split('-'); // Разбиваем строку по '-
            return `${year}-${month}-${day}T00:00:00`;
        }
    const postAudiences = (name,
        statuses, rejection_reasons,
        non_target_reasons, creation_date_from,
         creation_date_to
        ) => {
        const filter = {};
        if (Array.isArray(statuses) && statuses.length > 0)
            filter.statuses = statuses;
        if (Array.isArray(rejection_reasons) && rejection_reasons.length > 0)
            filter.rejection_reasons = rejection_reasons;
        if (Array.isArray(non_target_reasons) && non_target_reasons.length > 0)
            filter.non_target_reasons = non_target_reasons;
        if (creation_date_from && creation_date_to){
            filter.creation_date_from = handleDateFormat(creation_date_from);
            filter.creation_date_to = handleDateFormat(creation_date_to);
            console.log(creation_date_to, creation_date_from)
        }
        fetch(apiUrl+`/audiences/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                filter: filter
            })
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
                return new Error('Не удалось подключить');
            })
            .catch((err) => {
                console.log(err);
            })

    }
        const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            if (audience.title && (audience.end && audience.start || audience.statuses ||
                audience.rejection_reasons || audience.non_target_reasons)) {
                console.log("Audience data:", audience);
                postAudiences(audience.title, audience.statuses, audience.rejection_reasons, audience.non_target_reasons,
                    audience.start,  audience.end )
                resetAudience();
                setIsOpenCreateAudience(false); // Закрыть модалку после отправки
            } else{
                setIsTouched(true);
            }
        };
        const handleResetClick = (e: React.ChangeEvent<HTMLInputElement>) => {
            e.preventDefault();
            resetAudience();
            setIsOpenCreateAudience(false);
        };
        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            setAudience(prev => ({
                ...prev,
                [e.target.name]: e.target.value,
            }));
        }
        return (

            <Form
                isOpen={isOpenCreateAudience}
                isDropDown={false}
                onClickWhiteButton={() =>{
                    resetAudience();
                    setIsOpenCreateAudience(false);
                }}
                title="Создать аудиторию"
                classNameContent={styles.form}
                onClose={resetAudience}
                needScroll={false}
                footer={<>
                    <Button stylizedAs="white" onClick={handleResetClick}>
                        Отменить
                    </Button>
                    <Button stylizedAs={"blue-dark"} onClick={handleSubmit}>
                        Создать
                    </Button>

                </>}
            >
                <label className={styles.label}>
                    <span className={clsx(styles.span, styles.required)}>
                        Заголовок</span>
                    <Input
                        onChange={handleChange}
                        value={audience?.title || ""}
                        className={styles.input}
                        placeholder="Наберите заголовок задачи"
                        type="text"
                        as="input"
                        name="title"
                        // maxLength={100}
                        isTouchedDefault={isTouched}
                        isValid={audience.title?.length > 0}


                    />
                </label>
                <label className={styles.labelDate}>
                                       <span className={clsx(styles.span, styles.required)}>
Срок исполнения задачи</span>

                    <DateRange
                        inputStyle={styles.inputDate_}
                        // startDate={audience.start}
                        // endDate={audience.end}
                        isValidStyle={audience.start !== null && audience.end !== null}
                        // setStartDate={(date) => setAudience({ ...audience, start: date })}
                        // setEndDate={(date) => setAudience({ ...audience, end: date })}
                       range={{start: audience.start, end: audience.end}}
                        setRange={(date) => setAudience({ ...audience, start: date.start, end: date.end})}
                        iconPosition={"right"}
                        oneCalendar={true}
                        withTime={false}
                        isTouchedDefault={isTouched}
                        needToReset={needToR}
                        setNeedToReset={setNeedToR}
                                        />
                </label>
                <Select
                    onChange={(selected) =>
                        setAudience(prevState => ({ ...prevState, statuses: selected }))}
                    selected={audience.statuses}
                    title="Тип задачи"
                    required={true}
                    multiple={true}
                    name="statuses"
                    // todo statuses
                    isTouchedDefault={isTouched}
                    options={[
                        { name: AudienceStatus.New, title: "Новая" },
                        { name: AudienceStatus.InProgress, title: "В работе" },
                        { name: AudienceStatus.Done, title: "Выполнена" },
                        { name: AudienceStatus.Canceled, title: "Отменена" },
                    ]}
                    isValid={audience.statuses?.length > 0}

                />
                {/*<Select*/}
                {/*    onChange={(selected) =>*/}
                {/*        setAudience(prevState => ({ ...prevState, type: selected }))}*/}
                {/*    selected={audience.type}*/}
                {/*    title="Тип задачи"*/}
                {/*    // required={true}*/}
                {/*    multiple={true}*/}
                {/*    // name="type"*/}
                {/*    options={[*/}
                {/*        { name: AudienceStatus.New, title: "Новая" },*/}
                {/*        { name: AudienceStatus.InProgress, title: "В работе" },*/}
                {/*        { name: AudienceStatus.Done, title: "Выполнена" },*/}
                {/*        { name: AudienceStatus.Canceled, title: "Отменена" },*/}
                {/*    ]}*/}
                {/*    // isValid={audience.type?.length > 0}*/}
                {/*/>*/}
                {/*<Select*/}
                {/*    onChange={(selected) =>*/}
                {/*        setAudience(prevState => ({ ...prevState, type: selected }))}*/}
                {/*    selected={audience.type}*/}
                {/*    title="Тип задачи"*/}
                {/*    // required={true}*/}
                {/*    multiple={true}*/}
                {/*    // name="type"*/}
                {/*    options={[*/}
                {/*        { name: AudienceStatus.New, title: "Новая" },*/}
                {/*        { name: AudienceStatus.InProgress, title: "В работе" },*/}
                {/*        { name: AudienceStatus.Done, title: "Выполнена" },*/}
                {/*        { name: AudienceStatus.Canceled, title: "Отменена" },*/}
                {/*    ]}*/}
                {/*    // isValid={audience.type?.length > 0}*/}
                {/*isLastSelect={true}*/}
                {/*/>*/}
            </Form>
        );}



export default AudienceCreate;
