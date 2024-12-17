import React, { useState} from "react";
import Input from "../../FormComponents/Input/Input.tsx";
import styles from "../form.module.scss";
import Select from "../../FormComponents/Select/Select.tsx";
import DateRange from "../../FormComponents/RangeDate/RangeDate.tsx";
import clsx from "clsx";
import Form from "../Form.tsx";
import {Button} from "../../FormComponents/Button/Button.tsx";
import { format } from "date-fns";

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
    setInitToReload: ()=> {}

}
const non_target_reasons_options = [
    {name: "Повторная заявка", title: "Повторная заявка"},
    {name: "Конкурент", title: "Конкурент"},
    {name: "Готовая квартира", title: "Готовая квартира"},
    {name: "Ошиблись номером", title: "Ошиблись номером"},
    {name: "Спам/неформат", title: "Спам/неформат"},
    {name: "Другие причины", title: "Другие причины"},
    {name: "Номер телефона не существует", title: "Номер телефона не существует"},
    {name: "Невозможно дозвониться", title: "Невозможно дозвониться"},
    {name: "Покупка в области", title: "Покупка в области"},
    {name: "Интерес к ЖК в другом районе", title: "Интерес к ЖК в другом районе"},
    {name: "Сам перезвонит(не получил информацию, не зафиксирован интерес)",
        title: "Сам перезвонит(не получил информацию, не зафиксирован интерес)"},
    {name: "Малоимущие (нет ПВ, нужна субсидия)", title: "Малоимущие (нет ПВ, нужна субсидия)"},
    {name: "Не оставлял заявку", title: "Не оставлял заявку"},
    {name: "Дубль", title: "Дубль"}
    ]
const rejection_reasons_options = [
    {name: "Уже купили", title: "Уже купили"},
    {name: "Купили на вторичном рынке", title: "Купили на вторичном рынке"},
    {name: "Банки отказали в ипотеке", title: "Банки отказали в ипотеке"},
    {name: "Передумали покупать", title: "Передумали покупать"},
    {name: "Не устраивает планировка", title: "Не устраивает планировка"},
    {name: "Не устраивает местоположение", title: "Не устраивает местоположение"},
    {name: "Не устраивает цена", title: "Не устраивает цена"},
    {name: "Не устраивает срок сдачи", title: "Не устраивает срок сдачи"},
    {name: "Фиксация конкурента", title: "Фиксация конкурента"},
    {name: "Думают (перезвонят самостоятельно)", title: "Думают (перезвонят самостоятельно)"},
    {name: "Другое(обязательный комментарий)", title: "Другое(обязательный комментарий)"},
    ]
const statuses_options = [
    {name: "Нецелевой", title: "Нецелевой"},
    {name: "Отказ", title: "Отказ"},
    {name: "Неразобранное", title: "Неразобранное"},
    {name: "Оценка", title: "Оценка"},
    {name: "Необходим обзвон", title: "Необходим обзвон"},
    {name: "Проверка", title: "Проверка"},
    {name: "Отложено", title: "Отложено"},
    {name: "Подбор", title: "Подбор"},
    {name: "Бронь", title: "Бронь"},
    {name: "Маркетинговый резерв", title: "Маркетинговый резерв"},
    {name: "Сделка расторгнута", title: "Сделка расторгнута"},
    {name: "Сделка в работе", title: "Сделка в работе"},
    {name: "Маркетинговая сделка", title: "Маркетинговая сделка"},
    {name: "Сделка в работе *", title: "Сделка в работе *"},
    {name: "Сдано", title: "Сдано"},
    {name: "Сделка проведена", title: "Сделка проведена"},

    ]

const apiUrl = import.meta.env.VITE_API_URL;
const AudienceCreate = ({ isOpenCreateAudience, setInitToReload, setIsOpenCreateAudience }: AudienceCreateProps) => {
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
    const [errMessage, setErrMessage] = useState(null);

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
            filter.statuses = statuses.map(status => status.name);
        if (Array.isArray(rejection_reasons) && rejection_reasons.length > 0)
            filter.rejection_reasons = rejection_reasons.map(reason => reason.name);
        if (Array.isArray(non_target_reasons) && non_target_reasons.length > 0)
            filter.non_target_reasons = non_target_reasons.map(reason => reason.name);
        if (creation_date_from && creation_date_to){
            filter.creation_date_from = handleDateFormat(creation_date_from);
            filter.creation_date_to = handleDateFormat(creation_date_to);
            // console.log(creation_date_to, creation_date_from)
        }
        fetch(apiUrl+`/audiences`, {
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
                    // return res.json();
                    resetAudience();
                    setIsOpenCreateAudience(false);
                    setInitToReload(true);
                    return;
                }
                throw new Error('Не удалось подключить');
            })
            .catch((err) => {
                setErrMessage(err.error);
            })

    }
        const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            if (audience.title && (audience.end && audience.start || audience.statuses ||
                audience.rejection_reasons || audience.non_target_reasons)) {
                // console.log("Audience data:", audience);
                postAudiences(audience.title, audience.statuses, audience.rejection_reasons, audience.non_target_reasons,
                    audience.start,  audience.end );

                 // Закрыть модалку после отправки
            } else{
                setIsTouched(true);
                setErrMessage("Заполните хотя бы одно поле из 4 необязательных");
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
                errMessage={errMessage}
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
                                       <span className={clsx(styles.span)}>
Срок исполнения задачи</span>

                    <DateRange
                        inputStyle={styles.inputDate_}
                        // startDate={audience.start}
                        // endDate={audience.end}
                        // isValidStyle={audience.start !== null && audience.end !== null}
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
                    title="Статус заявки"
                    // required={true}
                    multiple={true}
                    name="statuses"
                    placeholder={"статус"}

                    // todo statuses
                    isTouchedDefault={isTouched}
                    options={statuses_options}
                    // isValid={audience.statuses?.length > 0}

                />
                <Select
                    onChange={(selected) =>
                        setAudience(prevState => ({ ...prevState, non_target_reasons: selected }))}
                    selected={audience.non_target_reasons}
                    title="Причина перевода в нецелевое"
                    // required={true}
                    placeholder={"причину"}
                    multiple={true}
                    isLastSelect={true}

                    // name="type"
                    options={non_target_reasons_options}
                    name={"non_target_reasons"}
                    // isValid={audience.type?.length > 0}
                />
                <Select
                    onChange={(selected) =>
                        setAudience(prevState => ({ ...prevState, rejection_reasons: selected }))}
                    selected={audience.rejection_reasons}
                    title="Причина перевода в отказ"
                    // required={true}
                    multiple={true}
                    placeholder={"причину"}

                    name="rejection_reasons"
                    options={rejection_reasons_options}
                    // isValid={audience.type?.length > 0}
                isLastSelect={true}
                />
            </Form>
        );}



export default AudienceCreate;
