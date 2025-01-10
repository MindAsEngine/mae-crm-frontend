import React, { useState} from "react";
import styles from "../form.module.scss";
import Select from "../../FormComponents/Select/Select.tsx";
import Form from "../Form.tsx";
import {Button} from "../../FormComponents/Button/Button.tsx";
import Loading from "../../Loading/Loading.tsx";
import {getAuthHeader} from "../../../Pages/Login/logout.ts";

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
        });

        const resetAdvert = () => {
            setAdvert({
                cabinet: null,
            });
            setChosenAudiences([]);

        };

        const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            setErrMessage(null);
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
        fetch(apiUrl+`/audiences/integrations`, {
            method: 'POST',
            headers: getAuthHeader(),
            body: JSON.stringify({
                cabinet_name: cabinet.name,
                audience_ids: audiences.filter(id => {
                    const audience = audiencesFromDB.find(one => one.id === id);
                    if (!audience) return true;
                    const hasIntegration = Array.isArray(audience.integrations) && audience.integrations.includes(cabinet.name);
                    return !hasIntegration;
                    })
                }),
            })
            .then((res) => {
                if (res.ok) {
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
                onClose={() =>{
                    resetAdvert();
                    setIsOpenCreateAdvert(false);
                }}
                title="Подключить рекламу"
                classNameContent={styles.form}
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
                    </> : <Loading/>
                }

            </Form>
        );
}


export default AdvertCreate;
