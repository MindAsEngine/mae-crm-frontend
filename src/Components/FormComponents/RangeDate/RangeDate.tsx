import React, {useEffect, useState} from "react";
import {
	format,
	addMonths,

	subMonths
} from "date-fns";
import styles from "./rangedate.module.scss";
import Input from "../Input/Input.tsx";
import Calendar from "./Calendar.tsx";
import Time from "./Time.tsx";
type DateRangeProps = {

	startDate: Date;
	endDate: Date;
	setStartDate: (date: Date) => void;
	setEndDate: (date: Date) => void;

}
const DateRange = ({startDate, endDate, setEndDate, setStartDate}:DateRangeProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const [currentMonth, setCurrentMonth] = useState(subMonths(new Date(), 1));
	const [nextMonth, setNextMonth] = useState(new Date());
	const [chosenRange, setChosenRange] = useState(
		{
			start: null,
			end: null
		}
	);

	const [startTime, setStartTime] = useState({hour: "00", minute: "00"});
	const [endTime, setEndTime] = useState({hour: "00", minute: "00"});

	const toggleCalendar = () => setIsOpen(!isOpen);

	const handleClickOut = (e: MouseEvent) => {
		const dialog = document.getElementById("calendarDropdown");
		if (!dialog.contains(e.target)) setIsOpen(false);
	}
	useEffect(() => {
		 document.addEventListener('mouseup', handleClickOut );
		return () => {
			document.removeEventListener('mouseup', handleClickOut);
		}
	});

	const handleDayClick = (day) => {
		setChosenRange((prev) => {
			if (!prev.start || (prev.start && prev.end) || day < prev.start) {
				// Если начальная дата не задана, или обе даты выбраны, или новая дата меньше текущей начальной
				return { start: day, end: null }; // Начинаем новый диапазон
			} else if (prev.start && !prev.end && day > prev.start) {
				// Если начальная дата задана, а конечная еще нет, и выбранная дата больше начальной
				return { start: prev.start, end: day }; // Устанавливаем конечную дату
			}
			// В случае, если ни одно из условий не выполнено, возвращаем текущее состояние
			return prev;
		});
	};

	const handleMonthChange = (direction) => {
		setCurrentMonth(addMonths(currentMonth, direction));
		setNextMonth(addMonths(nextMonth, direction));
	};

	const applySelection = () => {
		setIsOpen(false);
		setStartDate(chosenRange.start);
		setEndDate(chosenRange.end);
	};

	return (
		<div className={styles.container} id={'calendarDropdown'}>
			<div className={styles.input} onClick={toggleCalendar} >

				<Input
					before={<span className={styles.imgCalendar}></span>}
					type="text"
					value={chosenRange.end && chosenRange.start
						? `${format(chosenRange.start, "dd.MM.yyyy")} - ${format(chosenRange.end, "dd.MM.yyyy")}`
						: (
							chosenRange.start
								? `${format(chosenRange.start, "dd.MM.yyyy")} - ДД.ММ.ГГГГ`
								: ""
						)
					}
					placeholder={'ДД.ММ.ГГГГ - ДД.ММ.ГГГГ'}
					readOnly={true}
					onChange={() => {}}
					className={styles.inputDate}
				/>
			</div>

			{isOpen && (
				<div className={styles.calendarDropdown}>
					<div className={styles.calendarArea}>
						<div className={styles.timeCalendar}>
							<Calendar endDate={chosenRange.end} direction={-1}
									  startDate={chosenRange.start} currentMonth={currentMonth}
									  handleDayClick={handleDayClick} handleMonthChange={handleMonthChange}/>
							<Time time={startTime} setTime={setStartTime}/>
						</div>
						<div className={styles.timeCalendar}>
							<Calendar startDate={chosenRange.start} direction={1}
									  endDate={chosenRange.end} currentMonth={nextMonth} handleDayClick={handleDayClick} handleMonthChange={handleMonthChange} />
							<Time time={endTime} setTime={setEndTime} />

						</div>
					</div>


				</div>
			)}
		</div>
	);
};

export default DateRange;
