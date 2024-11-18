import * as React from 'react'
import {useEffect, useState} from "react";
import Report from "../../Components/Report/Report.tsx";
import styles from "./task-page.module.scss";
import {Button} from "../../Components/FormComponents/Button/Button.tsx";
import {customFiltersFromServer, dataTasks, headerFromServerTasks} from "./dataTasks.ts";
import FilterTask from "../../Components/Forms/FilterTask/FilterTask.tsx";

export default function TasksPage() {
	const [filters, setFilters] = useState({
		search: '',
		startDate: '',
		endDate: ''
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
	// todo create forms modal for audience? task? filters
	const [isOpenCreateAudience, setIsOpenCreateAudience] = React.useState(false);
	const [isOpenCreateTask, setIsOpenCreateTask] = React.useState(false);
	const [isOpenFilters, setIsOpenFilters] = React.useState(false);

	const [header, setHeader] = useState(headerFromServerTasks);
	console.log(customFilters);
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
					<FilterTask filters={customFilters}
								setFilters={setCustomFilters}
								setIsOpenModal={setIsOpenFilters}
								isOpenModal={isOpenFilters}
								onClickDarkBlueButton={onCustomSettingApplied}
								onClickWhiteButton={() => setDefaultOnCustomSetting(customFiltersFromServer)}
					/>
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
