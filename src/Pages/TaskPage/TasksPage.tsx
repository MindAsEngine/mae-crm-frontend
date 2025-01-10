import * as React from 'react';
import { useEffect, useState, useCallback } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { format } from 'date-fns';
import Report from '../../Components/Report/Report.tsx';
import { Button } from '../../Components/FormComponents/Button/Button.tsx';
import FilterTask from '../../Components/Forms/FilterTask/FilterTask.tsx';
import AudienceCreate from '../../Components/Forms/Audience/AudienceCreate.tsx';
import TaskCreate from '../../Components/Forms/Task/TaskCreate.tsx';
import { switchEnum } from '../../Components/Table/switchEnum.tsx';
import styles from './task-page.module.scss';
import {getAuthHeader, logout} from "../Login/logout.ts";

const apiUrl = import.meta.env.VITE_API_URL;

export default function TasksPage() {
	const [searchParams] = useSearchParams();
	const navigate = useNavigate();
	const [countOfClickOnHeader, setCountOfClickOnHeader] = useState(0);
	const [data, setData] = useState([]);
	const [isFiltred, setIsFiltred] = useState(true);
	const [header, setHeader] = useState([]);
	const [loading, setLoading] = useState(false);
	const [isFilterLoading, setIsFilterLoading] = useState(true);
	const [exportClicked, setExportClicked] = useState(false);
	const [page, setPage] = useState(+searchParams.get('page') || 1);
	const [pageSize, setPageSize] = useState(+searchParams.get('page_size') || 30);
	const [totalResults, setTotalResults] = useState(0);
	const [filters, setFilters] = useState(initializeFilters(searchParams));

	const [isOpenCreateAudience, setIsOpenCreateAudience] = useState(false);
	const [isOpenCreateTask, setIsOpenCreateTask] = useState(false);
	const [isOpenFilters, setIsOpenFilters] = useState(false);
	const [chosenData, setChosenData] = useState([]);

	function getTitleByName(name) {
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
	// Helper function to initialize filters
	function initializeFilters(params) {
		return {
			start: params.get('start_date') ? new Date(params.get('start_date')) : null,
			end: params.get('end_date') ? new Date(params.get('end_date')) : null,
			selects: [
				createFilter('regions', params.get('region')),
				createFilter('status_names', params.get('status')),
				createFilter('property_types', params.get('property_type'), 'property_type'),
				createFilter('project_names', params.get('project_name')),
				createFilter('audience_names', params.get('audience_name')),
			],
			sortField: params.get('order_field') || '',
			sortOrder: params.get('order_direction') || '',
			daysInStatus: params.get('days_in_status') || null,
		};
	}

	// Helper function to create filter objects
	function createFilter(name, value, enumType = '') {
		return {
			name,
			options: [],
			title: getTitleByName(name),
			selectedOptions: value ? [{ name: value, title: switchEnum(value, enumType) || value }] : [],
		};
	}

	const fetchFilters = useCallback(async () => {
		setIsFilterLoading(true);
		try {
			// console.log('fetchFilters', getAuthHeader());
			const response = await fetch(`${apiUrl}/applications/filters`,
				{
					method: 'GET',
					headers: getAuthHeader()
				});
			if (!response.ok) {
				if (response.status === 401) {
					console.log('Unauthorized in fetchFilters');
					logout();
					navigate('/login');
					throw new Error('Unauthorized');
				}
				throw new Error('Failed to fetch filters');
			}
			const result = await response.json();

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
			setIsFilterLoading(false);
		}
	}, []);

	useEffect(() => {
		fetchFilters();
	}, [fetchFilters]);

	// Fetch data
	const fetchData = useCallback(async () => {

		setLoading(true);
		setAllChecked(false);
		setChosenData([]);
		if (page === 1)
			setData([]);
		try {
			const params = getParamsForRequest();
			const response = await fetch(`${apiUrl}/applications?${params}`,
				{
					method: 'GET',
					headers: getAuthHeader(),
				},
				);
			if (!response.ok) {
				if (response.status === 401) {
					console.log('Unauthorized in fetchData');
					logout();

					throw new Error('Unauthorized');
				}
				throw new Error('Failed to fetch data');
			}

			const result = await response.json();

			setData((prev) => (page === 1 ? result.items : [...prev, ...(result.items || [])]));
			setHeader(result.header);
			setTotalResults(result.total_pages);
			const navigateParams = getParamsForRequest(true);
			navigate(`?${navigateParams}`);
			setIsFiltred(false);
		} catch (error) {
			console.error(error);
		} finally {
			setLoading(false);
		}
	}, [page, isFiltred]);

	useEffect(() => {
		if (isFiltred) {
			page === 1 ? fetchData() : setPage(1);
		} else {
			fetchData()
		}

	}, [fetchData]);

	// Export data
	useEffect(() => {
		if (!exportClicked) return;
		const handleExport = async () => {
			try {
				const params = getParamsForRequest();
				const response = await fetch(`${apiUrl}/applications/export?${params}`,
					{
						method: 'GET',
						headers: getAuthHeader(),
					});
				if (!response.ok) {
					if (response.status === 401) {
						console.log('Unauthorized in handleExport');
						logout();

						throw new Error('Unauthorized');
					}
					throw new Error('Failed to export data');
				}

				const blob = await response.blob();
				const url = window.URL.createObjectURL(blob);
				const link = document.createElement('a');
				link.href = url;
				link.setAttribute('download', `applications_${format(new Date(), 'yyyy-MM-dd')}.xlsx`);
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

	const getParamsForRequest = (navigate=false) => {
		const params = new URLSearchParams();
		const handleDateFormat = (date) =>{
			const userInputDate = format(date, "yyyy-MM-dd")
			const [year, month, day] = userInputDate.split('-'); // Разбиваем строку по '-
			return `${year}-${month}-${day}T00:00:00Z`;
		}
		if (filters.daysInStatus) params.append('days_in_status', filters.daysInStatus);
		if (filters.start) params.append('start_date', handleDateFormat(filters.start));
		if (filters.end) params.append('end_date', handleDateFormat(filters.end));
		filters.selects.forEach((select) => {
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
		if (filters.sortField) params.append('order_field', filters.sortField);
		if (filters.sortOrder) params.append('order_direction', filters.sortOrder);
		if (!navigate) {
			params.append('page', page);
			params.append('page_size', pageSize);
		}
		return params.toString();
	};

	const countBadge = () =>
		filters.selects.reduce((acc, select) => acc + select.selectedOptions.length, 0)
		+ (filters.start && filters.end ||  filters.start ? 1 : 0) +
		(filters.daysInStatus ? 1 : 0);
	const onScrollEnd = () => {
		// console.log('scroll end');
		if (page < totalResults) {
			setPage((prev) => prev + 1);
		}
	}
	const onClickCell = (columnPos: string) => {
		let direction = '';
		let field = '';
		if (columnPos === "actions" || columnPos === "id") {
			return;
		}
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
			setIsFiltred(true);
		}

	}

	const [isAllChecked, setAllChecked] = useState(false);
	// console.log(chosenData)
	// console.log('filters', filters);
	return (
		<>
			<Report
				data={data}
				header={header}
				chosenData={chosenData}
				setChosenData={setChosenData}
				isLoading={loading}
				onScrollEnd={onScrollEnd}
				onHeaderClick={onClickCell}

				isAllChecked={isAllChecked}
				setAllChecked={setAllChecked}
			>
				<div className={styles.custom}>
					<Button
						disabled={!(data?.length > 0)}

						stylizedAs="blue-light"
						exportButton
						onClick={() => setExportClicked(true)}
					>
						Экспорт
					</Button>
					<Button
						// disabled={!(data?.length > 0)}
						stylizedAs="white"
						filterButton
						badge={countBadge() ? countBadge().toString() : undefined}
						onClick={() => {
							// console.log("t,fnm ndj. vfnm cerf ns t,fyfzz")
							setIsOpenFilters(true)}}
					>
						Фильтр
					</Button>
					{isOpenFilters && (
						<FilterTask
							withDaysInStatus={true}
							setInitToReload={setIsFiltred}
							isOpenModal={isOpenFilters}
							filters={filters}
							setFilters={setFilters}
							setIsOpenModal={setIsOpenFilters}
							isLoading={isFilterLoading}
						/>
					)}
					<Button

						stylizedAs="blue-dark"
						createButton
						onClick={() => setIsOpenCreateAudience(true)}
					>
						Создать аудиторию
					</Button>
					{isOpenCreateAudience && (
						<AudienceCreate
							isOpenCreateAudience={isOpenCreateAudience}
							setIsOpenCreateAudience={setIsOpenCreateAudience}
						/>
					)}
					<Button
						stylizedAs="blue-dark"
						createButton
						disabled={chosenData.length === 0}
						onClick={() => setIsOpenCreateTask(true)}
					>
						Создать задачу
					</Button>
					{isOpenCreateTask && (
						<TaskCreate
							isOpenCreateTask={isOpenCreateTask}
							setIsOpenCreateTask={setIsOpenCreateTask}
							chosenApplications={chosenData}
							isCheckedAll={isAllChecked}
							filter={filters}
						/>
					)}
				</div>
			</Report>
		</>
	);
}
