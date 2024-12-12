import * as React from "react";
import styles from './audiencePage.module.scss'
import {Button} from "../../Components/FormComponents/Button/Button.tsx";
import {audienceData} from "./audienceData.ts";
import AudienceCard from "../../Components/AudienceCard/AudienceCard.tsx";
const apiUrl = import.meta.env.VITE_API_URL;

export default function AudiencePage() {
    const [audiences, setAudiences] = React.useState([]);
    const [chosenAudiences, setChosenAudiences] = React.useState([]);

    React.useEffect(() => {
        const fetchData = async () => {



            await fetch(apiUrl+`/audiences?`, {
                method: 'GET',
                // mode: 'no-cors',
                credentials: 'include',
                headers: {
                    'Accept': 'application/json', // Явно указываем, что ожидаем JSON
                    'Content-Type': 'application/json',
                }})
                .then((res) => {
                    if (!res.ok) {
                        throw new Error(`HTTP error! status: ${res.status}`);
                    }
                    return res.json(); // Парсим JSON только при успешном статусе
                })
                .then((data) => {
                    setAudiences(data);

                })

                .catch((err) => {
                    console.error(err);
                    // alert("Ошибка загрузки данных");
                    setTimeout(() => {
                    }, 1000); // Имитация задержки в 1 секунду
                    // const data = audienceData;
                    // setFooter(data?.footer); // Установка футера
                    // setHeaderBefore(data?.headers); // Установка заголовков
                    // setDefaultCustomSettings(data?.headers);
                });
        };
        // fetchData();
        setAudiences(audienceData);


    }, []);
    console.log(chosenAudiences);
    return (
        <>
            <div className={styles.buttons}>
                <Button stylizedAs={'blue-light'}
                        children={'Подключить рекламу'}
                        createButton={true}
               />
                <Button stylizedAs={'blue-dark'}
                        children={'Создать аудиторию'}
                        createButton={true} />

            </div>
            <div className={styles.cards}>
                {audiences.map((audience, index) => (
                    <AudienceCard key={index} chosen={chosenAudiences}
                                    setChosen={setChosenAudiences}
                                    {...audience}
                    />
                ))}

            </div>


        </>
    )
}