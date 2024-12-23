import * as React from 'react'
import {useEffect, useState} from "react";
import Report from "../../Components/Report/Report.tsx";
import styles from "./task-page.module.scss";
import {Button} from "../../Components/FormComponents/Button/Button.tsx";
import FilterTask from "../../Components/Forms/FilterTask/FilterTask.tsx";
import AudienceCreate from "../../Components/Forms/Audience/AudienceCreate.tsx";
import {format} from "date-fns";
import {switchEnum} from "../../Components/Table/switchEnum.tsx";
import {useNavigate,  useSearchParams} from "react-router-dom";

const apiUrl = import.meta.env.VITE_API_URL ;
export default function TasksPage() {
	const [searchParams] = useSearchParams();
	const navigate = useNavigate();
	const [initToReload, setInitToReload] = useState(true);
	const [data, setData] = useState([]); // Данные для таблицы
	const [dataOnPage, setDataOnPage] = useState([]); // Данные для таблицы
	const [header, setHeader] = useState([]); // Заголовок таблицы
	const [loading, setLoading] = useState(true); // Состояние загрузки
	const [isFilterLoading, setIsFilterLoading] = useState(true); // Состояние загрузки фильтров
	const [exportClicked, setExportClicked] = useState(false);
	const [countOfClickOnHeader, setCountOfClickOnHeader] = useState(0);
	const [page, setPage] = useState(searchParams.get('page') || 1);
	const [pageSize, setPageSize] = useState(searchParams.get('page_size') || 30);
	const [lock, setLock] = useState(false);
	const [needToResetData, setNeedToResetData] = useState(false);
	const [filters, setFilters] = useState({

		start: searchParams.get('start_date') ? new Date(searchParams.get('start_date')) : null, // Начальная дата
		end: searchParams.get('end_date') ? new Date(searchParams.get('end_date')) : null, // Конечная дата
		selects: [
			{
				name: "regions", // Имя фильтра
				options: [], // Опции фильтра
				title: "Регион", // Заголовок фильтра
				selectedOptions: searchParams.get('region') ? [
					{
						name:searchParams.get('region'),
						title: searchParams.get('region'),
					}] : [], // Выбранные опции
			},
			{
				name: "property_types",
				options: [],
				title: "Тип недвижимости",
				selectedOptions: searchParams.get('property_type') ? [{
					name: searchParams.get('property_type'),
					title: switchEnum(searchParams.get('property_type'), 'property_type'),
				}] : [],
			},
			{
				name: "status_names",
				options: [],
				title: "Статус",
				selectedOptions: searchParams.get('status') ? [{
					name: searchParams.get('status'),
					title: searchParams.get('status'),
				}] : [],
			},
			{
				name: "project_names",
				options: [],
				title: "Проект",
				selectedOptions: searchParams.get('project_name') ? [{
					name: searchParams.get('project_name'),
					title: searchParams.get('project_name'),
				}] : [],
			},
			{
				name: "audience_names",
				options: [],
				title: "Аудитория",
				selectedOptions: searchParams.get('audience_name') ? [{
					name: searchParams.get('audience_name'),
					title: searchParams.get('audience_name'),
				}] : [],

			}
		], // Выбранные фильтры
		sortField: searchParams.get('order_field') || "", // Поле сортировки
		sortOrder: searchParams.get('order_direction') || "", // Порядок сортировки
	});
	// console.log(filters);
	const [chosenData, setChosenData] = useState([]);
	const getParamsForRequest = () => {
		const {start, end, sortField, sortOrder, selects} = filters;
		// Формирование параметров для запроса
		const params = new URLSearchParams();
		if (start) params.append("start_date", handleDateFormat(start)); // Начальная дата в формате ISO
		if (end) params.append("end_date", handleDateFormat(end)); // Конечная дата в формате ISO
		if (sortField !== "") params.append("order_field", sortField); // Поле сортировки
		if (sortOrder) params.append("order_direction", sortOrder); // Порядок сортировки
		if (selects) {
			selects.forEach((select) => {
				if (select.selectedOptions.length > 0) {
					if (select.name === 'property_types') {
						params.append('property_type', select.selectedOptions[0].name);
					}
					if (select.name === 'regions') {
						params.append('region', select.selectedOptions[0].name);
					}
					if (select.name === 'status_names') {
						params.append('status', select.selectedOptions[0].name);
					}
					if (select.name === 'project_names') {
						params.append('project_name', select.selectedOptions[0].name);
					}
					if (select.name === 'audience_names') {
						params.append('audience_name', select.selectedOptions[0].name);
					}
				}
			});
		}
		if (pageSize) params.append("page_size", pageSize.toString()); // Количество элементов на странице
		if (page) params.append("page", page.toString()); // Текущая страница

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
						const selected = []
						if (item === 'property_types' && searchParams.get("property_type")) {
							selected.push({
								name: searchParams.get("property_type"),
								title: switchEnum(searchParams.get("property_type"), 'property_type'),
							})
						} else if (item === 'regions' && searchParams.get("region")) {
							selected.push({
								name: searchParams.get("region"),
								title: searchParams.get("region"),
							})
						} else if (item === 'status_names' && searchParams.get("status")) {
							selected.push({
								name: searchParams.get("status"),
								title: searchParams.get("status"),
							})

						} else if (item === 'project_names' && searchParams.get("project_name")) {
							selected.push({
								name: searchParams.get("project_name"),
								title: searchParams.get("project_name"),
							})
						}
						else if (item === 'audience_names' && searchParams.get("audience_name")) {
							selected.push({
								name: searchParams.get("audience_name"),
								title: searchParams.get("audience_name"),
							})
						}
						// console.log(selected);


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
							selectedOptions: selected
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
			await fetch(apiUrl+`/applications/export?${params}`, {
			method: 'GET',

			}).then(res => {
			// console.log(res);
			if (!res.ok) {
				throw new Error('Ошибка при получении файла');
			}
			return res.blob();
		}).then((blob) => {
			const url = window.URL.createObjectURL(new Blob([blob]));
			const link = document.createElement('a');
			link.href = url;
			link.setAttribute('download', `audiences_${format(new Date(), "yyyy-MM-dd")}.xlsx`);
			document.body.appendChild(link);
			link.click();
			link?.parentNode?.removeChild(link);
			window.URL.revokeObjectURL(url);
		}).catch(err => {
				console.log(err)
			}
		).finally(() => {
			setExportClicked(false);
		});
	}
	if (exportClicked) {
		handleExport();
	}
	}, [exportClicked]);



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
					setDataOnPage(data?.items); // Установка данных
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
		fetchData().then(() => {
			navigate(`/tasks?${getParamsForRequest()}`);
			if (initToReload) {
				console.log('fetchData' + getParamsForRequest());
				setNeedToResetData(true);
				setInitToReload(false);
				// alert('fetchData' + getParamsForRequest());
			} else {
				setData([...data, ...dataOnPage.filter((item) => !data.find((i) => i.id === item.id))]);
				setLock(false);
			}
		});

	}, [initToReload, page]);

	useEffect(() => {

		if (needToResetData) {
			console.log('needToResetData', needToResetData, dataOnPage);
			setData(dataOnPage);
			setNeedToResetData(false);
		}
	}, [needToResetData]);






	const [isOpenCreateAudience, setIsOpenCreateAudience] = React.useState(false);
	// const [isOpenCreateTask, setIsOpenCreateTask] = React.useState(false);
	const [isOpenFilters, setIsOpenFilters] = React.useState(false);



	const countBadge = () => {
		let count = 0;
		if (filters.selects && Array.isArray(filters.selects)) {
			count += filters.selects.reduce((acc, select) => acc + select.selectedOptions.length, 0);
		}
		if (filters.start&&filters.end) {
			count++;
		}

		return count;
	};

	const onClickCell = (columnPos: string) => {
		let direction = '';
		let field = '';
		if (columnPos === "name") {
			field = "client_name";
		} else {
			field = columnPos;
		}

		if (countOfClickOnHeader === 0) {
			setCountOfClickOnHeader(prevState => prevState+1);
			direction = 'ASC';
		} else if (countOfClickOnHeader === 1 && filters.sortField === field) {
			setCountOfClickOnHeader(prevState => prevState+1);
			direction = 'DESC';
		} else {
			setCountOfClickOnHeader(0);
			if (filters.sortField === field) {
				direction = 'ASC';
			} else {
				direction = '';

			}

		}
		if (direction == 'ASC' || direction == 'DESC') {
			setFilters({
				...filters,
				sortField: field,
				sortOrder: direction,
			})
			setInitToReload(true);
		}
	}
	const onScrollEnd = () => {
		if (!lock){
			setLock(prev => !prev);
			setPage(prev => +prev + 1);
			console.log('onScrollEnd');
		}

	}

	return (
		<>
		{/*<Switch/>*/}

		<Report data={data}
				header={header}
				chosenData={chosenData}
				setChosenData={setChosenData}
				isLoading={loading}
				onHeaderClick={onClickCell}
				onScrollEnd={onScrollEnd}
				// filters={filters}
				// setFilters={setFilters}

		>
			<div className={styles.custom}>
				<Button
					stylizedAs={'blue-light'}
					exportButton={true}
					onClick={() => setExportClicked(true)}> Экспорт</Button>

				<Button
					as={'div'}
					badge={countBadge() !== 0 ? countBadge().toString() : undefined}
					stylizedAs={'white'}
					filterButton={true}
					onClick={() => setIsOpenFilters(true)}
				>
					Фильтр</Button>
					{isOpenFilters && <FilterTask filters={filters}
								setFilters={setFilters}
								setIsOpenModal={setIsOpenFilters}
								isOpenModal={isOpenFilters}
							 								setInitToReload={setInitToReload}
							 isLoading={isFilterLoading}
								// onClickDarkBlueButton={onCustomSettingApplied}
								// onClickWhiteButton={() =>
								// {setDefaultOnCustomSetting(customFiltersFromServer);
								// setIsOpenFilters(false)}}
					/>}





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
				{isOpenCreateAudience && <AudienceCreate
					// setInitToReload={setInitToReload}
					isOpenCreateAudience={isOpenCreateAudience}
								setIsOpenCreateAudience={setIsOpenCreateAudience}
				/>}


			</div>
		</Report>
		</>
	)
}
