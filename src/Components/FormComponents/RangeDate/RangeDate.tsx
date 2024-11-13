import {RangeDatePicker} from "@y0c/react-datepicker";
import React from "react";
import styles from './rangedate.module.scss';

type RangeDateProps = {
    handleDateRange: (start: any, end: any) => void
    filters: any

}

export default function RangeDate({handleDateRange, filters}: RangeDateProps) {
    return(
		<div className={styles.datepicker}>
		<RangeDatePicker
					onChange={(start, end) => handleDateRange(start, end)}
					dateFormat={'DD.MM.YYYY'}
					startPlaceholder={'DD.MM.YYYY'}
					endPlaceholder={'DD.MM.YYYY'}

					startDay={filters.startDate}
					endDay={filters.endDate}
					initialStartDate={filters.startDate}
					initialEndDate={filters.endDate}
				/>
			</div>)
}