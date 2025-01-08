import * as React from 'react'
import {useEffect, useState} from 'react'
import styles from "../reports.module.scss"
import {Button} from "../../../Components/FormComponents/Button/Button.tsx";
import Report from "../../../Components/Report/Report.tsx";


import ModalCustom from "../../../Components/Forms/CustomModal/ModalCustom.tsx";
import RangeDate from "../../../Components/FormComponents/RangeDate/RangeDate.tsx";
import jsonData from "./speed.json";
import {format} from "date-fns";
import {useNavigate, useSearchParams} from "react-router-dom"; // Локальные данные для теста
const apiUrl = import.meta.env.VITE_API_URL;

export default function ProcessedRequestsSpeedReport(){
	const [data, setData] = useState([]); // Данные для таблицы
	const [header, setHeader] = useState([]); // Заголовок таблицы
	const [headerBefore, setHeaderBefore] = useState([]); // Заголовок таблицы
	const [footer, setFooter] = useState([]); // Футер таблицы

	const navigate = useNavigate();
	const [searchParams] = useSearchParams();

	const [loading, setLoading] = useState(true); // Состояние загрузки
	const [filters, setFilters] = useState({

		start: searchParams.get('start_date') ? new Date(searchParams.get('start_date')) : null, // Начальная дата
		end: searchParams.get('end_date') ? new Date(searchParams.get('end_date')) : null, // Конечная дата


	});
	const getParamsForRequest = () => {
		const {start, end, } = filters;
		const params = new URLSearchParams();
		if (start) params.append("start_date", handleDateFormat(start)); // Начальная дата в формате ISO
		if (end) params.append("end_date", handleDateFormat(end)); // Конечная дата в формате ISO

		return params.toString();
	}
	const handleDateFormat = (date) =>{
		const userInputDate = format(date, "yyyy-MM-dd")
		const [year, month, day] = userInputDate.split('-'); // Разбиваем строку по '-
		return `${year}-${month}-${day}T00:00:00Z`;
	}

	const [needToResetDateTime, setNeedToResetDateTime] = useState(false);
	const [initToReload, setInitToReload] = useState(false);

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
			setData([]);



			await fetch(apiUrl+`/speed?${getParamsForRequest()}`, {
				method: 'GET',})
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
		fetchData().then(() => {
			navigate('?'+getParamsForRequest());
		})
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
		const params = new URLSearchParams();
		// alert(`Строка: ${rowPos}, Столбец: ${columnPos}, Данные: ${cellData}`);
		if(rowPos.toString() === '1')
			params.append("status", columnPos.toString());
		if (searchParams.get('start_date')) {
			params.append("start_date", searchParams.get('start_date'));
		}
		if (searchParams.get('end_date')) {
			params.append("end_date", searchParams.get('end_date'));
		}
		navigate('/tasks?' + params.toString());
	}
	const handleExportClick = () => {
		setExportClicked(true);
	}

	useEffect(() => {
		const handleExport = async () => {
			const params = getParamsForRequest();
			await fetch(apiUrl+`/speed/export?`+ params, {
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
				link.setAttribute('download', `call-center_${format(new Date(), "yyyy-MM-dd")}.xlsx`);
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

	return (
		<>

			<Report data={data}
					footer={footer}
					header={header}
					filters={filters}
					setFilters={setFilters}
					onClickCell={onClickCell}
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
						disabled={true}
						setNeedToReset={setNeedToResetDateTime}
						needToReset={needToResetDateTime}
						oneCalendar={false}
						withTime={false}
						range={{start: filters.start, end: filters.end}}
						setRange={range =>{
							setFilters(prevFilters => ({...prevFilters, start: range.start, end: range.end}))
							setInitToReload(true);
							{/*todo allow set only one start*/}

						}}/>
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

