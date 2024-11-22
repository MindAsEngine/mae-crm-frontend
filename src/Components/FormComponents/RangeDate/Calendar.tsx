import styles from "./rangedate.module.scss";
import {
    addDays,
    endOfMonth,
    endOfWeek,
    format,
    isSameDay,
    isSameMonth,
    parse, parseISO,
    startOfMonth,
    startOfWeek
} from "date-fns";
import React, {useState} from "react";
import clsx from "clsx";
type CalendarProps = {
    startDate: Date;
    endDate: Date;
    currentMonth: Date;
    handleDayClick: (day: Date) => void;
    handleMonthChange: (direction: number) => void;
    direction?: number;
}
export default function Calendar({startDate, endDate, handleDayClick, direction, handleMonthChange, currentMonth}:CalendarProps) {
    const [weeks, setWeeks] = useState([]);
    const renderDays = (month) => {
        const start = startOfWeek(startOfMonth(month), {weekStartsOn: 1});
        const end = endOfWeek(endOfMonth(month), {weekStartsOn: 1});
        let day = start;
        while (day <= end) {
            const week = [];
            for (let i = 0; i < 7; i++) {
                const isInRange =
                    startDate &&
                    endDate &&
                    day >= startDate &&
                    day <= endDate;
                const currentDay = day.toISOString();
                week.push(
                    <td
                        className={clsx(
                            !isSameMonth(day, month) && styles.differentMonth,
                            isInRange && styles.inRange,
                            isSameDay(day, startDate) && styles.startDate,
                            isSameDay(day, endDate) && styles.endDate,
                            styles.day
                        )}
                        key={currentDay}
                         onClick={() => handleDayClick(parseISO(currentDay))}
                    >{day.getDate()}</td>
                );
                day = addDays(day, 1);
            }
            setWeeks((prev) => [...prev, week]);
        }
    };
    React.useEffect(() => {
        setWeeks([]);
        renderDays(currentMonth);
    }, [currentMonth]);
    return (
        <div className={styles.calendar}>
            <div className={styles.month}>
                <span>{format(currentMonth, "MMMM yyyy")}</span>
                <button onClick={() => handleMonthChange(direction)}>&gt;</button>
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
                <tbody>
                {weeks.map((week, index) => (
                    <tr key={index}>{week}</tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}