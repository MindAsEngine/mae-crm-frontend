import * as React from 'react';
import { useEffect, useState } from 'react';
import styles from "../reports.module.scss";
import { Button } from "../../../Components/FormComponents/Button/Button.tsx";
import Report from "../../../Components/Report/Report.tsx";
import ModalCustom from "../../../Components/Forms/CustomModal/ModalCustom.tsx";
import { format } from "date-fns";
import { useNavigate, useSearchParams } from "react-router-dom";
import FilterTask from "../../../Components/Forms/FilterTask/FilterTask.tsx";
import {switchEnum} from "../../../Components/Table/switchEnum.tsx";

const apiUrl = import.meta.env.VITE_API_URL;

export default function RegionsReport() {
	const [searchParams] = useSearchParams();
	const navigate = useNavigate();

	// States
	const [data, setData] = useState([]);
	const [header, setHeader] = useState([]);
	const [headerBefore, setHeaderBefore] = useState([]);
	const [footer, setFooter] = useState([]);
	const [loading, setLoading] = useState(false);
	const [exportClicked, setExportClicked] = useState(false);
	const [countOfClickOnHeader, setCountOfClickOnHeader] = useState(0);
	const [initToReload, setInitToReload] = useState(true);
	const [isFiltersLoading, setIsFiltersLoading] = useState(true);
	const [isFiltersOpen, setIsFiltersOpen] = useState(false);
	function createFilter(name, value, enumType = '', title = '') {
		return {
			name,
			options: [],
			title: title ,
			selectedOptions: value ? [{ name: value, title: switchEnum(value, enumType) || value }] : [],
		};
	}
	const [filters, setFilters] = useState({
		selects: [ createFilter('status_names', searchParams.get('status'), '', 'Статус')
		],
		start: searchParams.get('start_date') ? new Date(searchParams.get('start_date')) : null,
		end: searchParams.get('end_date') ? new Date(searchParams.get('end_date')) : null,
		sortField: searchParams.get('order_field') || "",
		sortOrder: searchParams.get('order_direction') || "",
	});

	const [customSettings, setCustomSettings] = useState([]);

	// Helper functions
	const setDefaultCustomSettings = (header) => {
		setCustomSettings(header.filter(cell => cell.is_additional)
			.map(cell => ({
				name: cell.name,
				title: cell.title,
				applied_visible: cell.is_visible
			}))
		);
	};

	const getParamsForRequest = () => {
		const { start, end, selects } = filters;
		const params = new URLSearchParams();
		if (start) params.append("start_date", formatISODate(start));
		if (end) params.append("end_date", formatISODate(end));
		selects?.forEach(select => {
			select.selectedOptions?.forEach(option => {
				params.append("status", option.name);
			});
		});
		return params.toString();
	};

	const formatISODate = (date) => {
		return format(date, "yyyy-MM-dd") + "T00:00:00Z";
	};

	const countBadge = () => {
		// console.log(filters.selects)
		return filters.selects.reduce((acc, select) => acc + select.selectedOptions.length, 0) + (filters.start && filters.end ||  filters.start
			? 1 : 0);
	}

	// Data fetching
	useEffect(() => {
		const fetchFilters = async () => {
			setIsFiltersLoading(true);
			try {
				const res = await fetch(`${apiUrl}/applications/filters`,
					{
						method: 'GET',
						headers: {
							Authorization: `Bearer ${localStorage.getItem('token')}`,
						},
					}
					);
				if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
				const result = await res.json();
				const updatedFilters = filters.selects.map((filter) => {
					const options = result[filter.name]?.map((item) => ({
						name: item,
						title: switchEnum(item, filter.name) || item,
					}));
					return options ? { ...filter, options } : filter;
				});
				setFilters((prev) => ({ ...prev, selects: updatedFilters }));
			} catch (error) {
				console.error(error);
			} finally {
				setIsFiltersLoading(false);
			}
		};
		fetchFilters();
	}, []);

	useEffect(() => {
		const fetchData = async () => {
			if (!initToReload || isFiltersLoading) return;
			setLoading(true);
			try {
				const res = await fetch(`${apiUrl}/regions?${getParamsForRequest()}`,
					{
						method: 'GET',
						headers: {
							Authorization: `Bearer ${localStorage.getItem('token')}`,
						},
					}
					);
				if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
				const data = await res.json();
				setData(data?.data );
				setFooter(data?.footer );
				setHeaderBefore(data?.headers);
				setDefaultCustomSettings(data?.headers);
			} catch (error) {
				console.error(error);
			} finally {
				setLoading(false);
				setInitToReload(false);
				navigate(`?${getParamsForRequest()}`);
			}
		};

		fetchData();
	}, [initToReload, isFiltersLoading]);

	useEffect(() => {
		setHeader(headerBefore.map(cell => ({
			...cell,
			is_hidden_by_user: !cell.is_visible
		})));
	}, [headerBefore]);

	// Export logic
	useEffect(() => {
		const handleExport = async () => {
			if (!exportClicked) return;
			try {
				const res = await fetch(`${apiUrl}/regions/export?${getParamsForRequest()}`);
				if (!res.ok) throw new Error('Ошибка при получении файла');
				const blob = await res.blob();
				const url = window.URL.createObjectURL(blob);
				const link = document.createElement('a');
				link.href = url;
				link.setAttribute('download', `regions_${format(new Date(), "yyyy-MM-dd")}.xlsx`);
				document.body.appendChild(link);
				link.click();
				link.remove();
				window.URL.revokeObjectURL(url);
			} catch (error) {
				console.error(error);
			} finally {
				setExportClicked(false);
			}
		};
		handleExport();
	}, [exportClicked]);

	// Handlers
	const handleExportClick = () => setExportClicked(true);

	const onHeaderClick = (columnPos) => {
		const field = columnPos === "name" ? "client_name" : columnPos;
		const direction = countOfClickOnHeader === 0 ? 'ASC' :
			(countOfClickOnHeader === 1 && filters.sortField === field) ? 'DESC' : '';
		setFilters({
			...filters,
			sortField: field,
			sortOrder: direction,
		});
		setCountOfClickOnHeader(countOfClickOnHeader === 2 ? 0 : countOfClickOnHeader + 1);
	};

	const onClickCell = (rowPos, columnPos) => {
		const params = new URLSearchParams({
			project_name: rowPos.toString() !== 'Общее' ? rowPos.toString() : '',
			region: columnPos.toString(),
			status: searchParams.get('status') || '',
			start_date: searchParams.get('start_date') || '',
			end_date: searchParams.get('end_date') || '',
		});
		navigate(`/tasks?${params.toString()}`);
	};
	// console.log(data?.length, loading);
	return (
		<Report
			data={data}
			header={header}
			footer={footer}
			isLoading={loading}
			filters={filters}
			setFilters={setFilters}
			onHeaderClick={onHeaderClick}
			onClickCell={onClickCell}>
			<div className={styles.custom}>
				<ModalCustom
					needScroll
					customSettings={customSettings}
					setCustomSettings={setCustomSettings}
					header={header}
					setDefaultCustomSettings={setDefaultCustomSettings}
					onCustomSettingApplied={() => {
						setHeader(prev => prev.map(cell => ({
							...cell,
							is_hidden_by_user: !customSettings.find(s => s.name === cell.name)?.applied_visible,
						})));
					}}
					onCheckboxChanged={(name) => {
						setCustomSettings(prev =>
							prev.map(cell => cell.name === name ? {
								...cell,
								applied_visible: !cell.applied_visible
							} : cell));
					}}
				/>
				<Button
					as="div"
					disabled={Array.isArray(data) && data.length === 0}
					badge={countBadge() ? countBadge().toString() : undefined}
					stylizedAs="white"
					filterButton
					onClick={() => setIsFiltersOpen(!isFiltersOpen)}>
					Фильтр
				</Button>
				{isFiltersOpen && (
					<FilterTask
						key="filter"
						filters={filters}
						setFilters={setFilters}
						setIsOpenModal={setIsFiltersOpen}
						isOpenModal={isFiltersOpen}
						setInitToReload={setInitToReload}
						isLoading={isFiltersLoading}
					/>
				)}
				<Button
					disabled={Array.isArray(data) && data.length === 0}
					stylizedAs="blue-dark"
					exportButton="white"
					onClick={handleExportClick}>
					Экспорт
				</Button>
			</div>
		</Report>
	);
}
