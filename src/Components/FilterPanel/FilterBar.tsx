import styles from './filterbar.module.scss'
import '@y0c/react-datepicker/assets/styles/calendar.scss'
import Input from "../FormComponents/Input/Input.tsx";
import {ChangeEvent, ReactNode} from "react";

type FilterBarProps = {
	setFilters: (
		filters: any
	) => void
	filters: any
	children?: ReactNode,
	// noDataRange?: boolean
}

export default function FilterBar({
	setFilters,
	filters,
	children,
	// noDataRange=false

}: FilterBarProps) {
	const handleSearch = (e:ChangeEvent<HTMLInputElement>) => {
		setFilters((prevFilters: any) => {
				// console.log('Updated Filters (search):', updateFilters);
			return {
				...prevFilters,
				search: e.target.value,
			};}
			)

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
					before={(<span className={styles.search_icon}></span>)}
					after={(<span className={styles.close_icon}
								  onClick={()=>{
									  setFilters((prevFilters: any) => ({
										  ...prevFilters,
										  search: '',
									  }))}}
					></span>)}
				/>

			</div>
			{children}

		</section>
	)
}
