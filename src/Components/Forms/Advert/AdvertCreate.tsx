import React, { useState} from "react";
import styles from "../form.module.scss";
import Select from "../../FormComponents/Select/Select.tsx";
import Form from "../Form.tsx";
import {Button} from "../../FormComponents/Button/Button.tsx";
import Loading from "../../Loading/Loading.tsx";

class Cabinets {
    static Facebook = "facebook";
    static Google = "google";
    static Yandex = "yandex";
}
const apiUrl = import.meta.env.VITE_API_URL;

class Advert {
    cabinet: Cabinets | undefined;

}
type AdvertCreateProps = {
    isOpenCreateAdvert: boolean;
    setIsOpenCreateAdvert: any;
    audiencesFromDB: [];
    chosenAudiences: [];
    setChosenAudiences: [];
    setInitToReload: ()=> {}
}

const AdvertCreate = ({ isOpenCreateAdvert, setIsOpenCreateAdvert,
                          audiencesFromDB=[], chosenAudiences=[], setInitToReload,
    setChosenAudiences
                      }: AdvertCreateProps) => {
    const [isTouched, setIsTouched] = useState(false);
    const [errMessage, setErrMessage] = useState(null);

    const [advert, setAdvert] = useState<Advert>({
            cabinet: null,
            // audiences: chosenAudiences,
            // start: null,
            // end: null,
        });
    // const [needToR, setNeedToR] = useState(false);


        const resetAdvert = () => {
            setAdvert({
                cabinet: null,
                // audiences:[],
                // start: null,
                // end: null,
            });
            setChosenAudiences([]);
            // setNeedToR(true);
        };
        // console.log(advert);
        const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            if (advert.cabinet&&Array.isArray(advert.cabinet) && chosenAudiences.length > 0 ) {
                // console.log("Advert data:", advert, chosenAudiences);
                postIntegration(advert.cabinet[0], chosenAudiences.map(audience => audience.name))
                // advert.start, advert.end);

            } else{
                setIsTouched(true);
                // console.log("true")
                setErrMessage("Заполните обязательные поля");
            }
        };
        const handleResetClick = (e: React.ChangeEvent<HTMLInputElement>) => {
            e.preventDefault();
            resetAdvert();
            setIsOpenCreateAdvert(false);
        };
    const postIntegration = (cabinet, audiences,) => {
        fetch(apiUrl+`/integrations`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                cabinet_name: cabinet.name,
                audience_ids: audiences,
            })
        })
            .then((res) => {
                if (res.ok) {
                    // return res.json();
                    resetAdvert();
                    setIsOpenCreateAdvert(false); // Закрыть модалку после отправки
                    setInitToReload(true);
                    return;
                }
               throw new Error('Не удалось подключить');
            })
            .catch((err) => {
                setErrMessage(err.error);
            })

    }

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
                errMessage={errMessage}
            >
                {audiencesFromDB ?
                    <>
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
                        />
{/*                        <label className={styles.labelDate}>*/}
{/*                                       <span className={clsx(styles.span, styles.required)}>*/}
{/*Срок исполнения задачи</span>*/}

{/*                            <DateRange*/}
{/*                                needToReset={needToR}*/}
{/*                                setNeedToReset={setNeedToR}*/}
{/*                                inputStyle={styles.inputDate_}*/}
{/*                                isTouchedDefault={isTouched}*/}
{/*                                // startDate={Advert.start}*/}
{/*                                // endDate={Advert.end}*/}
{/*                                isValidStyle={advert.start !== null && advert.end !== null}*/}
{/*                                // setStartDate={(date) => setAdvert({ ...Advert, start: date })}*/}
{/*                                // setEndDate={(date) => setAdvert({ ...Advert, end: date })}*/}
{/*                                range={{start: advert.start, end: advert.end}}*/}
{/*                                setRange={(date) => setAdvert({...advert, start: date.start, end: date.end})}*/}
{/*                                iconPosition={"right"}*/}
{/*                                oneCalendar={true}*/}
{/*                                withTime={false}*/}
{/*                            />*/}
{/*                        </label>*/}

                    </> : <Loading/>
                }

            </Form>
        );
}


export default AdvertCreate;
