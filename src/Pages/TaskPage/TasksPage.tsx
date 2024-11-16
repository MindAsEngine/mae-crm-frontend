import * as React from 'react'
import {useState} from "react";
import dayjs from "dayjs";

import Report from "../../Components/Report/Report.tsx";
import styles from "./task-page.module.scss";
import {Button} from "../../Components/FormComponents/Button/Button.tsx";
import {dataTasks, headerFromServerTasks} from "./dataTasks.ts";

export default function TasksPage() {
	const [filters, setFilters] = useState({
		search: '',
		startDate: dayjs().subtract(1, 'month'),
		endDate: dayjs()
	})


	const [chosenData, setChosenData] = useState([])
	console.log(chosenData)
	console.log(filters)
	// todo create forms modal for audience? task? filters
	const [isOpenCreateAudience, setIsOpenCreateAudience] = React.useState(false);
	const [isOpenCreateTask, setIsOpenCreateTask] = React.useState(false);
	const [isOpenFilters, setIsOpenFilters] = React.useState(false);

	const [customFilters, setCustomFilters] = React.useState([]);
	const [header, setHeader] = useState(headerFromServerTasks);

	const onClickCell = (rowPos: string | number, columnPos: string, cellData: string) => {
		console.log(rowPos, columnPos, cellData);

	}
	return (

		<Report data={dataTasks}
				header={header}
				chosenData={chosenData}
				setChosenData={setChosenData}
				filters={filters}
				setFilters={setFilters}

		>
			<div className={styles.custom}>

				<Button
					stylizedAs={'white'}
					filterButton={'grey'}
					onClick={() => setIsOpenFilters(true)}
				>
					Фильтр
				</Button>

				<Button
					stylizedAs={'blue-light'}
					createButton={'blue'}
					disabled={chosenData.length === 0}
					onClick={() => setIsOpenCreateTask(true)}
				>
						Создать задачу
				</Button>
				<Button
					stylizedAs={'blue-dark'}
					exportButton={'white'}
					onClick={() => setIsOpenCreateAudience(true)}
				>
					Создать аудиторию
				</Button>

			</div>
		</Report>
	)
}
