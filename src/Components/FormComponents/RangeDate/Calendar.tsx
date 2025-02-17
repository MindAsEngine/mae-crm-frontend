import styles from "./rangedate.module.scss";
import {
    addDays,
    endOfMonth,
    endOfWeek,
    format, isMonday,
    isSameDay,
    isSameMonth, isSunday,
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
    // oneCalendar: true;
}
export default function Calendar({startDate, endDate, handleDayClick, direction, handleMonthChange, currentMonth}:CalendarProps) {
    const [weeks, setWeeks] = useState([]);
    // console.log(startDate, "Start Date")
    // console.log(endDate, "End Date")

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
                // console.log(isInRange, "Is in range", day)
                const currentDay = day.toISOString();
                week.push(
                    <td
                        className={clsx(
                            // !isSameMonth(day, month) && styles.differentMonth,
                            isSameMonth(day, month) && isInRange && styles.inRange,
                            styles.day,
                            !isSameMonth(day, month) && styles.differentMonth,
                            isSameMonth(day, month) && isSameDay(day, startDate) && styles.chosenStart,
                            isSameMonth(day, month) && isSameDay(day, endDate) && styles.chosenEnd,
                            isSameMonth(day, month) && isSameDay(day, startDate) && styles.chosen,
                            isSameMonth(day, month) && isSameDay(day, endDate) && styles.chosen,
                            isMonday(day) && styles.monday,
                            isSunday(day) && styles.sunday,
                            // styles.day
                        )}
                        key={currentDay}
                         onClick={() => !isSameMonth(day, month) && handleDayClick(parseISO(currentDay))}
                    ><span
                        className={clsx(

                        )}
                    >{day.getDate()}</span>

                    </td>
                );
                day = addDays(day, 1);
            }
            setWeeks((prev) => [...prev, week]);
        }
    };
    React.useEffect(() => {
        setWeeks([]);
        renderDays(currentMonth);
    }, [currentMonth, startDate, endDate]);
    return (
        <div className={styles.calendar}>
            <div className={styles.month}>
                {direction <= 0 && (<span
                    className={styles.icon + " " + styles.left}
                    onClick={() => handleMonthChange(-1)}>&lt;</span>)}
                <span className={styles.monthTitle}>
                    {currentMonth.toLocaleString("ru", {month: "long"})} {format(currentMonth, "yyyy")}
                </span>
                {direction >= 0 && (<span
                    className={styles.icon + " " + styles.right}
                    onClick={() => handleMonthChange(1)}>&gt;</span>)}
            </div>
            <table>
                <thead>
                <tr>
                    <th className={styles.dayTitle}>Пн</th>
                    <th className={styles.dayTitle}>Вт</th>
                    <th className={styles.dayTitle}>Ср</th>
                    <th className={styles.dayTitle}>Чт</th>
                    <th className={styles.dayTitle}>Пт</th>
                    <th className={styles.dayTitle}>Сб</th>
                    <th className={styles.dayTitle}>Вс</th>
                </tr>
                </thead>
                <tbody>
                {weeks.map((week, index) => (
                    <tr className={styles.week}
                        key={index}>{week}</tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}