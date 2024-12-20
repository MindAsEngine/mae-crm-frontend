import * as React from "react";
import styles from './audiencePage.module.scss'
import {Button} from "../../Components/FormComponents/Button/Button.tsx";
import AudienceCard from "../../Components/AudienceCard/AudienceCard.tsx";
import Loading from "../../Components/Loading/Loading.tsx";
import ErrorComponent from "../../Components/Error/ErrorComponent.tsx"
import AudienceCreate from "../../Components/Forms/Audience/AudienceCreate.tsx";
import AdvertCreate from "../../Components/Forms/Advert/AdvertCreate.tsx";

const apiUrl = import.meta.env.VITE_API_URL;

export default function AudiencePage() {
    const [audiences, setAudiences] = React.useState(null);
    const [chosenAudiences, setChosenAudiences] = React.useState([]);
    const [status, setStatus] = React.useState("loading");
    const [isOpenCreateAudience, setIsOpenCreateAudience] = React.useState(false);
    const [isOpenCreateAdvert, setIsOpenCreateAdvert] = React.useState(false);
    const [initToReload, setInitToReload] = React.useState(true);

    React.useEffect(() => {
        const fetchData = async () => {
            setStatus("loading");
            await fetch(apiUrl+`/audiences?`, {
                method: 'GET',
                // mode: "no-cors",
                headers: {
                    // 'Accept': 'application/json', // Явно указываем, что ожидаем JSON
                    // 'Content-Type': 'application/json',
                }})
                .then((res) => {
                    // console.log(res);
                    if (!res.ok) {
                        throw new Error(`HTTP error! status: ${res.status}`);
                    }
                    return res.json(); // Парсим JSON только при успешном статусе
                })
                .then((data) => {
                    setAudiences(data);
                    setStatus("success");
                })
                .catch((err) => {
                    console.error(err);
                    setStatus("error");

                });
        };
    //   console.log(audiences);
    if (initToReload)  {
        fetchData();
        setInitToReload(false);
    }
        // setStatus("loading")
        // setInterval(() => {
            // setAudiences(audienceData.audiences);
            // console.log(audienceData.audiences)
            // setStatus("success");
        // }, 2000)

        }, [initToReload]);


    return (
        <>
            <div className={styles.buttons}>


                <Button stylizedAs={'blue-light'}
                        children={'Подключить рекламу'}
                        createButton={true}
                        onClick={()=>setIsOpenCreateAdvert(true)}
                        disabled={status !== "success"}


               />
                {isOpenCreateAdvert &&
                <AdvertCreate isOpenCreateAdvert={isOpenCreateAdvert} setIsOpenCreateAdvert={setIsOpenCreateAdvert}
                              audiencesFromDB={audiences} chosenAudiences={chosenAudiences}
                              setChosenAudiences={setChosenAudiences}
                              setInitToReload={setInitToReload}
                />}

                <Button stylizedAs={'blue-dark'}
                        children={'Создать аудиторию'}
                        createButton={true}
                        onClick={()=>setIsOpenCreateAudience(true)}

                />
                {isOpenCreateAudience&&
                    <AudienceCreate
                    setInitToReload={setInitToReload}
                    isOpenCreateAudience={isOpenCreateAudience} setIsOpenCreateAudience={setIsOpenCreateAudience}

                />}

            </div>

            <div className={styles.cards}>
                {status === "success" && Array.isArray(audiences) && <>
                {audiences.map((audience, index) => (
                    <AudienceCard key={index} chosen={chosenAudiences}
                                    setChosen={setChosenAudiences}
                                    {...audience}
                                    setInitToReload={setInitToReload}
                                  setIsModalConnectOpen={setIsOpenCreateAdvert}
                    />
                ))}
                    
                </>}
                {status === "loading" &&
                    <Loading/>
                    }
                {status === "error" && <ErrorComponent/>}
            </div>


        </>
    )
}