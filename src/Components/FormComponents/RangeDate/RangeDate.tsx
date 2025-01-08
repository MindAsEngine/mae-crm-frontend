import React, { useEffect, useState } from "react";
import { addMonths, format, intervalToDuration, isValid, parse, subMonths } from "date-fns";
import styles from "./rangedate.module.scss";
import Input from "../Input/Input.tsx";
import Calendar from "./Calendar.tsx";
import Time from "./Time.tsx";
import { Button } from "../Button/Button.tsx";
import clsx from "clsx";

type DateRangeProps = {
	range: {start: Date,
		end: Date}
	setRange: (date: { end: Date; start: Date }) => void
	// startDate: Date;
	// endDate: Date;
	// setStartDate: (date: Date) => void;
	// setEndDate: (date: Date) => void;
	id?: string;
	disabled: boolean
	iconPosition?: "right"
	oneCalendar: boolean
	withTime: boolean,
	inputStyle: string
	isValidStyle: boolean,
	needToReset: boolean,
	setNeedToReset: ()=>{},
	isTouchedDefault?: boolean;
};

const DateRange = ({
	withTime=true,  oneCalendar=false, inputStyle="",
	isValidStyle=true,
	needToReset=false,
	range, setRange,
	isTouchedDefault=false,

					   id="",
	setNeedToReset
					   // endDate, setStartDate, setEndDate
}: DateRangeProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const [currentMonth, setCurrentMonth] = useState(subMonths(new Date(), 1));
	const [nextMonth, setNextMonth] = useState(new Date());
	const [isValidInput, setIsValidInput] = useState(true);
	const [isFocused, setIsFocused] = useState(false);
	const [chosenRange, setChosenRange] = useState({ start: range.start, end: range.end });
	const [startTime, setStartTime] = useState({ hour: "00", minute: "00" });
	const [endTime, setEndTime] = useState({ hour: "00", minute: "00" });
	// const [rawValue, setRawValue] = useState(""); // Значение без маски
	const [maskedValue, setMaskedValue] = useState(""); // Значение с маской
	useEffect(() => {
		if (needToReset){
			setChosenRange({ start: null, end: null });
			// setRawValue("");
			setMaskedValue("");
			setNeedToReset(false);
			setRange({start: null, end: null});
			console.log("reset");
			// setIsOpen(false);
		}
	}, [needToReset]);

	const toggleCalendar = () => {
		setIsFocused(true);
		setIsOpen(true);
	}

	const handleClickOut = (e: MouseEvent) => {
		const dialog = document.getElementById("calendarDropdown"+id);
		if (dialog && !dialog.contains(e.target as Node)&&isOpen) {
			setNeedToReset(true);
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

	const applySelection = (e) => {
		e.preventDefault();
		// const count = intervalToDuration({
		// 	start: chosenRange.start,
		// 	end: chosenRange.end
		// });
		if (isValid(chosenRange.start) && isValid(chosenRange.end) && intervalToDuration({
			start: chosenRange.start,
			end: chosenRange.end
		})?.years < 1) {
			setRange({end: chosenRange.end, start: chosenRange.start})
			// setEndDate(chosenRange.end);
			setIsOpen(false);
		} else if (isValid(chosenRange.start) && !chosenRange.end) {
			setRange({end: null, start: chosenRange.start})
			// setEndDate(chosenRange.start);
			setIsOpen(false);

		}
	};
	// const isRangeValid = (start, )

	const handleInputChange = (val) => {
		const value = val.replace(/\D/g, ""); // Убираем всё, кроме цифр
		// Формируем маскированное значение
		let formattedValue = value;
		if (value.length > 2) formattedValue = `${value.slice(0, 2)}.${value.slice(2)}`;
		if (value.length > 4) formattedValue = `${formattedValue.slice(0, 5)}.${formattedValue.slice(5)}`;
		if (value.length > 8) formattedValue = `${formattedValue.slice(0, 10)} - ${formattedValue.slice(10)}`;
		if (value.length > 10) formattedValue = `${formattedValue.slice(0, 15)}.${formattedValue.slice(15)}`;
		if (value.length > 12) formattedValue = `${formattedValue.slice(0, 18)}.${formattedValue.slice(18)}`;
		setChosenRange({ start: null, end: null });
		// setRawValue(value);
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
		} else if (formattedValue.length === 0) {
			setIsValidInput(true);
		} else if (formattedValue.length === 10) {
			const startDate = parse(formattedValue, "dd.MM.yyyy", new Date());
			if (isValid(startDate)) {
				setChosenRange({ start: startDate, end: startDate });
				// todo null
				setIsValidInput(true);
			} else {
				setIsValidInput(false);
			}
		}
	};
	useEffect(() => {
		if (range.start && range.end){
			handleInputChange(format(range.start, "dd.MM.yyyy") + " - "
				+format(range.end, " - dd.MM.yyyy"));
		}
	}, []);


	return (
		<div className={styles.container} id={"calendarDropdown"+id}
		onClick={event => event.stopPropagation()}
		>
			<div className={styles.input} onClick={toggleCalendar}>
				<Input
					before={<span className={
						clsx(styles.imgCalendar , maskedValue.length > 0 && styles.active,
							isFocused && styles.active,
						)
					}></span>}
					type="text"
					value={maskedValue}
					placeholder="ДД.ММ.ГГГГ - ДД.ММ.ГГГГ"
					onChange={(e)=>handleInputChange(e.target.value)}
					maxLength={23}
					className={clsx(styles.inputDate, inputStyle)}
					isValid={isValidInput&&isValidStyle}
					isTouchedDefault={isTouchedDefault}
				/>
			</div>
			{isOpen && (
				<div className={clsx( oneCalendar&&styles.oneCalendar, styles.calendarDropdown)}>
					<div className={styles.calendarArea}>
						{oneCalendar ?
							<div className={clsx(styles.timeCalendar)}>
								<Calendar
									endDate={chosenRange.end}
									direction={0}
									startDate={chosenRange.start}
									currentMonth={nextMonth}
									handleDayClick={handleDayClick}
									handleMonthChange={handleMonthChange}
								/>

							</div>
						:
							<>
						<div className={styles.timeCalendar}>
							<Calendar

								endDate={chosenRange.end}
								direction={-1}
								startDate={chosenRange.start}
								currentMonth={currentMonth}
								handleDayClick={handleDayClick}
								handleMonthChange={handleMonthChange}
							/>
							{withTime && <Time time={startTime} setTime={setStartTime}/>}
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
							{withTime && <Time time={endTime} setTime={setEndTime} />}
						</div>
							</>}
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
									setIsOpen(false);
									setNeedToReset(true);
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
