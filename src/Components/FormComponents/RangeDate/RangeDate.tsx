import React, { useEffect, useState } from "react";
import { addMonths, format, isValid, parse, subMonths } from "date-fns";
import styles from "./rangedate.module.scss";
import Input from "../Input/Input.tsx";
import Calendar from "./Calendar.tsx";
import Time from "./Time.tsx";
import { Button } from "../Button/Button.tsx";

type DateRangeProps = {
	startDate: Date;
	endDate: Date;
	setStartDate: (date: Date) => void;
	setEndDate: (date: Date) => void;
};

const DateRange = ({ startDate, endDate, setStartDate, setEndDate }: DateRangeProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const [currentMonth, setCurrentMonth] = useState(subMonths(new Date(), 1));
	const [nextMonth, setNextMonth] = useState(new Date());
	const [isValidInput, setIsValidInput] = useState(true);

	const [chosenRange, setChosenRange] = useState({ start: null, end: null });
	const [startTime, setStartTime] = useState({ hour: "00", minute: "00" });
	const [endTime, setEndTime] = useState({ hour: "00", minute: "00" });

	const [rawValue, setRawValue] = useState(""); // Значение без маски
	const [maskedValue, setMaskedValue] = useState(""); // Значение с маской

	const toggleCalendar = () => setIsOpen(!isOpen);

	const handleClickOut = (e: MouseEvent) => {
		const dialog = document.getElementById("calendarDropdown");
		if (dialog && !dialog.contains(e.target as Node)) {
			setIsOpen(false);
		}
	};

	useEffect(() => {
		document.addEventListener("mouseup", handleClickOut);
		return () => {
			document.removeEventListener("mouseup", handleClickOut);
		};
	});

	const handleDayClick = (day) => {
		setChosenRange((prev) => {
			if (!prev.start || (prev.start && prev.end) || day < prev.start) {
				handleInputChange(format(day, "ddMMyyyy"));
				return { start: day, end: null };
			} else if (prev.start && !prev.end && day > prev.start) {
				handleInputChange(format(prev.start, "ddMMyyyy")+format(day, "ddMMyyyy"));
				return { start: prev.start, end: day };
			}
			return prev;
		});
	};

	const handleMonthChange = (direction) => {
		setCurrentMonth(addMonths(currentMonth, direction));
		setNextMonth(addMonths(nextMonth, direction));
	};

	const applySelection = () => {
		if (chosenRange.start && chosenRange.end) {
			setIsOpen(false);
			setStartDate(chosenRange.start);
			setEndDate(chosenRange.end);
		}
	};


	const handleInputChange = (val) => {
		const value = val.replace(/\D/g, ""); // Убираем всё, кроме цифр

		// Формируем маскированное значение
		let formattedValue = value;
		if (value.length > 2) formattedValue = `${value.slice(0, 2)}.${value.slice(2)}`;
		if (value.length > 4) formattedValue = `${formattedValue.slice(0, 5)}.${formattedValue.slice(5)}`;
		if (value.length > 8) formattedValue = `${formattedValue.slice(0, 10)} - ${formattedValue.slice(10)}`;
		if (value.length > 10) formattedValue = `${formattedValue.slice(0, 15)}.${formattedValue.slice(15)}`;
		if (value.length > 12) formattedValue = `${formattedValue.slice(0, 18)}.${formattedValue.slice(18)}`;

		setRawValue(value);
		setMaskedValue(formattedValue);
		setIsValidInput(false);
		if (formattedValue.length === 23) {
			console.log("formattedValue", formattedValue);

			const [start, end] = formattedValue.split(" - ");
			const startDate = parse(start, "dd.MM.yyyy", new Date());
			const endDate = parse(end, "dd.MM.yyyy", new Date());
			if (isValid(startDate) && isValid(endDate)) {
				setChosenRange({ start: startDate, end: endDate });
				setIsValidInput(true);
				// console.log("valided", startDate, endDate);
			} else {
				// console.log("not valided", startDate, endDate);
				setIsValidInput(false);
			}

		}
	};
	// useEffect(() => {
	// 	setCurrentMonth(startDate);
	// 	setNextMonth(addMonths(startDate, 1));
	// }, [chosenRange]);
	return (
		<div className={styles.container} id="calendarDropdown">
			<div className={styles.input} onClick={toggleCalendar}>
				<Input
					before={<span className={styles.imgCalendar}></span>}
					type="text"
					value={maskedValue}
					placeholder="ДД.ММ.ГГГГ - ДД.ММ.ГГГГ"
					onChange={(e)=>handleInputChange(e.target.value)}
					maxLength={23}
					className={styles.inputDate}
					isValid={isValidInput}
				/>
			</div>
			{isOpen && (
				<div className={styles.calendarDropdown}>
					<div className={styles.calendarArea}>
						<div className={styles.timeCalendar}>
							<Calendar
								endDate={chosenRange.end}
								direction={-1}
								startDate={chosenRange.start}
								currentMonth={currentMonth}
								handleDayClick={handleDayClick}
								handleMonthChange={handleMonthChange}
							/>
							<Time time={startTime} setTime={setStartTime} />
						</div>
						<div className={styles.timeCalendar}>
							<Calendar
								startDate={chosenRange.start}
								direction={1}
								endDate={chosenRange.end}
								currentMonth={nextMonth}
								handleDayClick={handleDayClick}
								handleMonthChange={handleMonthChange}
							/>
							<Time time={endTime} setTime={setEndTime} />
						</div>
					</div>
					<div className={styles.footer}>
						<div className={styles.label}>
							{chosenRange.start && format(chosenRange.start, "dd.MM.yyyy")} -{" "}
							{chosenRange.end && format(chosenRange.end, "dd.MM.yyyy")}
						</div>
						<div className={styles.buttons}>
							<Button
								children="Отменить"
								stylizedAs="white"
								onClick={() => {
									setChosenRange({ start: null, end: null });
									setStartRawValue("");
									setEndRawValue("");
								}}
							/>
							<Button children="Применить" stylizedAs="blue-dark" onClick={applySelection} />
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default DateRange;
