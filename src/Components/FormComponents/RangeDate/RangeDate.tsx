import React, { useState } from "react";
import { format, addMonths, startOfMonth, endOfMonth, startOfWeek, addDays, isSameMonth, isSameDay } from "date-fns";
import styles from "./rangedate.module.scss";
import clsx from "clsx";

const DateRange = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [currentMonth, setCurrentMonth] = useState(new Date());
	const [nextMonth, setNextMonth] = useState(addMonths(new Date(), 1));
	const [startDate, setStartDate] = useState(null);
	const [endDate, setEndDate] = useState(null);
	const [startTime, setStartTime] = useState("12:00");
	const [endTime, setEndTime] = useState("12:00");

	const toggleCalendar = () => setIsOpen(!isOpen);

	const handleDayClick = (day) => {
		if (!startDate || (startDate && endDate)) {
			setStartDate(day);
			setEndDate(null);
		} else if (startDate && !endDate) {
			if (day < startDate) {
				setEndDate(startDate);
				setStartDate(day);
			} else {
				setEndDate(day);
			}
		}
	};

	const renderDays = (month) => {
		const start = startOfWeek(startOfMonth(month));
		const end = endOfMonth(month);

		const days = [];
		let day = start;

		while (day <= end) {
			for (let i = 0; i < 7; i++) {
				const isInRange =
					startDate &&
					endDate &&
					day >= startDate &&
					day <= endDate;

				days.push(
					<td
						key={day}

						className={`day ${!isSameMonth(day, month) ? "disabled" : ""} ${
							isSameDay(day, startDate) || isSameDay(day, endDate)
								? "selected"
								: ""
						} ${isInRange ? "in-range" : ""} td` }
						onClick={() => handleDayClick(day)}
					>
						{day.getDate()}
					</td>
				);
				day = addDays(day, 1);
			}
		}

		const weeks = [];
		for (let i = 0; i < days.length; i += 7) {
			weeks.push(<tr key={i}>{days.slice(i, i + 7)}</tr>);
		}
		return weeks;
	};

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
			<div className={styles.input}
				 onClick={toggleCalendar}>
				<span className={styles.imgCalendar}></span>
				<input
					className={styles.disabledInput}
					type="text"
					minLength={"ДД.ММ.ГГГГ - ДД.ММ.ГГГГГ".length}
					value={
						startDate && endDate
							? `${format(startDate, "dd.MM.yyyy")} - ${format(endDate, "dd.MM.yyyy")}}`
							: ""
							// "12.12.1222 - 12.23.2344"
					}
					placeholder={'ДД.ММ.ГГГГ - ДД.ММ.ГГГГ'}
					readOnly
				/>
			</div>

			{isOpen && (
				<div className={styles.calendarDropdown}>
					<div className={styles.calendar}>
						<div className={styles.month}>
							<button onClick={() => handleMonthChange(-1)}>&lt;</button>
							<span>{format(currentMonth, "MMMM yyyy")}</span>
						</div>
						<table className={styles.table}>
							<thead>
							<tr>
								<th className={styles.th}>Пн</th>
								<th className={styles.th}>Вт</th>
								<th className={styles.th}>Ср</th>
								<th className={styles.th}>Чт</th>
								<th className={styles.th}>Пт</th>
								<th className={styles.th}>Сб</th>
								<th className={styles.th}>Вс</th>
							</tr>
							</thead>
							<tbody>{renderDays(currentMonth)}</tbody>
						</table>
					</div>

					<div className={styles.calendar}>
						<div className={styles.month}>
							<span>{format(nextMonth, "MMMM yyyy")}</span>
							<button onClick={() => handleMonthChange(1)}>&gt;</button>
						</div>
						<table>
							<thead>
							<tr>
								<th>Пн</th>
								<th>Вт</th>
								<th>Ср</th>
								<th>Чт</th>
								<th>Пт</th>
								<th>Сб</th>
								<th>Вс</th>
							</tr>
							</thead>
							<tbody>{renderDays(nextMonth)}</tbody>
						</table>
					</div>

					{/* Поля для выбора времени */}
					<div className={styles["timePicker"]}>
						<div>
							<label>Начало:</label>
							<input
								type="time"
								value={startTime}
								onChange={(e) => setStartTime(e.target.value)}
							/>
						</div>
						<div>
							<label>Конец:</label>
							<input
								type="time"
								value={endTime}
								onChange={(e) => setEndTime(e.target.value)}
							/>
						</div>
					</div>

					<div className={styles.footer}>
						<button onClick={applySelection}>Применить</button>
						<button onClick={() => setIsOpen(false)}>Отменить</button>
					</div>
				</div>
			)}
		</div>
	);
};

export default DateRange;
