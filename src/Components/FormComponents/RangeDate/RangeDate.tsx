import React, { useState } from "react";
import {
	format,
	addMonths,

	subMonths
} from "date-fns";
import styles from "./rangedate.module.scss";
import Input from "../Input/Input.tsx";
import Calendar from "./Calendar.tsx";
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

	const [startTime, setStartTime] = useState("09:00");
	const [endTime, setEndTime] = useState("18:00");

	const toggleCalendar = () => setIsOpen(!isOpen);


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

	React.useEffect(() => {
		setStartDate(chosenRange.start);
		setEndDate(chosenRange.end);
	}, [chosenRange]);


	const handleMonthChange = (direction) => {
		setCurrentMonth(addMonths(currentMonth, direction));
		setNextMonth(addMonths(nextMonth, direction));
	};

	const applySelection = () => {
		setIsOpen(false);
		console.log(`Selected range: ${format(startDate, "dd.MM.yyyy")} ${startTime} to ${format(endDate, "dd.MM.yyyy")} ${endTime}`);
	};

	return (
		<div className={styles.container}>
			<div className={styles.input} onClick={toggleCalendar}>

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
					className={""}
				/>
			</div>

			{isOpen && (
				<div className={styles.calendarDropdown}>
					<div className={styles.calendarArea}>
						<Calendar endDate={chosenRange.end} direction={-1}
								  startDate={chosenRange.start} currentMonth={currentMonth} handleDayClick={handleDayClick} handleMonthChange={handleMonthChange} />
						<Calendar startDate={chosenRange.start} endDate={chosenRange.end} direction={1}
								  currentMonth={nextMonth} handleDayClick={handleDayClick} handleMonthChange={handleMonthChange} />
					</div>


					{/*/!* Поля для выбора времени *!/*/}
					{/*<div className={styles["timePicker"]}>*/}
					{/*	<div>*/}
					{/*		<label>Начало:</label>*/}
					{/*		<input*/}
					{/*			type="time"*/}
					{/*			value={startTime}*/}
					{/*			onChange={(e) => setStartTime(e.target.value)}*/}
					{/*		/>*/}
					{/*	</div>*/}
					{/*	<div>*/}
					{/*		<label>Конец:</label>*/}
					{/*		<input*/}
					{/*			type="time"*/}
					{/*			value={endTime}*/}
					{/*			onChange={(e) => setEndTime(e.target.value)}*/}
					{/*		/>*/}
					{/*	</div>*/}
					{/*</div>*/}

				</div>
			)}
		</div>
	);
};

export default DateRange;
