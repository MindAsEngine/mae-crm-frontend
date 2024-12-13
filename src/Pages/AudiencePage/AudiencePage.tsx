import * as React from "react";
import styles from './audiencePage.module.scss'
import {Button} from "../../Components/FormComponents/Button/Button.tsx";
import AudienceCard from "../../Components/AudienceCard/AudienceCard.tsx";
import Loading from "../../Components/Loading/Loading.tsx";
import Error from  "../../Components/Error/Error.tsx"
import audienceData from "./audienceData.json";
import AudienceCreate from "../../Components/Forms/Audience/AudienceCreate.tsx";

const apiUrl = import.meta.env.VITE_API_URL;

export default function AudiencePage() {
    const [audiences, setAudiences] = React.useState(null);
    const [chosenAudiences, setChosenAudiences] = React.useState([]);
    const [status, setStatus] = React.useState("loading");
    const [isOpenCreateAudience, setIsOpenCreateAudience] = React.useState(false);
    const [initToReload, setInitToReload] = React.useState(true);

    React.useEffect(() => {
        const fetchData = async () => {
            setStatus("loading");
            await fetch(apiUrl+`/audiences?`, {
                method: 'GET',
                // mode: 'no-cors',
                credentials: 'include',
                headers: {
                    'Accept': 'application/json', // Явно указываем, что ожидаем JSON
                    'Content-Type': 'application/json',
                }})
                .then((res) => {
                    console.log(res);
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


               />{/*     todo new form for integration*/}
                <Button stylizedAs={'blue-dark'}
                        children={'Создать аудиторию'}
                        createButton={true}
                        onClick={()=>setIsOpenCreateAudience(true)}

                />
                <AudienceCreate isOpenCreateAudience={isOpenCreateAudience} setIsOpenCreateAudience={setIsOpenCreateAudience}/>

            </div>

            <div className={styles.cards}>
                {status === "success" && audiences && <>
                {audiences.map((audience, index) => (
                    <AudienceCard key={index} chosen={chosenAudiences}
                                    setChosen={setChosenAudiences}
                                    {...audience}
                                    setInitToReload={setInitToReload}
                    />
                ))}
                    
                </>}
                {status === "loading" &&
                    <Loading/>
                    }
                {status === "error" && <Error/>}
            </div>


        </>
    )
}