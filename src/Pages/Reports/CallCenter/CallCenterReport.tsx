import * as React from "react";
import { useEffect, useState } from "react";
import styles from "./call-center.module.scss";
import { Button } from "../../../Components/FormComponents/Button/Button.tsx";
import Report from "../../../Components/Report/Report.tsx";
import RangeDate from "../../../Components/FormComponents/RangeDate/RangeDate.tsx";
import ModalCustom from "../../../Components/Forms/CustomModal/ModalCustom.tsx";
import jsonData from "./call-center.json"; // Локальные данные для теста

export default function CallCenterReport() {
	const [data, setData] = useState([]); // Данные для таблицы
	const [header, setHeader] = useState([]); // Заголовок таблицы
	const [headerBefore, setHeaderBefore] = useState([]); // Заголовок таблицы
	const [footer, setFooter] = useState([]); // Футер таблицы
	const [loading, setLoading] = useState(true); // Состояние загрузки
	const [filters, setFilters] = useState({
		search: "", // Поиск по ФИО
		startDate: null, // Начальная дата
		endDate: null, // Конечная дата
		sortField: "", // Поле для сортировки
		sortOrder: "asc", // Порядок сортировки: asc или desc
	});
	const [customSettings, setCustomSettings] = useState([]);

	// Инициализация пользовательских настроек колонок
	const setDefaultCustomSettings = (header) => {
		setCustomSettings(
			header
				.filter((cell) => cell.is_additional)
				.map((cell) => ({
					name: cell.name,
					title: cell.title,
					applied_visible: cell.is_visible,
				}))
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
			if (startDate) params.append("start", startDate?.toISOString()); // Начальная дата в формате ISO
			if (endDate) params.append("end", endDate?.toISOString()); // Конечная дата в формате ISO
			if (sortField !== "") params.append("sort", sortField + "_" + sortOrder); // Поле сортировки

			await fetch(`/api/call-center?${params.toString()}`, {
					method: 'GET',
					headers: {
						'Accept': 'application/json', // Явно указываем, что ожидаем JSON
					}})
				.then((res) => {
					if (!res.ok) {
						setTimeout(() => {
						}, 1000); // Имитация задержки в 1 секунду
						return jsonData;

						// throw new Error(`HTTP error! status: ${res.status}`);
					}
					return res.json(); // Парсим JSON только при успешном статусе
				})
				.then((data) => {
					setData(data?.data); // Установка данных
					setFooter(data?.footer); // Установка футера
					setHeaderBefore(data?.headers); // Установка заголовков
					setDefaultCustomSettings(data?.headers);
				})
				.catch((err) => console.error(err));
		};
		fetchData();
	}, [filters]);

	useEffect(() => {
		// @ts-ignore
		setHeader( headerBefore.map((cell) => ({ ...cell,
			is_hidden_by_user: !cell.is_visible })));
		setLoading(false);
	}, [headerBefore, filters]);


	const handleStartDateChange = (date) => {
		setFilters((prevFilters) => ({
			...prevFilters,
			startDate: date,
		}));
	};

	const handleEndDateChange = (date) => {
		setFilters((prevFilters) => ({
			...prevFilters,
			endDate: date,
		}));
	};

	const onCustomSettingApplied = () => {
		// @ts-ignore
		setHeader((prevHeader) =>
			prevHeader.map((cell) => {
				const setting = customSettings.find((s) => s.name === cell.name);
				return setting
					? { ...cell, is_hidden_by_user: !setting.applied_visible }
					: cell;
			})
		);
	};

	const onCheckboxChanged = (name) => {
		// @ts-ignore
		setCustomSettings((prevSettings) =>
			prevSettings.map((cell) =>
				cell.name === name
					? { ...cell, applied_visible: !cell.applied_visible }
					: cell
			)
		);
	};


	//todo sorting
	return (
		<Report
			data={data}
			header={header}
			filters={filters}
			footer={footer}
			setFilters={setFilters}
			isLoading={loading}
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
					setStartDate={(date) => handleStartDateChange(date)}
					setEndDate={(date) => handleEndDateChange(date)}
				/>
				<Button
					stylizedAs={"blue-dark"}
					exportButton={"white"}
					onClick={() => console.log("export")}
				>
					Экспорт
				</Button>
			</div>
		</Report>
	);
}
