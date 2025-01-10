import * as React from "react";
import { useEffect, useState } from "react";
import styles from "../reports.module.scss";
import { Button } from "../../../Components/FormComponents/Button/Button.tsx";
import Report from "../../../Components/Report/Report.tsx";
import RangeDate from "../../../Components/FormComponents/RangeDate/RangeDate.tsx";

import {format} from "date-fns";
import {useNavigate, useSearchParams} from "react-router-dom";

const apiUrl = import.meta.env.VITE_API_URL;


export default function CallCenterReport() {
	const [searchParams] = useSearchParams();
	const navigate = useNavigate();
	const [data, setData] = useState([]); // Данные для таблицы
	const [header, setHeader] = useState([]); // Заголовок таблицы
	const [headerBefore, setHeaderBefore] = useState([]); // Заголовок таблицы
	const [footer, setFooter] = useState([]); // Футер таблицы
	const [loading, setLoading] = useState(true); // Состояние загрузки
	const [needToResetDateTime, setNeedToResetDateTime] = useState(false);
	const [countOfClickOnHeader, setCountOfClickOnHeader] = useState(0);
	const [filters, setFilters] = useState({
		// search: "", // Поиск по ФИО
		start: searchParams.get('start_date') ? new Date(searchParams.get('start_date')) : null, // Начальная дата
		end: searchParams.get('end_date') ? new Date(searchParams.get('end_date')) : null, // Конечная дата
		sortField: searchParams.get('order_field') ? searchParams.get('order_field') : "", // Поле для сортировки
		sortOrder: searchParams.get('order_direction') ? searchParams.get('order_direction') : "", // Порядок сортировки: asc или desc
	});

	const [exportClicked, setExportClicked] = useState(false);
	const getParamsForRequest = () => {
		const {start, end, sortOrder, sortField} = filters;
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
		// Симуляция загрузки данных с сервера
		const fetchData = async () => {
			setLoading(true); // Установка состояния загрузки
			setData([]);
			const params = getParamsForRequest();
			await fetch(apiUrl+`/call-center?${params.toString()}`, {
				method: 'GET',
				headers: {
					Authorization: `Bearer ${localStorage.getItem('token')}`,
				},
			})
				.then((res) => {
					if (!res.ok) {
						throw new Error(`HTTP error! status: ${res.status}`);
					}
					return res.json(); // Парсим JSON только при успешном статусе
				})
				.then((data) => {
					// throw new Error("asd");
					setData(data?.data); // Установка данных
					setFooter(data?.footer); // Установка футера
					setHeaderBefore(data?.headers); // Установка заголовка
				})
				.catch((err) => {
					console.error(err);
				})
				.finally(() =>{
					setLoading(false);
					navigate('?'+getParamsForRequest());
				});
		};
		fetchData();
	}, [filters]);

	useEffect(() => {
		// @ts-ignore

			setHeader(headerBefore.map((cell) => ({ ...cell,
				is_hidden_by_user: !cell.is_visible })));


	}, [headerBefore]);

	const handleExportClick = () => {
		setExportClicked(true);
	}
	useEffect(() => {
		const handleExport = async () => {
			const params = getParamsForRequest();
			await fetch(apiUrl+`/call-center/export?`+ params, {
				method: 'GET',
				headers: {
					Authorization: `Bearer ${localStorage.getItem('token')}`,
				},

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

	const onHeaderClick = (columnPos: string) => {
		let direction = '';
		let field = '';
		// if (columnPos === "name") {
		// 	field = "client_name";
		// } else {
		// 	field = columnPos;
		// }
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
		<Report
			data={data}
			header={header}
			filters={filters}
			footer={footer}
			setFilters={setFilters}
			isLoading={loading}
			onHeaderClick={onHeaderClick}
		>
			<div className={styles.custom}>


				<RangeDate
					disabled={!(data?.length > 0)}

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
					disabled={!(data?.length > 0)}
					stylizedAs={"blue-dark"}
					exportButton={"white"}
					onClick={handleExportClick}
				>
					Экспорт
				</Button>
			</div>
		</Report>
	);
}
