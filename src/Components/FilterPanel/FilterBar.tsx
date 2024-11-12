import React from "react";
import { cn } from "@bem-react/classname";
import { RangeDatePicker } from "@y0c/react-datepicker";
import "@y0c/react-datepicker/assets/styles/calendar.scss";
import { Button } from "../Button/Button.tsx";
import dayjs from "dayjs";
import {FilterType} from "../../Pages/Reports/CallCenterReport.tsx";


type FilterBarProps = {
    setFilters: (filters: (prevFilters: FilterType) => { search: string; startDate: dayjs.Dayjs; endDate: dayjs.Dayjs; }) => void;
    filters: FilterType;
    children?: React.ReactNode;
}

export default function FilterBar({ setFilters, filters, children }: FilterBarProps) {
    const cnFilterBar = cn("FilterBar");


    const handleSearch = (e) => {
        setFilters((prevFilters: FilterType) => ({
            ...prevFilters,
            search: e.target.value
        }));
    };

    const handleDateRange = (start, end) => {
        setFilters((prevFilters) => ({
            ...prevFilters,
            startDate: dayjs(start),
            endDate: dayjs(end)
        }));
    };
    return (
        <section className={cnFilterBar()}>
            <input
                type="search"
                placeholder="Поиск"
                className={cnFilterBar("Search")}
                onChange={handleSearch}

                value={filters.search}
            />
            <RangeDatePicker
                onChange={(start, end) => handleDateRange(start, end)}
                dateFormat={"DD-MM-YYYY"}
                className={cnFilterBar("RangeDatePicker")}
                startDay={filters.startDate.format("DD-MM-YYYY")}
                endDay={filters.endDate.format("DD-MM-YYYY")}
                initialStartDate={filters.startDate.format("DD-MM-YYYY")}
                initialEndDate={filters.endDate.format("DD-MM-YYYY")}
            />
            {children}
            <Button
                className={cnFilterBar("Button")}
                onClick={() => console.log("export")}
            >
                Экспорт
            </Button>

        </section>
    );
}
