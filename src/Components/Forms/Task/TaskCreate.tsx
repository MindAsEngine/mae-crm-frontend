import React, {useState} from "react";
import Input from "../../FormComponents/Input/Input.tsx";
import styles from "./taskCreate.module.scss";
import Select from "../../FormComponents/Select/Select.tsx";
import DateRange from "../../FormComponents/RangeDate/RangeDate.tsx";

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
    type: TaskStatus;
    startDate: Date | null;
    endDate: Date | null;
}

export default function TaskCreate() {
  const [task, setTask] = useState<Task>({
    id: 0,
    title: "",
    description: "",
    type: TaskStatus.New,
    startDate: null,
    endDate: null,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTask({
      ...task,
      [e.target.name]: e.target.value,
    });
    console.log(task, e.target.name, e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(task);
  };

  return (
    <form onSubmit={handleSubmit}>
        <label>
            <span className={styles.span}>Заголовок</span>
      <Input onChange={handleChange}
             value={task.title}
             className={styles.input}
             placeholder={"Наберите заголовок задачи"}
             type={"text"}
             as={'input'}
             name={"title"}
      />
    </label>
        <Select
            onChange={handleChange}
            selected={[]}
            title={"Тип задачи"}

            name={"type"}
            options={[
                {name: TaskStatus.New, title: "Новая"},
                {name: TaskStatus.InProgress, title: "В работе"},
                {name: TaskStatus.Done, title: "Выполнена"},
                {name: TaskStatus.Canceled, title: "Отменена"},
            ]}/>
        <label className={styles.label}>
            <span className={styles.span}>Срок исполнения задачи</span>
        <DateRange startDate={task.startDate} endDate={task.endDate}
                   setStartDate={(startDate) => setTask({...task, startDate})}
                     setEndDate={(endDate) => setTask({...task, endDate})}/>
    </label>
<label className={styles.label}>
    <span className={styles.span}>Описание задачи</span>
        <Input onChange={handleChange}
               value={task.description}
               className={styles.input}
               placeholder={"Наберите описание задачи"}
               as={'textarea'}
                name={"description"}
        />
</label>
    </form>
  );
}