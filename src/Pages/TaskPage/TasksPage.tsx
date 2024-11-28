import * as React from 'react'
import {useEffect, useState} from "react";
import Report from "../../Components/Report/Report.tsx";
import styles from "./task-page.module.scss";
import {Button} from "../../Components/FormComponents/Button/Button.tsx";
import {customFiltersFromServer, dataTasks, headerFromServerTasks} from "./dataTasks.ts";
import FilterTask from "../../Components/Forms/FilterTask/FilterTask.tsx";
import Modal from "../../Components/Modal/Modal.tsx";
import TaskCreate from "../../Components/Forms/Task/TaskCreate.tsx";

export default function TasksPage() {
	const [filters, setFilters] = useState({
		search: '',
		startDate: null,
		endDate: null,
	})
	const [customFilters, setCustomFilters] = useState([]);
	const setDefaultOnCustomSetting = (filtersFromServer) => {
		// @ts-ignore
		setCustomFilters(filtersFromServer.map(filter =>({
			name: filter.name,
			title: filter.title,
			options: filter.options,
			selectedOptions: []
		})))
	}
	const onCustomSettingApplied = () => {
		console.log("onCustomSettingApplied");
	}
	useEffect(() => {
		setDefaultOnCustomSetting(customFiltersFromServer);
	}, []);


	const [chosenData, setChosenData] = useState([])
	console.log(chosenData)
	console.log(filters)
	// todo create forms modal for audience
	const [isOpenCreateAudience, setIsOpenCreateAudience] = React.useState(false);
	const [isOpenCreateTask, setIsOpenCreateTask] = React.useState(false);
	const [isOpenFilters, setIsOpenFilters] = React.useState(false);

	const [header, setHeader] = useState(headerFromServerTasks);
	console.log(customFilters);
	const onClickCell = (rowPos: string | number, columnPos: string, cellData: string) => {
		console.log(rowPos, columnPos, cellData);
	}

	return (
		<>
		{/*<Switch/>*/}

		<Report data={dataTasks}
				header={header}
				chosenData={chosenData}
				setChosenData={setChosenData}
				filters={filters}
				setFilters={setFilters}

		>
			<div className={styles.custom}>


					<FilterTask filters={customFilters}
								setFilters={setCustomFilters}
								setIsOpenModal={setIsOpenFilters}
								isOpenModal={isOpenFilters}
								onClickDarkBlueButton={onCustomSettingApplied}
								onClickWhiteButton={() =>
								{setDefaultOnCustomSetting(customFiltersFromServer);
								setIsOpenFilters(false)}}
					/>


				<Button
					stylizedAs={'blue-dark'}
					createButton={true}
					disabled={chosenData.length === 0}
					as={'div'}
					// loading={chosenData.length === 0}
					onClick={() => setIsOpenCreateTask(true)}
				>
					Создать задачу
					<TaskCreate isOpenCreateTask={isOpenCreateTask} setIsOpenCreateTask={setIsOpenCreateTask}/>
				</Button>
				<Button

					stylizedAs={'blue-dark'}
					// loading={chosenData.length === 0}
					createButton={true}
					onClick={() => setIsOpenCreateAudience(true)}
				>
					Создать аудиторию
				</Button>

			</div>
		</Report>
		</>
	)
}
