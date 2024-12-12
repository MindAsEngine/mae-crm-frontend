import * as React from 'react'
import {useEffect, useState} from 'react'
import styles from "../reports.module.scss"
import {Button} from "../../../Components/FormComponents/Button/Button.tsx";
import Report from "../../../Components/Report/Report.tsx";


import ModalCustom from "../../../Components/Forms/CustomModal/ModalCustom.tsx";
import RangeDate from "../../../Components/FormComponents/RangeDate/RangeDate.tsx";
import jsonData from "./speed.json"; // Локальные данные для теста
const apiUrl = import.meta.env.VITE_API_URL;

export default function ProcessedRequestsSpeedReport(){
	const [data, setData] = useState([]); // Данные для таблицы
	const [header, setHeader] = useState([]); // Заголовок таблицы
	const [headerBefore, setHeaderBefore] = useState([]); // Заголовок таблицы
	const [footer, setFooter] = useState([]); // Футер таблицы
	const [loading, setLoading] = useState(true); // Состояние загрузки
	const [filters, setFilters] = useState({
		search: "", // Поиск по ФИО
		startDate: new Date(0),
		endDate: new Date(),
		sortField: "", // Поле для сортировки
		sortOrder: "asc", // Порядок сортировки: asc или desc
	});

	const [customSettings, setCustomSettings] = useState([]);
	const [exportClicked, setExportClicked] = useState(false);
	const setDefaultCustomSettings = (header) => {
		setCustomSettings(header.filter(cell => cell.is_additional)
			.map(cell => (
				{
					name: cell.name,
					title: cell.title,
					applied_visible: cell.is_visible
					// applied_visible: !cell.is_hidden_by_user if is to prev custom set(before apply)
				}))
		);
	}

	const formatDate = (date) => {
		const d = new Date(date);
		const day = String(d.getDate()).padStart(2, '0'); // Добавляем ведущий ноль
		const month = String(d.getMonth() + 1).padStart(2, '0'); // Добавляем ведущий ноль
		const year = d.getFullYear();

		return `${day}-${month}-${year}`;
	};

	const onCustomSettingApplied = () => {
		// @ts-ignore
		setHeader(prevHeader =>
			prevHeader.map(cell => {
				const setting = customSettings.find(s => s.name === cell.name);
				return setting ? { ...cell, is_hidden_by_user: !setting.applied_visible,
				is_visible: setting.applied_visible
				} : cell;
			})
		);
	};
	useEffect(() => {
		// Симуляция загрузки данных с сервера
		const fetchData = async () => {
			setLoading(true); // Установка состояния загрузки

			const { search, startDate, endDate, sortField, sortOrder } = filters;
			// Формирование параметров для запроса
			const params = new URLSearchParams();
			if (search !== "") params.append("search", search); // Добавляем параметр поиска
			if (startDate) params.append("start_date", formatDate(startDate)); // Начальная дата в формате ISO
			if (endDate) params.append("end_date", formatDate(endDate)); // Конечная дата в формате ISO
			if (sortField !== "") params.append("sort", sortField + "_" + sortOrder); // Поле сортировки

			await fetch(apiUrl+`/reports/speed?${params.toString()}`, {
				method: 'GET',
				mode: 'no-cors',
				credentials: 'include',
				headers: {
					'Accept': 'application/json', // Явно указываем, что ожидаем JSON
					'Content-Type': 'application/json',
				}})
				.then((res) => {
					if (!res.ok) {
						throw new Error(`HTTP error! status: ${res.status}`);
					}
					return res.json(); // Парсим JSON только при успешном статусе
				})
				.then((data) => {
					setData(data?.data); // Установка данных
					setFooter(data?.footer); // Установка футера
					setHeaderBefore(data?.headers); // Установка заголовков
					setDefaultCustomSettings(data?.headers);
				})
				.catch((err) => {
					console.error(err);
					// alert("Ошибка загрузки данных");
					setTimeout(() => {
					}, 1000); // Имитация задержки в 1 секунду
					// const data = jsonData;
					// setData(data?.data); // Установка данных
					// setFooter(data?.footer); // Установка футера
					// setHeaderBefore(data?.headers); // Установка заголовков
					// setDefaultCustomSettings(data?.headers);
				});
		};
		fetchData();
	}, [filters]);

	useEffect(() => {
		// @ts-ignore
		setHeader( headerBefore.map((cell) => ({ ...cell,
			is_hidden_by_user: !cell.is_visible })));
		setLoading(false);
	}, [headerBefore]);


	const onCheckboxChanged = (name) => {
		// @ts-ignore
		setCustomSettings(prevSettings =>
			prevSettings.map(cell =>
				cell.name === name ? { ...cell, applied_visible: !cell.applied_visible } : cell
			)
		);
	};

	const onClickCell = (rowPos: string | number, columnPos: string, cellData: string) => {
		console.log(rowPos, columnPos, cellData);
		// setIsOpenCurtain(true);
	}
	const handleExportClick = () => {
		setExportClicked(true);
	}

	useEffect(() => {
		const handleExport = async (api) => {

		}
		if (exportClicked) {
			const { search, startDate, endDate, sortField, sortOrder } = filters;
			const params = new URLSearchParams();
			if (search !== "") params.append("search", search); // Добавляем параметр поиска
			if (startDate) params.append("start", startDate?.toISOString()); // Начальная дата в формате ISO
			if (endDate) params.append("end", endDate?.toISOString()); // Конечная дата в формате ISO
			if (sortField !== "") params.append("sort", sortField + "_" + sortOrder); // Поле сортировки

			handleExport(apiUrl+`/call-center/export?${params.toString()}`)
				.then(() => {
					setExportClicked(false);
				});
		}
	}, [exportClicked]);
	const handleStartDateChange = (date) => {
		setFilters((prevFilters) => {
			// console.log('Updated Filters (start date):', updatedFilters);
			return {
				...prevFilters,
				startDate: date,
			};
		});
	};

	const handleEndDateChange = (date) => {
		setFilters((prevFilters) => {
			// console.log('Updated Filters (end date):', updatedFilters);
			return {
				...prevFilters,
				endDate: date,
			};
		});
	};
	return (
		<>

			<Report data={data}
					footer={footer}
					header={header}
					filters={filters}
					setFilters={setFilters}
					onClickCell={onClickCell}
					// isLoading={loading}
			>

				<div className={styles.custom}>
					<ModalCustom
								 customSettings={customSettings}
								 setCustomSettings={setCustomSettings}
								 header={header}
								 setDefaultCustomSettings={setDefaultCustomSettings}
								 onCustomSettingApplied={onCustomSettingApplied}
								 onCheckboxChanged={onCheckboxChanged}
					/>
					<RangeDate
						startDate={filters.startDate}
						endDate={filters.endDate}
						setStartDate={(date) => {
							handleStartDateChange(date)
							// console.log('Set start date IN FILTER BAR', date)
						}}
						setEndDate={(date) => {
							handleEndDateChange(date)
							// console.log('Set end date IN FILTER BAR', date)
						}}
					/>
					<Button
						stylizedAs={'blue-dark'}
						exportButton={true}
						onClick={handleExportClick}
					>
						Экспорт
					</Button>


				</div>
			</Report>


		</>
	)
}

