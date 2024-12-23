import * as React from 'react'
import {useEffect, useState} from "react";
import Report from "../../Components/Report/Report.tsx";
import styles from "./task-page.module.scss";
import {Button} from "../../Components/FormComponents/Button/Button.tsx";
import FilterTask from "../../Components/Forms/FilterTask/FilterTask.tsx";
import AudienceCreate from "../../Components/Forms/Audience/AudienceCreate.tsx";
import {format} from "date-fns";
import {switchEnum} from "../../Components/Table/switchEnum.tsx";
const apiUrl = import.meta.env.VITE_API_URL ;
export default function TasksPage() {
	const [initToReload, setInitToReload] = useState(true);
	const [page, setPage] = useState(1); // Текущая страница
	const pageSize = 25; // Количество элементов на странице
	const [data, setData] = useState([]); // Данные для таблицы
	const [header, setHeader] = useState([]); // Заголовок таблицы
	const [footer, setFooter] = useState([]); // Футер таблицы
	const [loading, setLoading] = useState(true); // Состояние загрузки
	const [isFilterLoading, setIsFilterLoading] = useState(true); // Состояние загрузки фильтров
	const [exportClicked, setExportClicked] = useState(false);
	const [filters, setFilters] = useState({
		page: 1, // Текущая страница
		start: null, // Начальная дата
		end: null, // Конечная дата
		selects: [], // Выбранные фильтры
		sortField: "", // Поле для сортировки
		sortOrder: "asc", // Порядок сортировки: asc или desc
	});
	const [chosenData, setChosenData] = useState([]);
	const getParamsForRequest = () => {
		const {start, end, sortField, sortOrder} = filters;
		// Формирование параметров для запроса
		const params = new URLSearchParams();
		if (start) params.append("start_date", handleDateFormat(start)); // Начальная дата в формате ISO
		if (end) params.append("end_date", handleDateFormat(end)); // Конечная дата в формате ISO
		if (sortField !== "") params.append("sort", sortField + "_" + sortOrder); // Поле сортировки
		return params.toString();
	}
	const handleDateFormat = (date) =>{
		const userInputDate = format(date, "yyyy-MM-dd")
		const [year, month, day] = userInputDate.split('-'); // Разбиваем строку по '-
		return `${year}-${month}-${day}T00:00:00Z`;
	}
	useEffect(() => {
		const getTitleByName = (name) => {
			switch (name) {
				case 'regions':
					return 'Регион';
				case 'property_types':
					return 'Тип недвижимости';
				case 'status_names':
					return 'Статус';
				case 'project_names':
					return 'Проект';
				case 'audience_names':
					return 'Аудитория';
				default:
					return name;
			}
		}
		const handleFetchFilters = async () => {
			setIsFilterLoading(true); // Установка состояния загрузки
			fetch(apiUrl + `/applications/filters`, {
				method: 'GET',
				headers: {}
			})
				.then((res) => {
					if (!res.ok) {
						throw new Error(`HTTP error! status: ${res.status}`);
					}
					return res.json(); // Парсим JSON только при успешном статусе
				})
				.then((res) => {

					const selects = Object.keys(res).map((item) => {

						return {
							name: item,
							options: res[item].map((one) => {
								if (item === 'property_types') {
									return {
										name: one,
										title: switchEnum(one, 'property_type'),
									};
								}
								return {
									name: one,
									title: one,
								};
							}),
							title: getTitleByName(item),
							selectedOptions: [],
						};
					})
					setFilters({...filters, selects: selects}); // Установка данных
				})
				.catch((err) => {
					console.error(err);
				})
				.finally(() => {
					setIsFilterLoading(false); // Состояние загрузки
				});
		}
		handleFetchFilters();
	}, []);


	useEffect(() => {
		const handleExport = async () => {
			const params = getParamsForRequest();
		}
		if (exportClicked) {
			handleExport();
		}
	}, [exportClicked]);
	// useEffect(() => {
	// // 	todo change path params
	// }, [filters]);
	// useEffect(() => {
	// // 	todo in the end of page set page + 1 and fetch new data
	// // 		or -1 and fetch new data
	// }, []);



	console.log(chosenData)
	console.log(filters)
	useEffect(() => {
		// Симуляция загрузки данных с сервера
		const fetchData = async () => {
			setLoading(true); // Установка состояния загрузки
			const params = getParamsForRequest();
			await fetch(apiUrl+`/applications?${params}`, {
				method: 'GET',
				headers: {

				}})
				.then((res) => {
					if (!res.ok) {
						throw new Error(`HTTP error! status: ${res.status}`);
					}
					return res.json(); // Парсим JSON только при успешном статусе
				})
				.then((data) => {
					setData(data?.items); // Установка данных
					// setFooter(data?.footer); // Установка футера
					setHeader(data?.header); // Установка заголовков
					 // Состояние загрузки

				})
				.catch((err) => {
					console.error(err);
				}).finally(() => {
					setLoading(false); // Состояние загрузки
				});
		};
		if (initToReload) {
			fetchData();
			setInitToReload(false);
		}

	}, [initToReload]);
	const [isOpenCreateAudience, setIsOpenCreateAudience] = React.useState(false);
	// const [isOpenCreateTask, setIsOpenCreateTask] = React.useState(false);
	const [isOpenFilters, setIsOpenFilters] = React.useState(false);





	const onClickCell = (rowPos: string | number, columnPos: string, cellData: string) => {
		console.log(rowPos, columnPos, cellData);
	// 	todo for sorting
	}

	return (
		<>
		{/*<Switch/>*/}

		<Report data={data}
				header={header}
				chosenData={chosenData}
				setChosenData={setChosenData}
				isLoading={loading}
				// filters={filters}
				// setFilters={setFilters}

		>
			<div className={styles.custom}>


				 <FilterTask filters={filters}
								setFilters={setFilters}
								setIsOpenModal={setIsOpenFilters}
								isOpenModal={isOpenFilters}
							 								setInitToReload={setInitToReload}
							 isLoading={isFilterLoading}
								// onClickDarkBlueButton={onCustomSettingApplied}
								// onClickWhiteButton={() =>
								// {setDefaultOnCustomSetting(customFiltersFromServer);
								// setIsOpenFilters(false)}}
					/>



				{/*<Button*/}
				{/*	stylizedAs={'blue-dark'}*/}
				{/*	createButton={true}*/}
				{/*	disabled={chosenData.length === 0}*/}
				{/*	as={'div'}*/}
				{/*	// Loading={chosenData.length === 0}*/}
				{/*	onClick={() => setIsOpenCreateTask(true)}*/}
				{/*>*/}
				{/*	Создать задачу*/}

				{/*</Button>*/}
				{/*{isOpenCreateTask && <TaskCreate isOpenCreateTask={isOpenCreateTask} setIsOpenCreateTask={setIsOpenCreateTask}/>}*/}

				<Button

					stylizedAs={'blue-dark'}
					// Loading={chosenData.length === 0}
					createButton={true}
					onClick={() => setIsOpenCreateAudience(true)}
				>
					Создать аудиторию
				</Button>
				<AudienceCreate
					// setInitToReload={setInitToReload}
					isOpenCreateAudience={isOpenCreateAudience}
								setIsOpenCreateAudience={setIsOpenCreateAudience}
				/>


			</div>
		</Report>
		</>
	)
}
