import React from 'react'
import styles from './filterbar.module.scss'
import { RangeDatePicker } from '@y0c/react-datepicker'
import '@y0c/react-datepicker/assets/styles/calendar.scss'
import dayjs from 'dayjs'
import Input from "../FormComponents/Input/Input.tsx";
import RangeDate from "../FormComponents/RangeDate/RangeDate.tsx";

type FilterBarProps = {
	setFilters: (
		filters: any
	) => void
	filters: any
	children?: React.ReactNode,
	noDataRange?: boolean
}

export default function FilterBar({
	setFilters,
	filters,
	children,
	noDataRange=false

}: FilterBarProps) {
	const handleSearch = (e) => {
		setFilters((prevFilters: any) => {
			const updateFilters =  {
			...prevFilters,
			search: e.target.value,
			}
			// console.log('Updated Filters (search):', updateFilters);
			return updateFilters;}
			)

	}
		const handleStartDateChange = (date) => {
			setFilters((prevFilters) => {
				const updatedFilters = {
					...prevFilters,
					startDate: date,
				};
				// console.log('Updated Filters (start date):', updatedFilters);
				return updatedFilters;
			});
		};

		const handleEndDateChange = (date) => {
			setFilters((prevFilters) => {
				const updatedFilters = {
					...prevFilters,
					endDate: date,
				};
				// console.log('Updated Filters (end date):', updatedFilters);
				return updatedFilters;
			});
		};

		return (
		<section className={styles.section}>
			<div className={styles.common_filters}>
				<Input
					type='search'
					placeholder='Поиск'
					onChange={handleSearch}
					value={filters.search}
					className={styles.search}
					before={(<span className={styles.search_icon}></span>)}
					after={(<span className={styles.close_icon}
								  onClick={()=>{
									  setFilters((prevFilters: any) => ({
										  ...prevFilters,
										  search: '',
									  }))}}
					></span>)}
				/>
				{!noDataRange && <RangeDate
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
				/>}
			</div>
			{children}

		</section>
	)
}
