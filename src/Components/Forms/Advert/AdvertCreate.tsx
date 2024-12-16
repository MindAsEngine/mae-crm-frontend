import React, { useEffect, useState} from "react";
import Input from "../../FormComponents/Input/Input.tsx";
import styles from "../form.module.scss";
import Select from "../../FormComponents/Select/Select.tsx";
import DateRange from "../../FormComponents/RangeDate/RangeDate.tsx";
import clsx from "clsx";
import Form from "../Form.tsx";
import {Button} from "../../FormComponents/Button/Button.tsx";
import Loading from "../../Loading/Loading.tsx";

class Cabinets {
    static Facebook = "facebook";
    static Google = "google";
    static Yandex = "yandex";
}

class Advert {
    // audiences: number[];
    cabinet: Cabinets;
    start: Date;
    end: Date;
}
type AdvertCreateProps = {
    isOpenCreateAdvert: boolean;
    setIsOpenCreateAdvert: any;
    audiencesFromDB: [];
    chosenAudiences: [];
    setChosenAudiences: [];
}

const AdvertCreate = ({ isOpenCreateAdvert, setIsOpenCreateAdvert,
                          audiencesFromDB=[], chosenAudiences=[],
    setChosenAudiences
                      }: AdvertCreateProps) => {
    const [isTouched, setIsTouched] = useState(false);
    const [advert, setAdvert] = useState<Advert>({
            cabinet: null,
            // audiences: chosenAudiences,
            start: null,
            end: null,
        });
    const [needToR, setNeedToR] = useState(false);


        const resetAdvert = () => {
            setAdvert({
                cabinet: null,
                // audiences:[],
                start: null,
                end: null,
            });
            setChosenAudiences([]);
            setNeedToR(true);
        };
        // console.log(advert);
        const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            // todo post
            if (advert.cabinet && chosenAudiences.length > 0 && advert.start && advert.end) {
                console.log("Advert data:", advert, chosenAudiences);
                resetAdvert();
                setIsOpenCreateAdvert(false); // Закрыть модалку после отправки
            } else{
                setIsTouched(true);
                console.log("true")
            }
        };
        const handleResetClick = (e: React.ChangeEvent<HTMLInputElement>) => {
            e.preventDefault();
            resetAdvert();
            setIsOpenCreateAdvert(false);
        };

        // console.log(advert.start !== null && advert.end !== null, "wdbwb");
        return (
            <Form
                isOpen={isOpenCreateAdvert}
                isDropDown={false}
                onClickWhiteButton={() =>{
                    resetAdvert();
                    setIsOpenCreateAdvert(false);
                }}
                title="Подключить рекламу"
                classNameContent={styles.form}
                onClose={resetAdvert}
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
                {audiencesFromDB ?
                    <> <label className={styles.labelDate}>
                                       <span className={clsx(styles.span, styles.required)}>
Срок исполнения задачи</span>

                    <DateRange
                        needToReset={needToR}
                        setNeedToReset={setNeedToR}
                        inputStyle={styles.inputDate_}
                        isTouchedDefault={isTouched}
                        // startDate={Advert.start}
                        // endDate={Advert.end}
                        isValidStyle={advert.start !== null && advert.end !== null}
                        // setStartDate={(date) => setAdvert({ ...Advert, start: date })}
                        // setEndDate={(date) => setAdvert({ ...Advert, end: date })}
                        range={{start: advert.start, end: advert.end}}
                        setRange={(date) => setAdvert({...advert, start: date.start, end: date.end})}
                        iconPosition={"right"}
                        oneCalendar={true}
                        withTime={false}
                    />
                </label>
                    <Select
                    onChange={(selected) =>
                    setAdvert(prevState => ({...prevState, cabinet: selected}))}
                selected={advert.cabinet}
                title="Кабинет"
                required={true}
                multiple={false}
                options={[
                    {name: Cabinets.Facebook, title: "Facebook Ads"},
                    {name: Cabinets.Google, title: "Google Ads"},
                    {name: Cabinets.Yandex, title: "Яндекс.Аудитории"},

                ]}
                isValid={advert.cabinet?.length > 0}
                    isTouchedDefault={isTouched}
            />
    <Select
        onChange={(selected) => setChosenAudiences(selected)}
        name={"list_audiences"}
        selected={chosenAudiences}
        title="Список аудиторий"
        required={true}
        multiple={true}
        options={audiencesFromDB.map(audience => ({name: audience.id, title: audience.name}))}
        isValid={chosenAudiences?.length !== 0}
        isTouchedDefault={isTouched}
    /></> : <Loading/>
}
                
            </Form>
        );}



export default AdvertCreate;
