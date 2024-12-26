import * as React from 'react'
import {useEffect, useState} from 'react'
import styles from "../reports.module.scss"
import {Button} from "../../../Components/FormComponents/Button/Button.tsx";
import Report from "../../../Components/Report/Report.tsx";
import ModalCustom from "../../../Components/Forms/CustomModal/ModalCustom.tsx";
import RangeDate from "../../../Components/FormComponents/RangeDate/RangeDate.tsx";
import {format} from "date-fns";
import {useNavigate, useSearchParams} from "react-router-dom";
const apiUrl = import.meta.env.VITE_API_URL ;

export default function RegionsReport() {
	const [searchParams] = useSearchParams();

	const navigate = useNavigate();
	const [data, setData] = useState([]); // Данные для таблицы
	const [header, setHeader] = useState([]); // Заголовок таблицы
	const [headerBefore, setHeaderBefore] = useState([]); // Заголовок таблицы
	const [footer, setFooter] = useState([]); // Футер таблицы
	const [loading, setLoading] = useState(true); // Состояние загрузки
	const [exportClicked, setExportClicked] = useState(false);
	const [countOfClickOnHeader, setCountOfClickOnHeader] = useState(0);
	const [filters, setFilters] = useState({
		start: null, // Начальная дата
		end: null, // Конечная дата
		sortField: "", // Поле для сортировки
		sortOrder: "", // Порядок сортировки: asc или desc
	});
	const [customSettings, setCustomSettings] = useState([]);
	const [needToResetDateTime, setNeedToResetDateTime] = useState(false);
	// const [page, setPage] = useState(1);
	// const [pageSize, setPageSize] = useState(30);

	// useEffect(() => {
	// 	if (needToResetDateTime) {
	// 		setFilters(prevFilters => ({...prevFilters, start: null, end: null}));
	// 		setNeedToResetDateTime(false);
	// 		console.log(filters)
	// 	}
	// }, [needToResetDateTime]);
	const setDefaultCustomSettings = (header) => {
		setCustomSettings(header.filter(cell => cell.is_additional)
			.map(cell => ({
					name: cell.name,
					title: cell.title,
					applied_visible: cell.is_visible }))
		);
	}
	useEffect(() => {
		// Симуляция загрузки данных с сервера
		const fetchData = async () => {
			setLoading(true); // Установка состояния загрузки
			const params = getParamsForRequest();
			await fetch(apiUrl+`/regions?${params}`, { method: 'GET' })
				.then((res) => {
					if (!res.ok) {
						throw new Error(`HTTP error! status: ${res.status}`);
					}
					return res.json(); // Парсим JSON только при успешном статусе
				})
				.then((data) => {
					// console.log(data[0]);
					setData(data?.data); // Установка данных
					setFooter(data?.footer); // Установка футера
					setHeaderBefore(data?.headers); // Установка заголовков
					setDefaultCustomSettings(data?.headers);
				})
				.catch((err) => {
					console.error(err);
				});
		};
		fetchData().then(() => {
			navigate('?'+getParamsForRequest());
		});
	}, [filters]);


	useEffect(() => {
		setHeader( headerBefore.map((cell) => ({
			...cell, is_hidden_by_user: !cell.is_visible })));
		setLoading(false);
	}, [headerBefore]);

	const onCustomSettingApplied = () => {
		setHeader(prevHeader =>
			prevHeader.map(cell => {
				const setting = customSettings
					.find(s => s.name === cell.name);
				return setting ? {
					...cell,
					is_hidden_by_user: !setting.applied_visible,
					is_visible: setting.applied_visible
				} : cell;
			})
		);
	};


	const onCheckboxChanged = (name) => {
		setCustomSettings(prevSettings =>
			prevSettings.map(cell =>
				cell.name === name ? { ...cell, applied_visible: !cell.applied_visible } : cell
			)
		);
	};

	const onClickCell = (rowPos: string | number, columnPos: string, cellData: string) => {
		console.log(rowPos, columnPos, cellData);
	}
	const getParamsForRequest = () => {
		const {start, end, sortField, sortOrder} = filters;
		const params = new URLSearchParams();
		if (start) params.append("start_date", handleDateFormat(start)); // Начальная дата в формате ISO
		if (end) params.append("end_date", handleDateFormat(end)); // Конечная дата в формате ISO
		if (sortField !== "") params.append("order_field", sortField); // Поле сортировки
		if (sortOrder !== "") params.append("order_direction", sortOrder); // Порядок сортировки
		return params.toString();
	}
	const handleDateFormat = (date) =>{
		const userInputDate = format(date, "yyyy-MM-dd")
		const [year, month, day] = userInputDate.split('-'); // Разбиваем строку по '-
		return `${year}-${month}-${day}T00:00:00Z`;
	}
	useEffect(() => {
		const handleExport = async () => {
			const params = getParamsForRequest();
			await fetch(apiUrl+`/regions/export?${params}`, { method: 'GET',})
			.then(res => {
				if (!res.ok) {
					throw new Error('Ошибка при получении файла');
				}
				return res.blob();}
			).then((blob) => {
				const url = window.URL.createObjectURL(new Blob([blob]));
				const link = document.createElement('a');
				link.href = url;
				link.setAttribute('download', `regions_${format(new Date(), "yyyy-MM-dd")}.xlsx`);
				document.body.appendChild(link);
				link.click();
				link?.parentNode?.removeChild(link);
				window.URL.revokeObjectURL(url);
				}
			).catch(err => {
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
	const handleExportClick = () => {
		setExportClicked(true);
	}
	const onHeaderClick = (columnPos: string) => {
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
		}
	}
	return (
		<>
			<Report data={data}
					header={header}
					footer={footer}
					isLoading={loading}
					filters={filters}
					setFilters={setFilters}
					onHeaderClick={onHeaderClick}
					onClickCell={onClickCell} >
				<div className={styles.custom}>
					<ModalCustom
						needScroll={true}
						customSettings={customSettings}
						setCustomSettings={setCustomSettings}
						header={header}
						setDefaultCustomSettings={setDefaultCustomSettings}
						onCustomSettingApplied={onCustomSettingApplied}
						onCheckboxChanged={onCheckboxChanged} />
					<RangeDate
						setNeedToReset={setNeedToResetDateTime}
						needToReset={needToResetDateTime}
						oneCalendar={false}
						withTime={false}
						range={{start: filters.start, end: filters.end}}
						setRange={range =>{
							setFilters(prevFilters => ({...prevFilters, start: range.start, end: range.end}))
							// setInitToReload(true);
							{/*todo allow set only one start*/}

						}}/>


					<Button
						disabled={Array.isArray(data) && data.length === 0}
						stylizedAs={'blue-dark'}
						exportButton={'white'}
						onClick={handleExportClick}>Экспорт</Button>
				</div>
			</Report>
		</>
	)
}
