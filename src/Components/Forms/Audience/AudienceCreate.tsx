import React, {forwardRef, useEffect, useState} from "react";
import Input from "../../FormComponents/Input/Input.tsx";
import styles from "../form.module.scss";
import Select from "../../FormComponents/Select/Select.tsx";
import DateRange from "../../FormComponents/RangeDate/RangeDate.tsx";
import Modal from "../../Modal/Modal.tsx";
import clsx from "clsx";

class AudienceStatus {
    static New = "New";
    static InProgress = "InProgress";
    static Done = "Done";
    static Canceled = "Canceled";
}

class Audience {
    id: number;
    title: string;
    description: string;
    type: AudienceStatus[];
    start: Date | null;
    end: Date | null;
}
type AudienceCreateProps = {
    isOpenCreateAudience: boolean;
    setIsOpenCreateAudience: any;
}

const AudienceCreate = forwardRef<HTMLFormElement>(
    ({ isOpenCreateAudience, setIsOpenCreateAudience }: AudienceCreateProps, ref) => {
        const [audience, setAudience] = useState<Audience>({
            id: 0,
            title:'',
            description: "",
            type: [],
            start: null,
            end: null,
        });
        const [reset, setReset] = useState(false);


        const resetAudience = () => {
            setAudience({
                id: 0,
                title: "",
                description: "",
                type: [],
                start: null,
                end: null,
            });
            setReset(true);
            // window.location.reload();
        };
        useEffect(() => {
            console.log("Audience data:", audience);
            console.log(audience.start !== null && audience.end !== null)
        }, [audience]);

        const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            console.log("Audience data:", audience);
            setIsOpenCreateAudience(false); // Закрыть модалку после отправки
        };
        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            setAudience(prev => ({
                ...prev,
                [e.target.name]: e.target.value,
            }));
        }
        return (
            <Modal
                isOpen={isOpenCreateAudience}
                isDropDown={false}
                setIsOpen={setIsOpenCreateAudience}
                title="Создать аудиторию"
                as="form"
                handleSubmit={handleSubmit} // Передача функции отправки
                onClickWhiteButton={() => {}}
                onClickDarkBlueButton={() => {
                    console.log("Form submitted!");
                }}
                classNameContent={styles.form}
                onClose={resetAudience}
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
                        isValid={audience.title?.length > 0}
                    />
                </label>
                <label className={styles.labelDate}>
                                       <span className={clsx(styles.span, styles.required)}>
Срок исполнения задачи</span>
                    {/*TODO setting date and adptive*/}
                    <DateRange
                        inputStyle={styles.inputDate}
                        // startDate={audience.start}
                        // endDate={audience.end}
                        isValidStyle={audience.start !== null && audience.end !== null}
                        // setStartDate={(date) => setAudience({ ...audience, start: date })}
                        // setEndDate={(date) => setAudience({ ...audience, end: date })}

                        range={{start: audience.start, end: audience.end}}
                        setRange={(range) =>
                            setAudience(prevState => ({ ...prevState, start: range.start, end: range.end }))}

                        reset={reset}
                        iconPosition={"right"}
                        oneCalendar={true}
                        withTime={false}
                    />
                </label>
                <Select
                    onChange={(selected) =>
                        setAudience(prevState => ({ ...prevState, type: selected }))}
                    selected={audience.type}
                    title="Тип задачи"
                    required={true}
                    multiple={true}
                    // name="type"
                    options={[
                        { name: AudienceStatus.New, title: "Новая" },
                        { name: AudienceStatus.InProgress, title: "В работе" },
                        { name: AudienceStatus.Done, title: "Выполнена" },
                        { name: AudienceStatus.Canceled, title: "Отменена" },
                    ]}
                    isValid={audience.type?.length > 0}
                />
                <label className={styles.label}>
                    <span className={styles.span}>Описание задачи</span>
                    <Input

                        onChange={handleChange}
                        value={audience.description}
                        className={styles.textarea}
                        placeholder="Наберите описание задачи"
                        as="textarea"
                        name="description"

                    />
                </label>
            </Modal>
        );
    }
);

export default AudienceCreate;
