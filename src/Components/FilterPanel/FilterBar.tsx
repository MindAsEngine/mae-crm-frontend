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
	children?: React.ReactNode
}

export default function FilterBar({
	setFilters,
	filters,
	children,
}: FilterBarProps) {
	const handleSearch = (e) => {
		setFilters((prevFilters: any) => ({
			...prevFilters,
			search: e.target.value,
		}))
	}

	const handleDateRange = (start, end) => {
		setFilters((prevFilters) => ({
			...prevFilters,
			startDate: dayjs(start),
			endDate: dayjs(end),
		}))
	}
	return (
		<section className={styles.section}>
			<div className={styles.common_filters}>
				<Input
					type='search'
					placeholder='Поиск'
					onChange={handleSearch}
					value={filters.search}
					className={styles.search}
					before={(<i className={styles.search_icon}></i>)}
					// after={(<i className={styles.close_icon}></i>)}
				/>
				<RangeDate handleDateRange={handleDateRange} filters={filters} />
			</div>
			{children}

		</section>
	)
}
