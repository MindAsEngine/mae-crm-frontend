import * as React from "react";
import styles from './audiencePage.module.scss'
import {Button} from "../../Components/FormComponents/Button/Button.tsx";
import {audienceData} from "./audienceData.ts";
import AudienceCard from "../../Components/AudienceCard/AudienceCard.tsx";

export default function AudiencePage() {
    const [audiences, setAudiences] = React.useState([]);
    const [chosenAudiences, setChosenAudiences] = React.useState([]);
    React.useEffect(() => {
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