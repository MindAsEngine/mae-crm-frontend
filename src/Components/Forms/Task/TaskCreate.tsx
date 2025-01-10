import React, {useEffect, useState} from "react";
import Input from "../../FormComponents/Input/Input.tsx";
import styles from "../form.module.scss";
import Select from "../../FormComponents/Select/Select.tsx";
import DateRange from "../../FormComponents/RangeDate/RangeDate.tsx";

import {format} from "date-fns";
import Form from "../Form.tsx";
import {Button} from "../../FormComponents/Button/Button.tsx";
import clsx from "clsx";
import {getAuthHeader, logout} from "../../../Pages/Login/logout.ts";


const task_options = [
    {title: "Выполнено", name: "done"},
    {title: "Не выполнено", name: "not_done"},
]

class Task {
    id: number;
    title: string;
    description: string;
    type: string | null;
    start: Date | null;
    end: Date | null;
    applications: [];
    checkedAll: boolean;
    filter: object | null;
}
type TaskCreateProps = {
    isOpenCreateTask: boolean;
    setIsOpenCreateTask: any;
    chosenApplications: [];
    isCheckedAll: boolean;
    filter: object | null;
}

const apiUrl = import.meta.env.VITE_API_URL;
const TaskCreate = ({isOpenCreateTask, setIsOpenCreateTask, chosenApplications, isCheckedAll, filter}: TaskCreateProps) => {
    const [task, setTask] = useState<Task>({
        id: 0,
        title: "",
        description: "",
        type: null,
        start: null,
        end: null,
        applications: chosenApplications,
        checkedAll: isCheckedAll,
        filter: filter,
    });
    const navigate = useNavigate();
    const [isTouched, setIsTouched] = useState(false);
    const [needToR, setNeedToR] = useState(false);
    const [errMessage, setErrMessage] = useState(null);

    const resetTask = () => {
        setNeedToR(true);
        setTask({
            id: 0,
            title: "",
            description: "",
            type: null,
            start: null,
            end: null,
            applications: chosenApplications,
            checkedAll: isCheckedAll,
            filter: filter,
        });

    };
    const handleDateFormat = (date) =>{
        console.log(date, "date")
        const userInputDate = format(date, "yyyy-MM-dd")

        const [year, month, day] = userInputDate.split('-'); // Разбиваем строку по '-
        return `${year}-${month}-${day}T00:00:00Z`;
    }
    const postTasks =  async (title, description, type, start, end, applications) => {

        const taskForPost = {
            title: title,
            description: description,
            type: type,
            start: handleDateFormat(start),
            end: handleDateFormat(end),
            is_checked_all: isCheckedAll


        }
        if (isCheckedAll && filter) {
            taskForPost.filter = {}
            if (filter.start)
                taskForPost.filter["start_date"] = handleDateFormat(filter.start);
            if (filter.end)
                taskForPost.filter["end_date"] = handleDateFormat(filter.end);
            if (filter.daysInStatus)
                taskForPost.filter["days_in_status"] = filter.daysInStatus;
            if (filter.selects)
                filter.selects.forEach((select) => {
                    if (select.selectedOptions.length > 0) {
                        if (select.name === "status_names") {
                            taskForPost.filter["status"] = select.selectedOptions[0].name;
                        }
                        if (select.name === 'property_types') {
                            taskForPost.filter["property_type"] = select.selectedOptions[0].name;
                        }
                        if (select.name === 'regions') {
                            taskForPost.filter["region"] = select.selectedOptions[0].name;
                        }
                        if (select.name === 'project_names') {
                            taskForPost.filter["project_name"] = select.selectedOptions[0].name;
                        }
                        if (select.name === 'audience_names') {
                            taskForPost.filter["audience_name"] = select.selectedOptions[0].name;
                        }
                    }
                })
            if (Object.keys(taskForPost.filter).length < 1) {
                setIsTouched(true);
                setErrMessage("Выберите хотя бы один фильтр");
                return;
            }
        } else if (applications.length > 0) {
            taskForPost.applications = applications;

        } else {
            setIsTouched(true);
            setErrMessage("Выберите хотя бы одно заявление");
            return;
        }


        fetch(apiUrl+`/tasks`, {
            method: 'POST',
            headers: getAuthHeader(),
            body: JSON.stringify(taskForPost),
        }).then((res) => {
                if (res.ok) {
                    resetTask();
                    setIsOpenCreateTask(false);
                } else {
                    if (res.status === 401) {
                        logout();
                        navigate('/login');
                    } else {
                        throw new Error(`Ошибка: ${res.status}`);
                    }
                }
                return res.json();
            }).then(err => {throw new Error(err.error)})
            .catch((err) => {
                console.log(err);
                setErrMessage("Ошибка при создании задачи");
            })

    }
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setErrMessage(null);
        let status = "";
        if (Array.isArray(task.type) && task.type.length > 0) {
            status = task.type[0].name;
        }
        if (task.title && (task.start && task.end) && status != "" && task.description) {
            postTasks(task.title, task.description, status, task.start, task.end, task.applications);

        } else{
            setIsTouched(true);
            setErrMessage("Заполните все обязательные поля");
        }
    };
    const handleResetClick = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        resetTask();
        // setIsOpenCreateTask(false);
    };
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTask(prev => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    }
    useEffect(() => {
        if (!isCheckedAll && chosenApplications?.length === 0) {
            setErrMessage("Выберите хотя бы одно заявление");
        }
    }, []);
    return (

        <Form
            key={"createAudience"}
            isOpen={isOpenCreateTask}
            isDropDown={false}
            onClose={() => setIsOpenCreateTask(false)}
            title="Создать массовую задачу"
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
            <label className={styles.label}>
                    <span className={clsx(styles.span, styles.required)}>
                        Название</span>
                <Input
                    onChange={handleChange}
                    value={task.title}
                    className={styles.input}
                    placeholder="Наберите название задачи"
                    type="text"
                    as="input"
                    name="title"
                    isTouchedDefault={isTouched}
                    isValid={task.title !== ""}
                />
            </label>
            <Select
                onChange={(selected) =>
                    setTask(prevState => ({ ...prevState, type: selected }))}
                selected={task.type}
                title="Тип задачи"
                required={true}
                multiple={false}
                name="type"
                placeholder={"тип задачи"}


                isTouchedDefault={isTouched}
                options={task_options}
                // isValid={audience.statuses?.length > 0}

            />
            <label className={styles.labelDate}>
                <span className={clsx(styles.span, styles.required)}>Срок исполнения задачи</span>
                <DateRange

                    inputStyle={styles.inputDate_}

                    range={{start: task.start, end: task.end}}
                    setRange={(date) =>
                        setTask(prevState => ({ ...prevState, start: date.start, end: date.end }))}
                    iconPosition={"right"}
                    oneCalendar={true}
                    withTime={false}
                    isTouchedDefault={isTouched}
                    needToReset={needToR}
                    setNeedToReset={setNeedToR}
                    isValidStyle={task.start !== null && task.end !== null}
                />
            </label>

            <label className={styles.label}>
                <span className={clsx(styles.span, styles.required)}>Описание</span>
                <Input
                    onChange={handleChange}
                    value={task.description}
                    className={styles.textarea}
                    placeholder="Наберите описание задачи"
                    type="text"
                    as="textarea"
                    name="description"
                    isTouchedDefault={isTouched}
                    isValid={task.description !== ""}
                />
            </label>

        </Form>
    );}



export default TaskCreate;