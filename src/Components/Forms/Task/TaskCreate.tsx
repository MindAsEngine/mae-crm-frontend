import React, {forwardRef, useState} from "react";
import Input from "../../FormComponents/Input/Input.tsx";
import styles from "./taskCreate.module.scss";
import Select from "../../FormComponents/Select/Select.tsx";
import DateRange from "../../FormComponents/RangeDate/RangeDate.tsx";
import Modal from "../../Modal/Modal.tsx";

class TaskStatus {
    static New = "New";
    static InProgress = "InProgress";
    static Done = "Done";
    static Canceled = "Canceled";
}

class Task {
    id: number;
    title: string;
    description: string;
    type: TaskStatus[];
    startDate: Date | null;
    endDate: Date | null;
}
type TaskCreateProps = {
    isOpenCreateTask: boolean;
    setIsOpenCreateTask: any;
}

const TaskCreate = forwardRef<HTMLFormElement>(
    ({ isOpenCreateTask, setIsOpenCreateTask }: TaskCreateProps, ref) => {
        const [task, setTask] = useState<Task>({
            id: 0,
            title: "",
            description: "",
            type: [],
            startDate: null,
            endDate: null,
        });

        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            setTask({
                ...task,
                [e.target.name]: e.target.value,
            });
        };

        const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            console.log("Task data:", task);
            setIsOpenCreateTask(false); // Закрыть модалку после отправки
        };

        return (
            <Modal
                isOpen={isOpenCreateTask}
                isDropDown={false}
                setIsOpen={setIsOpenCreateTask}
                title="Создать задачу"
                as="form"
                handleSubmit={handleSubmit} // Передача функции отправки
                onClickWhiteButton={() => setIsOpenCreateTask(false)}
                onClickDarkBlueButton={() => {
                    console.log("Form submitted!");
                }}
                classNameContent={styles.form}
            >
                <label className={styles.label}>
                    <span className={styles.span}>Заголовок</span>
                    <Input
                        onChange={handleChange}
                        value={task.title}
                        className={styles.input}
                        placeholder="Наберите заголовок задачи"
                        type="text"
                        as="input"
                        name="title"
                    />
                </label>
                <label className={styles.labelDate}>
                    <span className={styles.span}>Срок исполнения задачи</span>
                    {/*TODO setting date and adptive*/}
                    <DateRange
                        startDate={task.startDate}
                        endDate={task.endDate}
                        setStartDate={(startDate) =>
                            setTask({ ...task, startDate })
                        }
                        setEndDate={(endDate) =>
                            setTask({ ...task, endDate })
                        }
                    />
                </label>
                <Select
                    onChange={(selected) => setTask({ ...task, type: selected })}
                    selected={task.type}
                    title="Тип задачи"
                    multiple={true}
                    name="type"
                    options={[
                        { name: TaskStatus.New, title: "Новая" },
                        { name: TaskStatus.InProgress, title: "В работе" },
                        { name: TaskStatus.Done, title: "Выполнена" },
                        { name: TaskStatus.Canceled, title: "Отменена" },
                    ]}
                />
                <label className={styles.label}>
                    <span className={styles.span}>Описание задачи</span>
                    <Input
                        onChange={handleChange}
                        value={task.description}
                        className={styles.textarea}
                        placeholder="Наберите описание задачи"
                        as="textarea"
                        name="description"
                        maxLength={500}
                    />
                </label>
            </Modal>
        );
    }
);

export default TaskCreate;
